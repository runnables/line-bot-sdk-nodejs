var MessageEvent = require('../MessageEvent');

var LocationMessage = function (event) {
  this.message = event.message;
}
LocationMessage.prototype = new MessageEvent();
LocationMessage.prototype.constructor = LocationMessage;

LocationMessage.prototype.getTitle = function () {
  return this.message.title;
};

LocationMessage.prototype.getAddress = function () {
  return this.message.address;
};

LocationMessage.prototype.getLatitude = function () {
  return this.message.latitude;
};

LocationMessage.prototype.getLongitude = function () {
  return this.message.longitude;
};

module.exports = LocationMessage;
