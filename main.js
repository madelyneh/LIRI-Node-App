let command = process.argv[2];
let input = process.argv[3];

OBJECT[command][input]();

let axios = require('axios');

axios.get()




//SPOTIFY API
let Spotify = require('node-spotify-api');
let spotifyId = "8e142daad8924d559f95718e9d3943e6";
let spotifySecret = "aad93dd8441345d78dba91760cae678a";
 
let spotify = new Spotify({
  id: spotifyId,
  secret: spotifySecret,
});
 
spotify.search({ type: 'track', query: input }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  };
console.log(data); 
});



