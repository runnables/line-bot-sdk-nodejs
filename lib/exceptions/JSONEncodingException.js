module.exports = function JSONEncodingException(message) {
  this.message = message;
  this.name = 'JSONEncodingException';
};