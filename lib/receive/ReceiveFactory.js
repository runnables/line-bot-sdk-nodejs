var EventType = require('../constants/EventType');
var MessageReceiveFactory = require('./message/MessageReceiveFactory');
var OperationReceiveFactory = require('./operation/OperationReceiveFactory');
var UnsupportedEventTypeException = require('../exceptions/UnsupportedEventTypeException');

exports.create = function(config, result) {
  var eventType = result.eventType;
  switch (eventType) {
    case EventType.RECEIVING_MESSAGE:
      return MessageReceiveFactory.create(config, result);
    case EventType.RECEIVING_OPERATION:
      return OperationReceiveFactory.create(config, result);
    default:
      throw new UnsupportedEventTypeException('Undefined eventType: ' + eventType);
  }
};

exports.createFromJSON = function(config, json) {
  if (!json) return [];
  return json.result.map(function(result) {
    return this.create(config, result);
  }.bind(this));
};