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

BlockContact.prototype.getOperationType = function() {
  return OpType.BLOCKED;
};

module.exports = BlockContact;
