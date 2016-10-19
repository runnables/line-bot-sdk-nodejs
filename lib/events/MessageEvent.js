var BaseEvent = require('./BaseEvent');

var MessageEvent = function (event) {
  this.message = event.message;
}
MessageEvent.prototype = new BaseEvent();
MessageEvent.prototype.constructor = MessageEvent;

MessageEvent.prototype.getMessageId = function () {
  return (this.message || {}).id;
};

module.exports = MessageEvent;
