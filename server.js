var config = require('./config.js')

var _ = require('underscore')
var express = require('express');
var app = express();
var mongo = require('mongodb');
var db = require('monk')(config.dbhost);

app.use("/template", express.static(__dirname + '/template'));
app.use("/frontend_libs", express.static(__dirname + '/frontend_libs'));

var server = app.listen(config.port, function() {
  console.log('Listening on port %d', server.address().port);
});
var io = require('socket.io')(server);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/template/main.html');
  var collection = db.get('tweets');

  io.on('connection', function (socket) {
    collection.find({},{},function(e,docs){
        _.each(docs, function(tweet){
          socket.emit('news',tweet);
        });
    });
  });

});

var Twitter = require('node-tweet-stream');
var t = new Twitter(config.twitter);
t.track(config.tags)

io.on('connection', function (socket) {
  var tweetCollection = db.get('tweets');
  t.on('tweet', function (tweet) {
    socket.emit('news', tweet);
    tweetCollection.insert(tweet);
  })
});
