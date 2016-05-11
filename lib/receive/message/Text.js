var ContentType = require('../../constants/ContentType');
var Message = require('../Message');

var Text = function(config, result) {
  this.config = config;
  this.result = result;
};
Text.prototype = new Message();
Text.prototype.constructor = Text;

Text.prototype.isText = function() {
  return true;
};

Text.prototype.getContentType = function() {
  return ContentType.TEXT;
};

Text.prototype.getText = function() {
  return this.result.content.text;
};

module.exports = Text;
