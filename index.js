var bot = require('./lib/bot');

module.exports = function(config) {
  return bot.init(config);
};

module.exports.Markup = require('./lib/message/Markup');
module.exports.MultipleMessages = require('./lib/message/MultipleMessages');
module.exports.ContentType = require('./lib/constants/ContentType');