'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var nock = require('nock');

chai.use(chaiAsPromised);

var LineBot = require('../');
var Markup = LineBot.Markup;
var MultipleMessages = LineBot.MultipleMessages;
var ContentType = require('../lib/constants/ContentType');
var RecipientType = require('../lib/constants/RecipientType');

function mockApi() {
  nock('https://trialbot-api.line.me')
    .post('/v1/events')
    .reply(200, {
      failed: [],
      messageId: '1460826285060',
      timestamp: 1460826285060,
      version: 1
    });
}

describe('client#SendMessage', function() {
  var config = {
    channelID: '1000000000',
    channelSecret: 'testsecret',
    channelMID: 'TEST_MID'
  };
  var client = LineBot.client(config);

  beforeEach(function() {
    mockApi();
  });

  it('should be able to send text', function() {
    var request = client.sendText(['DUMMY_MID'], 'hello!');

    return Promise.all([
      request.should.eventually.have.deep.property('statusCode', 200),
      request.should.eventually.have.deep.property('body.failed').that.be.empty,
      request.should.eventually.have.deep.property('body.messageId', '1460826285060'),
      request.should.eventually.have.deep.property('body.timestamp', 1460826285060),
      request.should.eventually.have.deep.property('body.version', 1),
      request.should.eventually.have.deep.property('request.method', 'POST'),
      request.should.eventually.have.deep.property('request.url', 'https://trialbot-api.line.me/v1/events'),
      request.should.eventually.have.deep.property('request._data.eventType', '138311608800106203'),
      request.should.eventually.have.deep.property('request._data.to').that.be.an('array').and.have.members(['DUMMY_MID']),
      request.should.eventually.have.deep.property('request._data.content.text', 'hello!'),
      request.should.eventually.have.deep.property('request._data.content.contentType', ContentType.TEXT),
      request.should.eventually.have.deep.property('request._data.content.toType', RecipientType.USER),
      request.should.eventually.have.deep.property('request.header.X-Line-ChannelID', '1000000000'),
      request.should.eventually.have.deep.property('request.header.X-Line-ChannelSecret', 'testsecret'),
      request.should.eventually.have.deep.property('request.header.X-Line-Trusted-User-With-ACL', 'TEST_MID')
    ]);
  });

  it('should be able to send image', function() {
    var request = client.sendImage(['DUMMY_MID'], 'http://example.com/image.jpg', 'http://example.com/preview.jpg');

    return Promise.all([
      request.should.eventually.have.deep.property('statusCode', 200),
      request.should.eventually.have.deep.property('body.failed').that.be.empty,
      request.should.eventually.have.deep.property('body.messageId', '1460826285060'),
      request.should.eventually.have.deep.property('body.timestamp', 1460826285060),
      request.should.eventually.have.deep.property('body.version', 1),
      request.should.eventually.have.deep.property('request.method', 'POST'),
      request.should.eventually.have.deep.property('request.url', 'https://trialbot-api.line.me/v1/events'),
      request.should.eventually.have.deep.property('request._data.eventType', '138311608800106203'),
      request.should.eventually.have.deep.property('request._data.to').that.be.an('array').and.have.members(['DUMMY_MID']),
      request.should.eventually.have.deep.property('request._data.content.originalContentUrl', 'http://example.com/image.jpg'),
      request.should.eventually.have.deep.property('request._data.content.previewImageUrl', 'http://example.com/preview.jpg'),
      request.should.eventually.have.deep.property('request._data.content.contentType', ContentType.IMAGE),
      request.should.eventually.have.deep.property('request._data.content.toType', RecipientType.USER),
      request.should.eventually.have.deep.property('request.header.X-Line-ChannelID', '1000000000'),
      request.should.eventually.have.deep.property('request.header.X-Line-ChannelSecret', 'testsecret'),
      request.should.eventually.have.deep.property('request.header.X-Line-Trusted-User-With-ACL', 'TEST_MID')
    ]);
  });

  it('should be able to send video', function() {
    var request = client.sendVideo(['DUMMY_MID'], 'http://example.com/video.mp4', 'http://example.com/preview.jpg');

    return Promise.all([
      request.should.eventually.have.deep.property('statusCode', 200),
      request.should.eventually.have.deep.property('body.failed').that.be.empty,
      request.should.eventually.have.deep.property('body.messageId', '1460826285060'),
      request.should.eventually.have.deep.property('body.timestamp', 1460826285060),
      request.should.eventually.have.deep.property('body.version', 1),
      request.should.eventually.have.deep.property('request.method', 'POST'),
      request.should.eventually.have.deep.property('request.url', 'https://trialbot-api.line.me/v1/events'),
      request.should.eventually.have.deep.property('request._data.eventType', '138311608800106203'),
      request.should.eventually.have.deep.property('request._data.to').that.be.an('array').and.have.members(['DUMMY_MID']),
      request.should.eventually.have.deep.property('request._data.content.originalContentUrl', 'http://example.com/video.mp4'),
      request.should.eventually.have.deep.property('request._data.content.previewImageUrl', 'http://example.com/preview.jpg'),
      request.should.eventually.have.deep.property('request._data.content.contentType', ContentType.VIDEO),
      request.should.eventually.have.deep.property('request._data.content.toType', RecipientType.USER),
      request.should.eventually.have.deep.property('request.header.X-Line-ChannelID', '1000000000'),
      request.should.eventually.have.deep.property('request.header.X-Line-ChannelSecret', 'testsecret'),
      request.should.eventually.have.deep.property('request.header.X-Line-Trusted-User-With-ACL', 'TEST_MID')
    ]);
  });

  it('should be able to send audio', function() {
    var request = client.sendAudio(['DUMMY_MID'], 'http://example.com/sound.m4a', 5000);

    return Promise.all([
      request.should.eventually.have.deep.property('statusCode', 200),
      request.should.eventually.have.deep.property('body.failed').that.be.empty,
      request.should.eventually.have.deep.property('body.messageId', '1460826285060'),
      request.should.eventually.have.deep.property('body.timestamp', 1460826285060),
      request.should.eventually.have.deep.property('body.version', 1),
      request.should.eventually.have.deep.property('request.method', 'POST'),
      request.should.eventually.have.deep.property('request.url', 'https://trialbot-api.line.me/v1/events'),
      request.should.eventually.have.deep.property('request._data.eventType', '138311608800106203'),
      request.should.eventually.have.deep.property('request._data.to').that.be.an('array').and.have.members(['DUMMY_MID']),
      request.should.eventually.have.deep.property('request._data.content.originalContentUrl', 'http://example.com/sound.m4a'),
      request.should.eventually.have.deep.property('request._data.content.contentMetadata.AUDLEN', '5000'),
      request.should.eventually.have.deep.property('request._data.content.contentType', ContentType.AUDIO),
      request.should.eventually.have.deep.property('request._data.content.toType', RecipientType.USER),
      request.should.eventually.have.deep.property('request.header.X-Line-ChannelID', '1000000000'),
      request.should.eventually.have.deep.property('request.header.X-Line-ChannelSecret', 'testsecret'),
      request.should.eventually.have.deep.property('request.header.X-Line-Trusted-User-With-ACL', 'TEST_MID')
    ]);
  });

  it('should be able to send location', function() {
    var request = client.sendLocation(['DUMMY_MID'], '2 Chome-21-1 Shibuya Tokyo 150-0002, Japan', 35.658240, 139.703478);

    return Promise.all([
      request.should.eventually.have.deep.property('statusCode', 200),
      request.should.eventually.have.deep.property('body.failed').that.be.empty,
      request.should.eventually.have.deep.property('body.messageId', '1460826285060'),
      request.should.eventually.have.deep.property('body.timestamp', 1460826285060),
      request.should.eventually.have.deep.property('body.version', 1),
      request.should.eventually.have.deep.property('request.method', 'POST'),
      request.should.eventually.have.deep.property('request.url', 'https://trialbot-api.line.me/v1/events'),
      request.should.eventually.have.deep.property('request._data.eventType', '138311608800106203'),
      request.should.eventually.have.deep.property('request._data.to').that.be.an('array').and.have.members(['DUMMY_MID']),
      request.should.eventually.have.deep.property('request._data.content.text', '2 Chome-21-1 Shibuya Tokyo 150-0002, Japan'),
      request.should.eventually.have.deep.property('request._data.content.location.title', '2 Chome-21-1 Shibuya Tokyo 150-0002, Japan'),
      request.should.eventually.have.deep.property('request._data.content.location.latitude', 35.658240),
      request.should.eventually.have.deep.property('request._data.content.location.longitude', 139.703478),
      request.should.eventually.have.deep.property('request._data.content.contentType', ContentType.LOCATION),
      request.should.eventually.have.deep.property('request._data.content.toType', RecipientType.USER),
      request.should.eventually.have.deep.property('request.header.X-Line-ChannelID', '1000000000'),
      request.should.eventually.have.deep.property('request.header.X-Line-ChannelSecret', 'testsecret'),
      request.should.eventually.have.deep.property('request.header.X-Line-Trusted-User-With-ACL', 'TEST_MID')
    ]);
  });

  it('should be able to send sticker', function() {
    var request = client.sendSticker(['DUMMY_MID'], 1, 2, 100);

    return Promise.all([
      request.should.eventually.have.deep.property('statusCode', 200),
      request.should.eventually.have.deep.property('body.failed').that.be.empty,
      request.should.eventually.have.deep.property('body.messageId', '1460826285060'),
      request.should.eventually.have.deep.property('body.timestamp', 1460826285060),
      request.should.eventually.have.deep.property('body.version', 1),
      request.should.eventually.have.deep.property('request.method', 'POST'),
      request.should.eventually.have.deep.property('request.url', 'https://trialbot-api.line.me/v1/events'),
      request.should.eventually.have.deep.property('request._data.eventType', '138311608800106203'),
      request.should.eventually.have.deep.property('request._data.to').that.be.an('array').and.have.members(['DUMMY_MID']),
      request.should.eventually.have.deep.property('request._data.content.contentMetadata.STKID', '1'),
      request.should.eventually.have.deep.property('request._data.content.contentMetadata.STKPKGID', '2'),
      request.should.eventually.have.deep.property('request._data.content.contentMetadata.STKVER', '100'),
      request.should.eventually.have.deep.property('request._data.content.contentType', ContentType.STICKER),
      request.should.eventually.have.deep.property('request._data.content.toType', RecipientType.USER),
      request.should.eventually.have.deep.property('request.header.X-Line-ChannelID', '1000000000'),
      request.should.eventually.have.deep.property('request.header.X-Line-ChannelSecret', 'testsecret'),
      request.should.eventually.have.deep.property('request.header.X-Line-Trusted-User-With-ACL', 'TEST_MID')
    ]);
  });

  it('should be able to send rich message', function() {
    var markup = new Markup(1040);

    markup
      .setAction('SOMETHING', 'something', 'https://line.me')
      .addListener('SOMETHING', 0, 0, 520, 520);

    var expectedMarkup = {
      scenes: {
        scene1: {
          listeners: [{
            params: [0, 0, 520, 520],
            type: 'touch',
            action: 'SOMETHING'
          }],
          draws: [{
            image: 'image1',
            x: 0,
            y: 0,
            w: 1040,
            h: 1040
          }]
        }
      },
      images: {
        image1: {
          x: 0,
          y: 0,
          w: 1040,
          h: 1040
        }
      },
      actions: {
        'SOMETHING': {
          text: 'something',
          params: {
            linkUri: 'https://line.me'
          },
          type: 'web'
        }
      },
      canvas: {
        initialScene: 'scene1',
        width: 1040,
        height: 1040
      }
    };

    var request = client.sendRichMessage(['DUMMY_MID'], 'http://example.com/image.jpg', 'Alt text', markup);

    return Promise.all([
      request.should.eventually.have.deep.property('statusCode', 200),
      request.should.eventually.have.deep.property('body.failed').that.be.empty,
      request.should.eventually.have.deep.property('body.messageId', '1460826285060'),
      request.should.eventually.have.deep.property('body.timestamp', 1460826285060),
      request.should.eventually.have.deep.property('body.version', 1),
      request.should.eventually.have.deep.property('request.method', 'POST'),
      request.should.eventually.have.deep.property('request.url', 'https://trialbot-api.line.me/v1/events'),
      request.should.eventually.have.deep.property('request._data.eventType', '138311608800106203'),
      request.should.eventually.have.deep.property('request._data.to').that.be.an('array').and.have.members(['DUMMY_MID']),
      request.should.eventually.have.deep.property('request._data.content.contentMetadata.ALT_TEXT', 'Alt text'),
      request.should.eventually.have.deep.property('request._data.content.contentMetadata.DOWNLOAD_URL', 'http://example.com/image.jpg'),
      request.should.eventually.have.deep.property('request._data.content.contentMetadata.MARKUP_JSON.scenes.scene1.listeners').that.is.an('array')
        .with.members([expectedMarkup.scenes.scene1.listeners[0]]),
      request.should.eventually.have.deep.property('request._data.content.contentMetadata.MARKUP_JSON.scenes.scene1.draws').that.is.an('array')
        .with.members([expectedMarkup.scenes.scene1.draws[0]]),
      request.should.eventually.have.deep.property('request._data.content.contentMetadata.MARKUP_JSON.images').that.eql(expectedMarkup.images),
      request.should.eventually.have.deep.property('request._data.content.contentMetadata.MARKUP_JSON.actions').that.eql(expectedMarkup.actions),
      request.should.eventually.have.deep.property('request._data.content.contentMetadata.MARKUP_JSON.canvas').that.eql(expectedMarkup.canvas),
      request.should.eventually.have.deep.property('request._data.content.contentType', ContentType.RICH_MESSAGE),
      request.should.eventually.have.deep.property('request._data.content.toType', RecipientType.USER),
      request.should.eventually.have.deep.property('request.header.X-Line-ChannelID', '1000000000'),
      request.should.eventually.have.deep.property('request.header.X-Line-ChannelSecret', 'testsecret'),
      request.should.eventually.have.deep.property('request.header.X-Line-Trusted-User-With-ACL', 'TEST_MID')
    ]);
  });

  it('should be able to send multiple messages', function() {
    var multipleMessages = new MultipleMessages();

    multipleMessages
      .addText('hello!')
      .addImage('http://example.com/image.jpg', 'http://example.com/preview.jpg')
      .addVideo('http://example.com/video.mp4', 'http://example.com/video_preview.jpg')
      .addAudio('http://example.com/audio.m4a', 5000)
      .addLocation('2 Chome-21-1 Shibuya Tokyo 150-0002, Japan', 35.658240, 139.703478)
      .addSticker(1, 2, 100);

    var request = client.sendMultipleMessages(['DUMMY_MID'], multipleMessages);

    return Promise.all([
      request.should.eventually.have.deep.property('statusCode', 200),
      request.should.eventually.have.deep.property('body.failed').that.be.empty,
      request.should.eventually.have.deep.property('body.messageId', '1460826285060'),
      request.should.eventually.have.deep.property('body.timestamp', 1460826285060),
      request.should.eventually.have.deep.property('body.version', 1),
      request.should.eventually.have.deep.property('request.method', 'POST'),
      request.should.eventually.have.deep.property('request.url', 'https://trialbot-api.line.me/v1/events'),
      request.should.eventually.have.deep.property('request._data.eventType', '140177271400161403'),
      request.should.eventually.have.deep.property('request._data.to').that.be.an('array').and.have.members(['DUMMY_MID']),
      request.should.eventually.have.deep.property('request._data.content.messages').to.be.an('array').that.satisfy(function(messages) {
        var message0 = messages[0].text === 'hello!' &&
          messages[0].contentType === ContentType.TEXT;
        var message1 = messages[1].originalContentUrl === 'http://example.com/image.jpg' &&
          messages[1].previewImageUrl === 'http://example.com/preview.jpg' &&
          messages[1].contentType === ContentType.IMAGE;
        var message2 = messages[2].originalContentUrl === 'http://example.com/video.mp4' &&
          messages[2].previewImageUrl === 'http://example.com/video_preview.jpg' &&
          messages[2].contentType === ContentType.VIDEO;
        var message3 = messages[3].originalContentUrl === 'http://example.com/audio.m4a' &&
          messages[3].contentMetadata.AUDLEN === '5000' &&
          messages[3].contentType === ContentType.AUDIO;
        var message4 = messages[4].text === '2 Chome-21-1 Shibuya Tokyo 150-0002, Japan' &&
          messages[4].location.title === '2 Chome-21-1 Shibuya Tokyo 150-0002, Japan' &&
          messages[4].location.latitude === 35.658240 &&
          messages[4].location.longitude === 139.703478 &&
          messages[4].contentType === ContentType.LOCATION;
        var message5 = messages[5].contentMetadata.STKID === '1' &&
          messages[5].contentMetadata.STKPKGID === '2' &&
          messages[5].contentMetadata.STKVER === '100' &&
          messages[5].contentType === ContentType.STICKER;

        return message0 && message1 && message2 && message3 && message4 && message5;
      }),
      request.should.eventually.have.deep.property('request._data.content.toType', RecipientType.USER),
      request.should.eventually.have.deep.property('request.header.X-Line-ChannelID', '1000000000'),
      request.should.eventually.have.deep.property('request.header.X-Line-ChannelSecret', 'testsecret'),
      request.should.eventually.have.deep.property('request.header.X-Line-Trusted-User-With-ACL', 'TEST_MID')
    ]);
  });
});
