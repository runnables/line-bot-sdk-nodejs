var BaseEvent = require('./BaseEvent');

var FollowEvent = function (event) {
  this.event = event;
}
FollowEvent.prototype = new BaseEvent();
FollowEvent.prototype.constructor = FollowEvent;

module.exports = FollowEvent;
