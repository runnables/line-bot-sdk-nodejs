var ContentType = require('../../constants/ContentType');
var Message = require('../Message');

var Video = function(config, result) {
  this.config = config;
  this.result = result;
};
Video.prototype = new Message();
Video.prototype.constructor = Video;

Video.prototype.isVideo = function() {
  return true;
};

Video.prototype.getContentType = function() {
  return ContentType.VIDEO;
};

module.exports = Video;
