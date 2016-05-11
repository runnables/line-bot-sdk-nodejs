module.exports = function InvalidSignatureException(message) {
  this.message = message;
  this.name = 'InvalidSignatureException';
};