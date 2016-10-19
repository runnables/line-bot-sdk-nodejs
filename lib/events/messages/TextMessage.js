var MessageEvent = require('../MessageEvent');

var TextMessage = function (event) {
  this.message = event.message;
}
TextMessage.prototype = new MessageEvent();
TextMessage.prototype.constructor = TextMessage;

TextMessage.prototype.getText = function () {
  return this.message.text;
};

module.exports = TextMessage;
