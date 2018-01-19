
//===Require All Packages==========================================

var keys= require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require('fs');


var firstArg = process.argv[2];
var secondArg = process.argv[3];


var check = function(){


	if (firstArg === 'spotify-this-song' && secondArg == undefined){
		getSpotify('The Sign');
	}
	else if(firstArg === 'movie-this' && secondArg == undefined){
		getMovie('Mr. Nobody');
	}
};


 

//===Twitter Function===============================================

var getTweets = function(){

	var client = new Twitter(keys.twitter);
 
	var params = {screen_name: 'Lovemiasweets'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
    	//console.log(tweets);
     	for(var i=0; i<tweets.length; i++){
     		console.log(tweets[i].created_at);
     		console.log("");
    		console.log(tweets[i].text);
    		}
  		}
	});
}




//======SPOTIFY FUNCTIONS==============================================================

var getArtistNames = function(artist) {
	return artist.name;
}


var getSpotify = function(songName) { 

	var spotify = new Spotify(keys.spotify);
 
	spotify.search({ type: 'track', query: songName }, function(err, data) {
  	
  	if (err) {
    	return console.log('Error occurred: ' + err);
  		}
 
	var songs = data.tracks.items; 
	for(var i=0; i<songs.length; i++) {
		console.log(i);
		console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
		console.log('song name: ' + songs[i].name);
		console.log('preview song: ' + songs[i].preview_url);
		console.log('album: ' + songs[i].album.name);
		console.log("");
		}

	});

}




//======OMDB MOVIE FUNCTION=======================================================

var getMovie = function(movieName) {

	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy",function(error,response,body){
		if (!error && response.statusCode === 200){

 	console.log('Title:' + JSON.parse(body).Title);
 	console.log('Year:' + JSON.parse(body).Year);
 	console.log('Rated:' + JSON.parse(body).Rated);
 	console.log('IMDB Rating:' + JSON.parse(body).imdbRating);
 	console.log('Country:' + JSON.parse(body).Country);
 	console.log('Language:' + JSON.parse(body).Language);
 	console.log('Plot:' + JSON.parse(body).Plot);
 	console.log('Actors:' + JSON.parse(body).Actors);
 	console.log('Rotten Tomatoes Rating:' + JSON.parse(body).tomatoRating);
 	}

  });

}


//=======READ FILE FUNCTION==========================================================

var doWhatItSays = function(){
	fs.readFile("random.txt", "utf8", function(error, data) {

	//console.log('Im in Function');
  	if (error) {
    	return console.log(error);
  	}else{

  	var dataArr = data.split(",");
  	for (var i=0; i<=dataArr.length; i++) { console.log(i,dataArr[i]); }
  	//console.log(dataArr);
  	
  	
  	
  	command(dataArr[0], dataArr[1]);

		};
	});
};



  // 	if (dataArr.length == 2) {
  // 		command(dataArr[0], dataArr[1]);
  // 	} 	else if (dataArr.length ==1){
  // 		command(dataArr[0]);
  // 	}	


  // });



var command = function(firstEntry,secondEntry) {
	if (firstArg === 'my-tweets'){
		getTweets();
	}
	else if (firstArg === 'spotify-this-song'){
		getSpotify(secondArg);
	}
	else if (firstArg === 'movie-this'){
		getMovie(secondArg);
	}
	else if (firstArg === 'do-what-it-says'){
		//console.log('Im here');
		doWhatItSays();
	}
	else{
		console.log("Liri doesn't know that");
	}
}



var runThis = function(argOne, argTwo) {
 	command(argOne, argTwo);
  };

  runThis(process.argv[2], process.argv[3]);

command();
check();




// var command = function(caseData, functionData) {
// 	switch(caseData) {
// 		case 'my-tweets' :
// 			getTweets();
// 			break;
// 		case 'spotify-this-song':
// 			getSpotify(functionData);
// 			break;
// 		case 'movie-this':
// 			getMovie(functionData);
// 			break;
// 		case 'do-what-it-says':
// 			doWhatItSays();
// 			break;
// 		default:
// 		console.log('Liri does not know that')
// 	}
// }

// var runThis = function(argOne, argTwo) {
// 	command(argOne, argTwo);
//  };

//  runThis(process.argv[2], process.argv[3]);











