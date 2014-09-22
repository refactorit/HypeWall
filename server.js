var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendfile(__dirname + '/template/main.html');
});
app.use("/template", express.static(__dirname + '/template'));

var server = app.listen(9090, function() {
  console.log('Listening on port %d', server.address().port);
});

var Twitter = require('node-tweet-stream');
var t = new Twitter({
  consumer_key: 'JSwd0sFkVGunfvAwrvSlECZEB',
  consumer_secret: 'Ezz0OHpFylLSEYrJOmtk7txRyxZMjIoguCUFNEer3Lh6CeNRmu',
  token: '117047483-ejjH2c3lR9gKHy0Z4uiBsQppJIDS6z8U7MHkNjlA',
  token_secret: 'PmZofv32MoNs1MUZcvlSwzOFG4O6avsQqaAbr8eAGn3Jr'
});

t.on('error', function (err) {
  console.log('Error!')
});

t.track('london')

var io = require('socket.io')(server);
io.on('connection', function (socket) {
  t.on('tweet', function (tweet) {
    console.log('New tweet: ', tweet.text)
    socket.emit('news', tweet);
  })
});