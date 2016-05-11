var method = Message.prototype;

function Message(config, result) {
  this.config = config;
  this.result = result;
}

method.isValidEvent = function() {
  var result = this.getResult();
  var config = this.getConfig();

  return result.toChannel === config.channelId &&
  result.fromChannel === BotAPIChannel.RECEIVING_CHANNEL_ID &&
  result.from === BotAPIChannel.RECEIVING_CHANNEL_MID;
};

method.getId = function() {
  return this.getResult().id;
};

method.getResult = function() {
  return this.result;
};

method.getConfig = function() {
  return this.config;
};

method.isMessage = function() {
  return true;
};

method.isSentMe = function() {
  return this.getResult().content.to.reduce(function(value, mid) {
    return value || this.getConfig().trustedUserWithACL === mid;
  }, false);
};

method.getContentId = function() {
  return this.getResult().content.id;
};

method.getCreatedTime = function() {
  return this.getResult().content.createdTime;
};

method.getFromMid = function() {
  return this.getResult().content.from;
};

method.isText = function() {
  return false;
};

method.isImage = function() {
  return false;
};

method.isVideo = function() {
  return false;
};

method.isAudio = function() {
  return false;
};

method.isLocation = function() {
  return false;
};

method.isSticker = function() {
  return false;
};

method.isContact = function() {
  return false;
};

module.exports = Message;
