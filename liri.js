require("dotenv").config();

//Require data from moment npm package
let moment = require('moment');
//Require data from File System npm package
let fs = require('fs');
//Require data from Axios npm package
let axios = require('axios');
//Grab data key from keys.js file
let keys = require('./keys');
//Grabs data from Spotify
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let omdbKey = keys.omdbKey;

//Grad user input
let command = process.argv[2];
let nodeInput = process.argv[3];
// console.log(command  + '\n' + nodeInput);

//Program conditions 
switch (command) {
  // help function to clarify commands used
  case "help":
      console.log("Please type one of these commands\n"+
                  "'concert-this': to search your favorite artist concerts\n"+
                  "'spotify-this-song': to search your favorite song\n"+
                  "'movie-this': to search your favorite movie \n"+
                  "'do-what-it-says': using command from random.txt \n"
                  );
      break;
  case "concert-this":
      concert(nodeInput);
      break;
  case "spotify-this-song":
      music(nodeInput);
      break;
  case "movie-this":
      movies(nodeInput);
      break;
  case "do-what-it-says":
      doWhatItSays();
      break;
  //if anything else written
  default:
      console.log("LIRI doesn't understand that - Please type 'node liri.js help' for more information");
};


function concert(nodeInput) {
  console.log('concert');
};

function music(nodeInput) {

  if (!nodeInput){

    nodeInput = 'The Sign';
  };

  spotify.search({ type: 'track', query: nodeInput, limit: 4 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    };

    let songInfo = data.tracks.items;
  
    console.log("-------------------SongInfo-------------------");
    console.log("Artist(s): " + songInfo[0].artists[0].name);
    console.log("Song Name: " + songInfo[0].name);
    console.log("Preview Link: " + songInfo[0].preview_url);
    console.log("Album: " + songInfo[0].album.name);
    console.log("-----------------------------------------------");
  });
};

function movies(nodeInput) {

  axios({
    method:'get',
    url:"http://www.omdbapi.com/?t=" + nodeInput + "&y=&plot=short&apikey=" + omdbKey,
  })
    .then(function(response) {
    let newMovie = response.data;
    // let jsonData = JSON.parse();
    console.log(newMovie);

      console.log("------------------MovieInfo--------------------");
      console.log("Movie Title: " + newMovie.Title);
      console.log("Release: " + newMovie.Released);
      console.log("IMDB Rating: " + newMovie.imdbRating);
      let ratings = Object.entries(newMovie.Ratings);

      for (i = 0; i < ratings.length; i ++) {
        let rating = ratings[i];
        let source = rating[1].Source;
        if (source === 'Rotten Tomatoes') {
          console.log("Rotten Tomatoes Rating: " + rating[1].Value);
        };
      }; 
      console.log("Country Producted In: " + newMovie.Country);
      console.log("Language: " + newMovie.Language);
      console.log("Actors: " + newMovie.Actors);
      console.log("Plot: " + newMovie.Plot);
      console.log("-----------------------------------------------");
  });
};

function doWhatItSays(nodeInput) {
  console.log('doWhatItSays');

};
