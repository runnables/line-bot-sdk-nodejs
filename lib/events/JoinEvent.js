var BaseEvent = require('./BaseEvent');

var JoinEvent = function (event) {
  this.event = event;
}
JoinEvent.prototype = new BaseEvent();
JoinEvent.prototype.constructor = JoinEvent;

module.exports = JoinEvent;
