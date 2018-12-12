console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdbKey = process.env.OMDB_API;


exports.bandKey = process.env.BANDS_IN_TOWN;
