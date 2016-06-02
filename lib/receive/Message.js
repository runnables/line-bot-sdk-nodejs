var Receive = require('./Receive');

function Message(config, result) {
  this.config = config;
  this.result = result;
}

Message.prototype = new Receive();
Message.prototype.constructor = Message;

Message.prototype.getResult = function() {
  return this.result;
};

Message.prototype.getConfig = function() {
  return this.config;
};

Message.prototype.isMessage = function() {
  return true;
};

Message.prototype.isSentMe = function() {
  return this.getResult().content.to.reduce((function(value, mid) {
    return value || this.getConfig().channelMID === mid;
  }).bind(this), false);
};

Message.prototype.getContentId = function() {
  return this.getResult().content.id;
};

Message.prototype.getCreatedTime = function() {
  return this.getResult().content.createdTime;
};

Message.prototype.getFromMid = function() {
  return this.getResult().content.from || this.getResult().content.to[0];
};

Message.prototype.getMidType = function() {
  return this.getResult().content.from ? 'user' : 'group';
};

Message.prototype.isText = function() {
  return false;
};

Message.prototype.isImage = function() {
  return false;
};

Message.prototype.isVideo = function() {
  return false;
};

Message.prototype.isAudio = function() {
  return false;
};

Message.prototype.isLocation = function() {
  return false;
};

Message.prototype.isSticker = function() {
  return false;
};

Message.prototype.isContact = function() {
  return false;
};

module.exports = Message;
