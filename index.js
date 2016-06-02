module.exports = {
  client: function(config) {
    return require('./lib/client').init(config);
  },
  ContentType: require('./lib/constants/ContentType'),
  EventType: require('./lib/constants/EventType'),
  OpType: require('./lib/constants/OpType'),
  RecipientType: require('./lib/constants/RecipientType'),
  Markup: require('./lib/message/Markup'),
  MultipleMessages: require('./lib/message/MultipleMessages')
};
