var Receive = require('./Receive');

function Operation(config, result) {
  this.config = config;
  this.result = result;
}

Operation.prototype = new Receive();
Operation.prototype.constructor = Operation;

Operation.prototype.isOperation = function() {
  return true;
};

Operation.prototype.getResult = function() {
  return this.result;
};

Operation.prototype.getConfig = function() {
  return this.config;
};

Operation.prototype.getRevision = function() {
  return this.getResult().content.revision;
};

Operation.prototype.getFromMid = function() {
  return this.getResult().content.params[0];
};

Operation.prototype.isAddContact = function() {
  return false;
};

Operation.prototype.isBlockContact = function() {
  return false;
};

Operation.prototype.isInvitedToGroup = function() {
  return false;
};

Operation.prototype.isAddedToRoom = function() {
  return false;
};

module.exports = Operation;
