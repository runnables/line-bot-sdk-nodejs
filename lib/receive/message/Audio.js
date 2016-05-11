var ContentType = require('../../constants/ContentType');
var Message = require('../Message');

var Audio = function(config, result) {
  this.config = config;
  this.result = result;
};
Audio.prototype = new Message();
Audio.prototype.constructor = Audio;

Audio.prototype.isAudio = function() {
  return true;
};

Audio.prototype.getContentType = function() {
  return ContentType.AUDIO;
};

module.exports = Audio;
