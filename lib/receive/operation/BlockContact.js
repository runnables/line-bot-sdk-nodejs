var OpType = require('../../constants/OpType');
var Operation = require('../Operation');

var BlockContact = function(config, result) {
  this.config = config;
  this.result = result;
};
BlockContact.prototype = new Operation();
BlockContact.prototype.constructor = BlockContact;

BlockContact.prototype.isBlockContact = function() {
  return true;
};

BlockContact.prototype.getContentType = function() {
  return ContentType.BLOCKED;
};

module.exports = BlockContact;
