var BaseEvent = require('./BaseEvent');

var UnfollowEvent = function (event) {
  this.event = event;
}
UnfollowEvent.prototype = new BaseEvent();
UnfollowEvent.prototype.constructor = UnfollowEvent;

module.exports = UnfollowEvent;
