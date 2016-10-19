var debug = require('debug');
var error = debug('line-bot:error');
var log = debug('line-bot:log');
var request = require('superagent');

var MessageEvent = require('./events/MessageEvent');
var InvalidEventRequestException = require('./exceptions/InvalidEventRequestException');
var InvalidSignatureException = require('./exceptions/InvalidSignatureException');
var UnknownEventTypeException = require('./exceptions/UnknownEventTypeException');
var UnknownMessageTypeException = require('./exceptions/UnknownMessageTypeException');
var SignatureValidator = require('./SignatureValidator');

module.exports.init = function (config) {
  var DEFAULT_ENDPOINT_BASE = 'https://api.line.me';
  var api = {};

  api.getProfile = function (userId) {
    return request.get(DEFAULT_ENDPOINT_BASE + '/v2/bot/profile/' + encodeURIComponent(userId));
  };

  api.getMessageContent = function (messageId) {
    return request.get(DEFAULT_ENDPOINT_BASE + '/v2/bot/message/' + encodeURIComponent(messageId) + '/content');
  };

  api.replyMessage = function (replyToken, messageBuilder) {
    return request.post(DEFAULT_ENDPOINT_BASE + '/v2/bot/message/reply')
      .send({
        replyToken: replyToken,
        messages: messageBuilder.buildMessage()
      });
  };

  api.replyText = function (replyToken, text, extraTexts) {

  };

  api.pushMessage = function (to, messageBuilder) {

  };

  api.leaveGroup = function (groupId) {

  };

  api.leaveRoom = function (roomId) {

  };


}