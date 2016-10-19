var MessageEvent = require('../MessageEvent');

var AudioMessage = function (event) {
  this.message = event.message;
}
AudioMessage.prototype = new MessageEvent();
AudioMessage.prototype.constructor = AudioMessage;

module.exports = AudioMessage;
