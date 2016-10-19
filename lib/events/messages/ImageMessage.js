var MessageEvent = require('../MessageEvent');

var ImageMessage = function (event) {
  this.message = event.message;
}
ImageMessage.prototype = new MessageEvent();
ImageMessage.prototype.constructor = ImageMessage;

module.exports = ImageMessage;
