var ContentType = require('../constants/ContentType');
var MultipleMessages = require('./MultipleMessages.js');

exports.buildMultipleMessages = function(multipleMessages, messageNotified) {
  if (!(multipleMessages instanceof MultipleMessages)) throw new Error('Invalid multipleMessages');

  return {
    messages: multipleMessages.getMessages(),
    messageNotified: messageNotified
  }
};
