var BaseEvent = require('./BaseEvent');

var PostbackEvent = function (event) {
  this.event = event;
}
PostbackEvent.prototype = new BaseEvent();
PostbackEvent.prototype.constructor = PostbackEvent;

PostbackEvent.prototype.getPostbackData = function () {
  return (this.event.postback || {}).data;
};

module.exports = PostbackEvent;
