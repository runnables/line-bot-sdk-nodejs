module.exports = function UnsupportedEventTypeException(message) {
  this.message = message;
  this.name = 'UnsupportedEventTypeException';
};