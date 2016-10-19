module.exports = function InvalidEventRequestException(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra;
};

require('util').inherits(module.exports, Error);