module.exports = {
  client: function(config) {
    return require('./client/bot').init(config);
  },
  ContentType: require('./lib/constants/ContentType'),
  Markup: require('./lib/message/Markup'),
  MultipleMessages: require('./lib/message/MultipleMessages')
};
