var BotAPIChannel = require('../constants/BotAPIChannel');
var method = Receive.prototype;
function Receive(config, result) {
  this.config = config;
  this.result = result;
}

method.isMessage = function() {
  return false;
};

method.isOperation = function() {
  return false;
};

method.getResult = function() {
  return this.result;
};

method.getConfig = function() {
  return this.config;
};

method.isValidEvent = function() {
  var result = this.getResult();
  var config = this.getConfig();

  return result.toChannel === config.channelID &&
    result.fromChannel === BotAPIChannel.RECEIVING_CHANNEL_ID &&
    result.from === BotAPIChannel.RECEIVING_CHANNEL_MID;
};

method.getId = function() {
  return this.getResult().id;
};

method.validateSignature = function(rawJSON, signature) {
  return SignatureValidator.validateSignature(rawJSON, this.getConfig().channelSecret, signature);
};

module.exports = Receive;
