require("dotenv").config();


let command = process.argv[2];
let input = process.argv[3];

OBJECT[command][input]();

let axios = require('axios');

axios.get()




//SPOTIFY API
let Spotify = require('node-spotify-api');
 
let spotify = new Spotify(keys.spotify);
 
spotify.search({ type: 'track', query: input }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  };
console.log(data); 
});



