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
//Grad user input

let command = process.argv[2];
let nodeInput = process.argv[3];

// OBJECT[command][input]();


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
      liriBot.concert(nodeInput);
      break;
  case "spotify-this-song":
      liriBot.spotify(nodeInput);
      break;
  case "movie-this":
      liriBot.movies(nodeInput);
      break;
  case "do-what-it-says":
      liriBot.doWhatItSays();
      break;
  //if anything else written
  default:
      console.log("LIRI doesn't understand that - Please type 'node liri.js help' for more information");
};


let liriBot = {

  concert = function() {

  },
  spotify = function() {


    spotify.search({ type: 'track', query: input }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      };
    console.log(data); 
    });
    

  },
  movies = function() {

  },
  doWhatItSays = function() {

  },
};
 