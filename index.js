var bot = require('./lib/bot.js');
module.exports = function(config) {
  return bot.init(config);
};
