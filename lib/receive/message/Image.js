var ContentType = require('../../constants/ContentType');
var Message = require('../Message');

var Image = function(config, result) {
  this.config = config;
  this.result = result;
};
Image.prototype = new Message();
Image.prototype.constructor = Image;

Image.prototype.isImage = function() {
  return true;
};

Image.prototype.getContentType = function() {
  return ContentType.IMAGE;
};

Image.prototype.getImageUrl = function() {
	return this.result.originalContentUrl;
};

module.exports = Image;
