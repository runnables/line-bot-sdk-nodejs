var BaseEvent = require('./BaseEvent');

var LeaveEvent = function (event) {
  this.event = event;
}
LeaveEvent.prototype = new BaseEvent();
LeaveEvent.prototype.constructor = LeaveEvent;

module.exports = LeaveEvent;
