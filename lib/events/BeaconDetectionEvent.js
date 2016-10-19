var BaseEvent = require('./BaseEvent');

var BeaconDetectionEvent = function (event) {
  this.event = event;
}
BeaconDetectionEvent.prototype = new BaseEvent();
BeaconDetectionEvent.prototype.constructor = BeaconDetectionEvent;

BeaconDetectionEvent.prototype.getHwid = function () {
  return (this.event.beacon || {}).hwid;
};

module.exports = BeaconDetectionEvent;
