var EventSourceType = require('../constants/EventSourceType');
var InvalidEventSourceException = require('../exceptions/InvalidEventSourceException');
var method = BaseEvent.prototype;

function BaseEvent (event) {
  this.event = event;
}

method.getType = function () {
  return this.event.type;
};

method.getTimestamp = function () {
  return this.event.timestamp;
};

method.getReplyToken = function () {
  return this.event.replyToken || null;
};

method.isUserEvent = function () {
  return (this.event.source || {}).type === EventSourceType.USER;
};

method.isGroupEvent = function () {
  return (this.event.source || {}).type === EventSourceType.GROUP;
};

method.isRoomEvent = function () {
  return (this.event.source || {}).type === EventSourceType.ROOM;
};

method.getUserId = function () {
  if (!method.isUserEvent()) {
    throw new InvalidEventSourceException('This event source is not a user type');
  }
  return (this.event.source || {}).userId || null;
};

method.getGroupId = function () {
  if (!method.isGroupEvent()) {
    throw new InvalidEventSourceException('This event source is not a group type');
  }
  return (this.event.source || {}).groupId || null;
};

method.getRoomId = function () {
  if (!method.isRoomEvent()) {
    throw new InvalidEventSourceException('This event source is not a room type');
  }
  return (this.event.source || {}).roomId || null;
};

module.exports = BaseEvent;
