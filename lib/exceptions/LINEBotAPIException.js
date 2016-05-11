module.exports = function LineBotAPIException(message) {
  this.message = message;
  this.name = 'LineBotAPIException';
};