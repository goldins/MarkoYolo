var express = require('express');
var bodyParser = require('body-parser');
var Game = require('./game');

var app = express();
app.use(bodyParser.json()); // for parsing application/json

var openGames = {};
var activeGames = [];
var REGISTRATION_WINDOW = 30; //seconds

app.get('/play', function(req, res){
  var yo = req.query;
  console.log(yo)
  // if @yo
  if( yo.location ){
    // if open game nearby exists then join that game
    if ( gameExists(yo.location) ){
      openGames[area].push(yo.username);
    // else create game
    } else {
      var thisGame = new Game(yo.username, yo.location);
      openGames[area] = thisGame;
      setTimeout(function(){
        activeGames.push(thisGame);
        delete openGames[area];
      }, REGISTRATION_WINDOW*1000);
    }
  } else {
    thisGame = activeGames.findGame(yo.username);
    var marko = thisGame.getMarko();
    // if game.active and yo from marko, yoeach non-player
    if(yo.username === marko){
      thisGame.yoNonMarkos();
    // if game.active and yo from non-player, end game
    } else {
      thisGame.end();
    }
  }
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port)
});

function gameExists(userLocation){
  // get list of pending games
  var pendingGames = Object.keys(openGames);

  // if game is within 10 ft of another game, return true
  return pendingGames.some(function(pendingGame){
    var distance = calculators.distance(pendingGame, userLocation).toFeet();
    return distance < 10;
  });
}

/** Converts numeric km to ft */
if (typeof(Number.prototype.toFeet) === "undefined") {
  Number.prototype.toFeet = function() {
    return this * 3280.84;
  };
}
