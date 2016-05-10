var bot = require('./lib/bot.js');

module.exports = function(config) {
  return bot.init(config);
};

module.exports.Markup = require('./lib/message/markup.js');
