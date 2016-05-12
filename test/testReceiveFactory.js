'use strict';
var chai = require('chai');
var should = chai.should();

var ReceiveFactory = require('../lib/receive/ReceiveFactory');
var Text = require('../lib/receive/message/Text');
var AddContact = require('../lib/receive/operation/AddContact');

describe('ReceiveFactory', function() {
  it('should be able to create receives from json', function(done) {
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

    var receives = ReceiveFactory.createFromJSON(config, json);

    receives.should.be.an.instanceof(Array).that.has.lengthOf(2);

    receives[0].should.be.an.instanceof(Text);
    receives[0].isMessage().should.be.true;
    receives[0].isOperation().should.be.false;
    receives[0].isValidEvent().should.be.true;
    receives[0].isSentMe().should.be.true;
    receives[0].getId().should.equal('ABCDEF-12345678901');
    receives[0].getContentId().should.equal('325708');
    receives[0].getCreatedTime().should.equal(1332394961610);
    receives[0].getFromMid().should.equal('uff2aec188e58752ee1fb0f9507c6529a');
    receives[0].isText().should.be.true;
    receives[0].getText().should.equal('hello');

    receives[1].should.be.an.instanceof(AddContact);
    receives[1].isMessage().should.be.false;
    receives[1].isOperation().should.be.true;
    receives[1].isValidEvent().should.be.true;
    receives[1].isAddContact().should.be.true;
    receives[1].getRevision().should.equal(2469);
    receives[1].getFromMid().should.equal('u0f3bfc598b061eba02183bfc5280886a');

    done();
  });
});
