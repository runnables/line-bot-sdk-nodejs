module.exports = function UnsupportedContentTypeException(message) {
  this.message = message;
  this.name = 'UnsupportedContentTypeException';
};