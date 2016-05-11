var BotAPIChannel = require('../constants/BotAPIChannel');
var method = Receive.prototype;
function Receive() {}

method.isMessage = function() {
  return false;
};

method.isOperation = function() {
  return false;
};

method.isValidEvent = function() {
  var result = this.getResult();
  var config = this.getConfig();

  return result.toChannel === config.channelId &&
    result.fromChannel === BotAPIChannel.RECEIVING_CHANNEL_ID &&
    result.from === BotAPIChannel.RECEIVING_CHANNEL_ID;
};

method.getId = function() {
  return this.getResult().id;
};

module.exports = Receive;
