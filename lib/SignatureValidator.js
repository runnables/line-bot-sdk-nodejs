var CryptoJS = require("crypto-js");
var InvalidSignatureException = require('./exceptions/InvalidSignatureException');

exports.validateSignature = function(json, channelSecret, signature) {
  if (!signature) {
    throw new InvalidSignatureException('Signature must not be empty');
  }
  return signature === CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(json, channelSecret));
};
