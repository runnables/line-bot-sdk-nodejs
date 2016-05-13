var debug = require('debug');
var error = debug('line-bot:error');
var log = debug('line-bot:log');
var request = require('superagent-promise')(require('superagent'), Promise);
var merge = require('lodash.merge');

var ReceiveFactory = require('./receive/ReceiveFactory');
var SignatureValidator = require('./SignatureValidator');

var BotAPIChannel = require('./constants/BotAPIChannel');
var Endpoint = require('./constants/Endpoint');
var EventType = require('./constants/EventType');
var MessageBuilder = require('./message/builder');
var MultipleMessagesBuilder = require('./message/multipleMessagesBuilder');
var RecipientType = require('./constants/RecipientType');

module.exports.init = function(config) {
  var api = {};
  var defaultHeaders = { 'Content-Type': 'application/json; charset=UTF-8' };
  if (config.channelToken) {
    // For Business Connect
    defaultHeaders['X-LINE-ChannelToken'] = config.channelToken;
  } else {
    // For Trial
    defaultHeaders['X-Line-ChannelID'] = config.channelID;
    defaultHeaders['X-Line-ChannelSecret'] = config.channelSecret;
    defaultHeaders['X-Line-Trusted-User-With-ACL'] = config.channelMID;
  }

  api.sendText = function(mid, text, toType) {
    return this.sendMessage(mid, MessageBuilder.buildText(text), toType || RecipientType.USER);
  };

  api.sendImage = function(mid, imageUrl, previewUrl, toType) {
    return this.sendMessage(mid, MessageBuilder.buildImage(imageUrl, previewUrl), toType || RecipientType.USER);
  };

  api.sendVideo = function(mid, videoUrl, previewImageUrl, toType) {
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

  // Not supported for groups and rooms.
  api.sendMultipleMessages = function(mid, multipleMessages, messageNotified) {
    return this.sendMessage(mid, MultipleMessagesBuilder.buildMultipleMessages(multipleMessages, messageNotified || 0), null, EventType.SENDING_MULTIPLE_MESSAGES);
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

  api.validateSignature = function(rawJSON, signature) {
    return SignatureValidator.validateSignature(rawJSON, config.channelSecret, signature);
  };

  api.createReceivesFromJSON = function(json) {
    return ReceiveFactory.createFromJSON(config, json);
  };

  api.sendMessage = function(mid, data, toType, eventType) {
    return this.postMessage({
      to: mid instanceof Array ? mid: [mid],
      content: merge(data, { toType: toType || RecipientType.USER })
    }, eventType || EventType.SENDING_MESSAGE);
  };

  api.postMessage = function(data, eventType) {
    data.toChannel = BotAPIChannel.SENDING_CHANNEL_ID;
    data.eventType = eventType;

    // debugging
    log('POST ' + Endpoint.EVENT);
    log('headers:');
    log(defaultHeaders);
    log('body:');
    log(data);

    return request.post(Endpoint.EVENT)
    .set(defaultHeaders)
    .send(data)
    .then(function(res) {
      return res;
    }, function(err) {
      var response = err.response;

      // debugging
      error('statusCode: ' + response.statusCode);
      error('body: ');
      error(response.body);

      throw err;
    });
  };

  // For Business Connect
  api.sendLinkMessage = function() {

  };

  // For Business Connect
  api.leaveGroup = function(groupId) {
    if (!config.channelToken) throw new Error('Leave a group is only appear in Business Connect API');
    return request.delete(Endpoint.LEAVE_GROUP + groupId)
    .set(defaultHeaders)
    .then(function(res) {
      return res;
    }, function(err) {
      var response = err.response;

      // debugging
      error('statusCode: ' + response.statusCode);
      error('body: ');
      error(response.body);

      throw err;
    });
  };

  // For Business Connect
  api.leaveRoom = function(roomId) {
    if (!config.channelToken) throw new Error('Leave a group is only appear in Business Connect API');
    return request.delete(Endpoint.LEAVE_ROOM + groupId)
    .set(defaultHeaders)
    .then(function(res) {
      return res;
    }, function(err) {
      var response = err.response;

      // debugging
      error('statusCode: ' + response.statusCode);
      error('body: ');
      error(response.body);

      throw err;
    });
  };

  // For Business Connect
  api.addOfficialAccount = function(accessToken) {
    if (!config.channelToken) throw new Error('Add an official account to a user\'s friend list is only appear in Business Connect API');
    return request.post(Endpoint.OFFICAL_ACCOUNT_CONTACTS)
    .set('X-Line-ChannelToken', accessToken)
    .then(function(res) {
      return res;
    }, function(err) {
      var response = err.response;

      // debugging
      error('statusCode: ' + response.statusCode);
      error('body: ');
      error(response.body);

      throw err;
    });
  };

  return api;
};
