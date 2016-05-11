var crypto = require('crypto');
var InvalidSignatureException = require('./exceptions/InvalidSignatureException');

exports.validateSignature = function(json, channelSecret, signature) {
  if (!signature) {
    throw new InvalidSignatureException('Signature must not be empty');
  }
  return signature === crypto.createHmac('SHA256', channelSecret).update(json).digest('base64');
};
