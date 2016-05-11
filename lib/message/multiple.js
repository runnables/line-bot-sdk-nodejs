var MessageBuilder = require('./builder');

var method = MultipleMessages.prototype;
function MultipleMessages() {
  this.messages = [];
}

method.addText = function(text) {
  this.messages = MessageBuilder.buildText(text);
  return this;
};

method.addImage = function(imageUrl, previewUrl) {
  this.messages = MessageBuilder.buildImage(imageUrl, previewUrl);
  return this;
};

method.addVideo = function(videoUrl, previewImageUrl) {
  this.messages = MessageBuilder.buildVideo(videoUrl, previewImageUrl);
  return this;
};

method.addAudio = function(audioUrl, duration) {
  this.messages = MessageBuilder.buildAudio(audioUrl, duration);
  return this;
};

method.addLocation = function(text, latitude, longitude) {
  this.messages = MessageBuilder.buildLocation(text, latitude, longitude);
  return this;
};

method.addSticker = function(stkid, stkpkgid, stkver) {
  this.messages = MessageBuilder.buildSticker(stkid, stkpkgid, stkver);
  return this;
};

method.getMessages = function() {
  return this.messages;
};

module.exports = MultipleMessages;
