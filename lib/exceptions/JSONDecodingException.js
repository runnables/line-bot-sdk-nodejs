module.exports = function JSONDecodingException(message) {
  this.message = message;
  this.name = 'JSONDecodingException';
};