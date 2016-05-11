var OpType = require('../../constants/OpType');
var Operation = require('../Operation');

var AddContact = function(config, result) {
  this.config = config;
  this.result = result;
};
AddContact.prototype = new Operation();
AddContact.prototype.constructor = AddContact;

AddContact.prototype.isAddContact = function() {
  return true;
};

AddContact.prototype.getOperationType = function() {
  return OpType.ADDED_AS_FRIEND;
};

module.exports = AddContact;
