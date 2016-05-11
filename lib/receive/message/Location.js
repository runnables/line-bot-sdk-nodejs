var ContentType = require('../../constants/ContentType');
var Message = require('../Message');

var Location = function(config, result) {
  this.config = config;
  this.result = result;
  this.location = result.content.location;
};
Location.prototype = new Message();
Location.prototype.constructor = Location;

Location.prototype.isLocation = function() {
  return true;
};

Location.prototype.getContentType = function() {
  return ContentType.LOCATION;
};

Location.prototype.getText = function() {
  return this.location.title; // `this.location.text` is always null
};

Location.prototype.getTitle = function() {
  return this.location.title;
};

Location.prototype.getAddress = function() {
  return this.location.address;
};

Location.prototype.getLatitude = function() {
  return this.location.latitude;
};

Location.prototype.getLongitude = function() {
  return this.location.longitude;
};

module.exports = Location;
