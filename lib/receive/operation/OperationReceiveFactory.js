var OpType = require('../../constants/OpType');
var UnsupportedContentTypeException = require('../../exceptions/UnsupportedContentTypeException');
var AddContact = require('./AddContact');
var BlockContact = require('./BlockContact');
var InvitedToGroup = require('./InvitedToGroup');
var AddedToRoom = require('./AddedToRoom');

exports.create = function(config, result) {
  var opType = result.content.opType;
  switch (opType) {
    case OpType.ADDED_AS_FRIEND:
      return new AddContact(config, result);
    case OpType.BLOCKED:
      return new BlockContact(config, result);
    case OpType.INVITED_TO_GROUP:
      return new InvitedToGroup(config, result);
    case OpType.ADDED_TO_ROOM:
      return new AddedToRoom(config, result);
    default:
      throw new UnsupportedContentTypeException('Unsupported opType is given: ' + opType);
  }
};