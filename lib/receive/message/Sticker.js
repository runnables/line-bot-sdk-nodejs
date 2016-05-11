var ContentType = require('../../constants/ContentType');
var Message = require('../Message');

var Sticker = function(config, result) {
  this.config = config;
  this.result = result;
  this.meta = result.content.contentMetadata;
};
Sticker.prototype = new Message();
Sticker.prototype.constructor = Sticker;

Sticker.prototype.isSticker = function() {
  return true;
};

Sticker.prototype.getContentType = function() {
  return ContentType.STICKER;
};

Sticker.prototype.getStkPkgId = function() {
  return this.meta.STKPGKID;
};

Sticker.prototype.getStkId = function() {
  return this.meta.STKID;
};

Sticker.prototype.getStkVer = function() {
  return this.meta.STKVER;
};

Sticker.prototype.getStkTxt = function() {
  return this.meta.STKTXT;
};

module.exports = Sticker;
