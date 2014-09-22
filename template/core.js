var socket = io.connect('http://localhost');
socket.on('news', function (tweet) {
  image = new Image()
  image.src = tweet.user.profile_image_url;
  image.onload = function() {
    var source   = $("#tweet-template").html();
    var template = Handlebars.compile(source);
    $("#tweets").prepend(template(tweet));
  }
});