var express = require('express');
var app = express();

app.get('/hello', function(req, res){
  res.sendfile(__dirname + '/hello.html');
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});

var Twitter = require('node-tweet-stream')
  , t = new Twitter({
    consumer_key: 'JSwd0sFkVGunfvAwrvSlECZEB',
    consumer_secret: 'Ezz0OHpFylLSEYrJOmtk7txRyxZMjIoguCUFNEer3Lh6CeNRmu',
    token: '117047483-ejjH2c3lR9gKHy0Z4uiBsQppJIDS6z8U7MHkNjlA',
    token_secret: 'PmZofv32MoNs1MUZcvlSwzOFG4O6avsQqaAbr8eAGn3Jr'
  })

t.on('error', function (err) {
  console.log('Oh no')
})

t.track('nodejs')
t.track('3YearsOfUnbroken')

var io = require('socket.io')(server);
io.on('connection', function (socket) {
  t.on('tweet', function (tweet) {
    console.log('tweet received', tweet)
    socket.emit('news', tweet.text);
  })
  socket.on('my other event', function (data) {
    console.log(data);
  });
});