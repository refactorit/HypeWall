var socket = io.connect('http://localhost');
socket.on('news', function (tweet) {
  $("#tweets").prepend('<li>'+tweet.text+'</li>');
});