var bot = require('./lib/bot.js');

module.exports = function(config) {
  return bot.init(config);
};

module.exports.Markup = require('./lib/message/Markup.js');
module.exports.MultipleMessages = require('./lib/message/MultipleMessages.js');
