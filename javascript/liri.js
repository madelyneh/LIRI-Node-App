require("dotenv").config();

//Require data from moment npm package
let moment = require('moment');
//Require data from File System npm package
let fs = require('fs');
//Require data from Axios npm package
let axios = require('axios');
//Grab data key from keys.js file
let keys = require('./keys');
//Grad user input
let command = process.argv[2];
let input = process.argv[3];

OBJECT[command][input]();




//SPOTIFY API
let Spotify = require('node-spotify-api');
 
let spotify = new Spotify(keys.spotify);
 
spotify.search({ type: 'track', query: input }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  };
console.log(data); 
});



