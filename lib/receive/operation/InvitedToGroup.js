var OpType = require('../../constants/OpType');
var Operation = require('../Operation');

var InvitedToGroup = function(config, result) {
  this.config = config;
  this.result = result;
};
InvitedToGroup.prototype = new Operation();
InvitedToGroup.prototype.constructor = InvitedToGroup;

InvitedToGroup.prototype.isInvitedToGroup = function() {
  return true;
};

InvitedToGroup.prototype.getOperationType = function() {
  return OpType.INVITED_TO_GROUP;
};

module.exports = InvitedToGroup;
