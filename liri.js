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
let nodeInput = process.argv.slice(3).toString(" ").replace(",", " ");

//Program conditions 
switch (command) {
  // help function to clarify commands used
  case "help":
      console.log("Please type one of these commands:\n"+ 
                  "---------------------------\n" +
                  "'concert-this': to search your favorite artist concerts\n"+
                  "'spotify-this-song': to search your favorite song\n"+
                  "'movie-this': to search your favorite movie \n"+
                  "'do-what-it-says': using command from random.txt \n" +
                  "---------------------------\n"
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

  if (!nodeInput){
    nodeInput = 'Yelloclaw';
  };

  let apiURL = "https://rest.bandsintown.com/artists/" + nodeInput + "/events?app_id=" + bandKey;

  axios({
    method:'get',
    url: apiURL,
  })
    .then(function(response) {

      let event = Object.entries(response.data[0]);
      let venue = Object.entries(event[1])[1];
      let venueInfo = venue[1];
      let dateArray = event[2];
      let date = dateArray[1];
      let correctDate = date.substring(5,9) + "-" + date.substring(0,4);
      let userInput = nodeInput.charAt(0).toUpperCase() + nodeInput.substring(1);

      let concertLog = [
        "\n-----ConcertInfo-----",
        "Artist: " + userInput,
        "Venue Name: " + venueInfo.name,
        "Location: " + venueInfo.city +", " + venueInfo.country,
        "Date: " + correctDate,
        "----------------------",
      ];

      console.log(concertLog.join('\n'));

      fs.appendFile('assets/log.txt', concertLog.join('\n'), function(err) {
        if (err) throw err;
        console.log("Error: " + err);
      });
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

    let songLog = [
      "\n-----SongInfo-----",
      "Title: " + userInput,
      "Artist(s): " + songInfo[0].artists[0].name,
      "Song Name: " + songInfo[0].name,
      "Preview Link: " + songInfo[0].preview_url,
      "Album: " + songInfo[0].album.name,
      "---------------------",
    ];

    console.log(songLog.join("\n"));

    fs.appendFile('assets/log.txt', songLog.join("\n"), function(err) {
      if (err) throw err;
      console.log("Error: " + err);
    });
  });
};

function movies(nodeInput) {

  if (!nodeInput){
    nodeInput = 'Mr. Nobody';
  };

  axios({
    method:'get',
    url:"http://www.omdbapi.com/?t=" + nodeInput + "&y=&plot=short&apikey=" + omdbKey,
  }).then(function(response) {
    let newMovie = response.data;

      let ratings = Object.entries(newMovie.Ratings);
      let tomatoes ;

      for (i = 0; i < ratings.length; i ++) {
        let rating = ratings[i];
        let source = rating[1].Source;
        if (source === 'Rotten Tomatoes') {
          tomatoes = "Rotten Tomatoes Rating: " + rating[1].Value;
        } else {
          tomatoes ;
        };
      }; 

      let movieLog = [
        "\n------------MovieInfo------------",
        "Movie Title: " + newMovie.Title,
        "Release: " + newMovie.Released,
        "IMDB Rating: " + newMovie.imdbRating,
        tomatoes,
        "Country Produced In: " + newMovie.Country,
        "Language: " + newMovie.Language,
        "Actors: " + newMovie.Actors,
        "Plot: " + newMovie.Plot,
        "-------------------------------------",
      ];

      console.log(movieLog.join('\n'));

      fs.appendFile('assets/log.txt', movieLog.join('\n'), function(err) {
        if (err) throw err;
        // console.log("Error: " + err);
      });
  });
};

function doWhatItSays() {

  fs.readFile('assets/random.txt', "utf8", function(error, data){

    let commandData = data.split(" ");
    let command = commandData[1]; 
    let action = command.substring(0, command.length - 1)
    let input = commandData.slice(3).join(" ").replace("'", " ");

    if (action === "spotify-this-song") {

      music(input);

      fs.writeFile('assets/random.txt', "* movie-this, 'I Want it That Way'", function(err) {
        if (err) throw err;
        console.log("Error: " + err);
      });
    } else if (action === "movie-this") {
      
      movies(input);

      fs.writeFile('assets/random.txt', "* concert-this, 'Yellowclaw'", function(err) {
        if (err) throw err;
        console.log("Error: " + err);
      });
    } else if (action === "concert-this") {
      
      concert(input);

      fs.writeFile('assets/random.txt', "* spotify-this-song, 'I Want it That Way'", function(err) {
        if (err) throw err;
        console.log("Error: " + err);
      });
    };
  });
};
