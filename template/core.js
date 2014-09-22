var socket = io.connect('http://localhost');
socket.on('news', function (tweet) {
  var text = '<p>' + tweet.text + '</p>';
  var image = '<img src="'+tweet.user.profile_image_url+'"/>'
  var title = '<h2>' + tweet.user.name + '</h2>'
  $("#tweets").prepend('<ul>' + image + title + text + '</ul>');
});