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
  var json = '{\n\
  "result":[\n\
    {\n\
      "from":"u206d25c2ea6bd87c17655609a1c37cb8",\n\
      "fromChannel":"1341301815",\n\
      "to":["u0cc15697597f61dd8b01cea8b027050e"],\n\
      "toChannel":"1441301333",\n\
      "eventType":"138311609000106303",\n\
      "id":"ABCDEF-12345678901",\n\
      "content":{\n\
        "id":"325708",\n\
        "createdTime":1332394961610,\n\
        "from":"uff2aec188e58752ee1fb0f9507c6529a",\n\
        "to":["u0a556cffd4da0dd89c94fb36e36e1cdc"],\n\
        "toType":1,\n\
        "contentType":1,\n\
        "text":"hello"\n\
      }\n\
    },\n\
    {\n\
      "from":"u206d25c2ea6bd87c17655609a1c37cb8",\n\
      "fromChannel":"1341301815",\n\
      "to":["u0cc15697597f61dd8b01cea8b027050e"],\n\
      "toChannel":"1441301333",\n\
      "eventType":"138311609100106403",\n\
      "id":"ABCDEF-12345678902",\n\
      "content":{\n\
        "revision":2469,\n\
        "opType":4,\n\
        "params":[\n\
          "u0f3bfc598b061eba02183bfc5280886a",\n\
          null,\n\
          null\n\
        ]\n\
      }\n\
    }\n\
  ]\n\
}';

  var signature = 'kPXp0nPWSzfWAapWHiesbcztpKnXJoX8krCa1CcTghk=';

  it('should be able to validate signature', function(done) {
    SignatureValidator.validateSignature(json, config.channelSecret, signature).should.be.true;
    SignatureValidator.validateSignature(json, config.channelSecret, 'XXX').should.be.false;
    done();
  });
});
