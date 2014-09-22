var socket = io.connect('http://localhost');
socket.on('news', function (tweet) {
  var imgUrl = tweet.user.profile_image_url;
  var text = '<p>' + tweet.text + '</p>';
  var imageTag = '<img src="'+imgUrl+'"/>'
  var title = '<h2>' + tweet.user.name + '</h2>'
  image = new Image()
  image.src = imgUrl
  image.onload = function() {
    $("#tweets").prepend('<ul>' + imageTag + title + text + '</ul>');
  }
});