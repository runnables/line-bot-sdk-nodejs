var MessageBuilder = require('./builder');

function MultipleMessages() {
  this.messages = [];
}

MultipleMessages.prototype.addText = function(text) {
  this.messages.push(MessageBuilder.buildText(text));
  return this;
};

MultipleMessages.prototype.addImage = function(imageUrl, previewUrl) {
  this.messages.push(MessageBuilder.buildImage(imageUrl, previewUrl));
  return this;
};

MultipleMessages.prototype.addVideo = function(videoUrl, previewImageUrl) {
  this.messages.push(MessageBuilder.buildVideo(videoUrl, previewImageUrl));
  return this;
};

MultipleMessages.prototype.addAudio = function(audioUrl, duration) {
  this.messages.push(MessageBuilder.buildAudio(audioUrl, duration));
  return this;
};

MultipleMessages.prototype.addLocation = function(text, latitude, longitude) {
  this.messages.push(MessageBuilder.buildLocation(text, latitude, longitude));
  return this;
};

MultipleMessages.prototype.addSticker = function(stkid, stkpkgid, stkver) {
  this.messages.push(MessageBuilder.buildSticker(stkid, stkpkgid, stkver));
  return this;
};

MultipleMessages.prototype.getMessages = function() {
  return this.messages;
};

module.exports = MultipleMessages;
