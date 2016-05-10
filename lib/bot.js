var debug = require('debug');
var error = debug('line-bot:error');
var request = require('superagent-promise')(require('superagent'), Promise);
var _ = require('lodash');

var BotAPIChannel = require('./constants/BotAPIChannel');
var Endpoint = require('./constants/Endpoint');
var EventType = require('./constants/EventType');
var MessageBuilder = require('./message/builder');
var RecipientType = require('./constants/RecipientType');

module.exports.init = function(config) {
  var api = {};
  var defaultHeaders = {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Line-ChannelID': config.channelID,
    'X-Line-ChannelSecret': config.channelSecret,
    'X-Line-Trusted-User-With-ACL': config.trustedUserWithACL
  };

  api.sendText = function(mid, text, toType) {
    return this.sendMessage(mid, MessageBuilder.buildText(text), toType || RecipientType.USER);
  };

  api.sendImage = function(mid, imageUrl, previewUrl, toType) {
    return this.sendMessage(mid, MessageBuilder.buildImage(imageUrl, previewUrl), toType || RecipientType.USER);
  };

  api.sendVideo = function(mid, videoUrl, previewImageURL, toType) {
    return this.sendMessage(mid, MessageBuilder.buildVideo(videoUrl, previewImageUrl), toType || RecipientType.USER);
  };

  api.sendAudio = function(mid, audioUrl, durationMillis, toType) {
    return this.sendMessage(mid, MessageBuilder.buildAudio(audioUrl, durationMillis), toType || RecipientType.USER);
  };

  api.sendLocation = function(mid, text, latitude, longitude, toType) {
    return this.sendMessage(mid, MessageBuilder.buildLocation(text, latitude, longitude), toType || RecipientType.USER);
  };

  api.sendSticker = function(mid, stkid, stkpkgid, stkver, toType) {
    return this.sendMessage(mid, MessageBuilder.buildSticker(stkid, stkpkgid, stkver || null), toType || RecipientType.USER);
  };

  api.sendRichMessage = function(mid, imageUrl, altText, markup, toType) {
    return this.sendMessage(mid, MessageBuilder.buildRichMessage(imageUrl, altText, markup), toType || RecipientType.USER);
  };

  api.sendMultipleMessages = function(mid, multipleMessages, messageNotified) {
    return this.sendMessage(mid, MessageBuider.buildMultipleMessages(multipleMessages, meessageNotitied || 0), null, EventType.SENDING_MULTIPLE_MESSAGES);
  };

  api.getMessageContent = function(messageId, fileHandler) {

  };

  api.getMessageContentPreview = function(messageId, fileHandler) {

  };

  api.getUserProfile = function(mid) {
    return request.get(Endpoint.PROFILE)
    .set(defaultHeaders)
    .query({ mids: mid instanceof Array ? mid.join() : mid })
    .end();
  };

  api.validateSignature = function(json, signature) {

  };

  api.createReceivesFromJSON = function(json) {

  };

  api.sendMessage = function(mid, data, toType, eventType) {
    return this.postMessage({
      to: mid instanceof Array ? mid: [mid],
      content: _.merge(data, { toType: toType || RecipientType.USER })
    }, eventType || EventType.SENDING_MESSAGE);
  };

  api.postMessage = function(data, eventType) {
    data.toChannel = BotAPIChannel.SENDING_CHANNEL_ID;
    data.eventType = eventType;

    return request.post(Endpoint.EVENT)
    .set(defaultHeaders)
    .send(data)
    .then(function(res) {
      return res;
    }, function(err) {
      var response = err.response;
      
      error('statusCode: ' + response.statusCode);
      error('body: ');
      error(response.body);

      throw err;
    });
  };

  return api;
};
