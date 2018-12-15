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
let bandKey = keys.bandKey;

//Grad user input
let command = process.argv[2];
let nodeInput = process.argv[3];
// let fullNode = process.argv;
let args = process.argv.slice(3).toString("");
console.log("-------ARGS------")
console.log(args);
console.log("-------------")



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

  axios({
    method:'get',
    url:"https://rest.bandsintown.com/artists/" + nodeInput + "/events?app_id=" + bandKey,
  })
    .then(function(response) {

        let event = Object.entries(response.data[0]);
        let venue = Object.entries(event[1])[1];
        let venueInfo = venue[1];
        let dateArray = event[2];
        let date = dateArray[1];
        let correctDate = date.substring(5,9) + "-" + date.substring(0,4);
        let userInput = nodeInput.charAt(0).toUpperCase() + nodeInput.substring(1);
        
        console.log("-----ConcertInfo-----");
        console.log("Artist: " + userInput);
        console.log("Venue Name: " + venueInfo.name);
        console.log("Location: " + venueInfo.city +", " + venueInfo.country);
        console.log("Date: " + correctDate);
        console.log("----------------------");

    });
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
    let userInput = nodeInput.charAt(0).toUpperCase() + nodeInput.substring(1);

    console.log("-----SongInfo-----");
    console.log("Title: " + userInput);
    console.log("Artist(s): " + songInfo[0].artists[0].name);
    console.log("Song Name: " + songInfo[0].name);
    console.log("Preview Link: " + songInfo[0].preview_url);
    console.log("Album: " + songInfo[0].album.name);
    console.log("---------------------");
  });
};

function movies(nodeInput) {

  if (!nodeInput){
    nodeInput = 'Mr. Nobody';
  };

  axios({
    method:'get',
    url:"http://www.omdbapi.com/?t=" + nodeInput + "&y=&plot=short&apikey=" + omdbKey,
  })
    .then(function(response) {
    let newMovie = response.data;

      console.log("------------MovieInfo------------");
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
      console.log("Country Produced In: " + newMovie.Country);
      console.log("Language: " + newMovie.Language);
      console.log("Actors: " + newMovie.Actors);
      console.log("Plot: " + newMovie.Plot);
      console.log("-------------------------------------");
  });
};

function doWhatItSays() {

  fs.readFile('assets/random.txt', "utf8", function(error, data){

    console.log("--------Data--------");
    console.log(data);
    
    commandData = data.split(" ");
    let command = commandData[1]; 
    let input = data.substr(command.length + 3);

    music(input);

    console.log("--------Input--------");
    console.log(input);
  });

  fs.appendFile('assets/random.txt', "\n* movie-this, 'I Want it That Way'", function(err) {
    if (err) throw err;
    console.log("Error: " + err);
  });

  fs.appendFile('assets/random.txt', "\n* concert-this, 'I Want it That Way'", function(err) {
    if (err) throw err;
    console.log("Error: " + err);
  });

};
