'use strict';
var chai = require('chai');
var should = chai.should();

var SignatureValidator = require('../lib/SignatureValidator');

describe('SignatureValidator', function() {
  var config = {
    channelID: '1441301333',
    channelSecret: 'testsecret',
    channelMID: 'u0a556cffd4da0dd89c94fb36e36e1cdc'
  };

  var json = {
    result: [
      {
        from: 'u206d25c2ea6bd87c17655609a1c37cb8',
        fromChannel: '1341301815',
        to: ['u0cc15697597f61dd8b01cea8b027050e'],
        toChannel: '1441301333',
        eventType: '138311609000106303',
        id: 'ABCDEF-12345678901',
        content: {
          id: '325708',
          createdTime: 1332394961610,
          from: 'uff2aec188e58752ee1fb0f9507c6529a',
          to: ['u0a556cffd4da0dd89c94fb36e36e1cdc'],
          toType: 1,
          contentType: 1,
          text: 'hello'
        }
      },
      {
        from: 'u206d25c2ea6bd87c17655609a1c37cb8',
        fromChannel: '1341301815',
        to: ['u0cc15697597f61dd8b01cea8b027050e'],
        toChannel: '1441301333',
        eventType: '138311609100106403',
        id: 'ABCDEF-12345678902',
        content: {
          revision: 2469,
          opType: 4,
          params: [
            'u0f3bfc598b061eba02183bfc5280886a',
            null,
            null
          ]
        }
      }
    ]
  };

  var signature = 'kPXp0nPWSzfWAapWHiesbcztpKnXJoX8krCa1CcTghk=';

  it('should be able to validate signature', function(done) {
    SignatureValidator.validateSignature(JSON.stringify(json), config.channelSecret, signature).should.be.true;
    SignatureValidator.validateSignature(JSON.stringify(json), config.channelSecret, 'XXX').should.be.false;

    done();
  });
});
