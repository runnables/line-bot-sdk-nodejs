module.exports = {
  client: function(config) {
    return require('./lib/bot').init(config);
  },
  ContentType: require('./lib/constants/ContentType'),
  Markup: require('./lib/message/Markup'),
  MultipleMessages: require('./lib/message/MultipleMessages')
};
