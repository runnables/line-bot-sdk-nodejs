var MessageEvent = require('../MessageEvent');

var StickerMessage = function (event) {
  this.message = event.message;
}
StickerMessage.prototype = new MessageEvent();
StickerMessage.prototype.constructor = StickerMessage;

StickerMessage.prototype.getPackageId = function () {
  return this.message.packageId;
};

StickerMessage.prototype.getStickerId = function () {
  return this.message.stickerId;
};

module.exports = StickerMessage;
