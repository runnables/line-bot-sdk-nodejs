var MessageBuilder = require('./builder');

var method = MultipleMessages.prototype;
function MultipleMessages() {
  this.messages = [];
}

method.addText = (text) => {
  this.messages = MessageBuilder.buildText(text);
  return this;
}

method.addImage = (imageUrl, previewUrl) => {
  this.messages = MessageBuilder.buildImage(imageUrl, previewUrl);
  return this;
}

method.addVideo = (videoUrl, previewImageUrl) => {
  this.messages = MessageBuilder.buildVideo(videoUrl, previewImageUrl);
  return this;
}

method.addAudio = (audioUrl, duration) => {
  this.messages = MessageBuilder.buildAudio(audioUrl, duration);
  return this;
}

method.addLocation = (text, latitude, longitude) => {
  this.messages = MessageBuilder.buildLocation(text, latitude, longitude);
  return this;
}

method.addSticker = (stkid, stkpkgid, stkver) => {
  this.messages = MessageBuilder.buildSticker(stkid, stkpkgid, stkver);
  return this;
}

method.getMessages = () => {
  return this.messages;
}

module.exports = MultipleMessages;
