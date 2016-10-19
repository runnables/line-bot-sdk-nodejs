var MessageEvent = require('../MessageEvent');

var VideoMessage = function (event) {
  this.message = event.message;
}
VideoMessage.prototype = new MessageEvent();
VideoMessage.prototype.constructor = VideoMessage;

module.exports = VideoMessage;
