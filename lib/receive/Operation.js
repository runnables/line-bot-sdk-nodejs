var method = Operation.prototype;

function Operation(config, result) {
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

method.isOperation = function() {
  return true;
};

method.getResult = function() {
  return this.result;
};

method.getConfig = function() {
  return this.config;
};

method.getRevision = function() {
  return this.getResult().content.revision;
};

method.getFromMid = function() {
  return this.getResult().content.params[0];
};

method.isAddContact = function() {
  return false;
};

method.isBlockContact = function() {
  return false;
};

module.exports = Operation;
