var ContentType = require('../../constants/ContentType');
var Message = require('../Message');

var Contact = function(config, result) {
  this.config = config;
  this.result = result;
  this.meta = result.content.contentMetadata;
};
Contact.prototype = new Message();
Contact.prototype.constructor = Contact;

Contact.prototype.isContact = function() {
  return true;
};

Contact.prototype.getContentType = function() {
  return ContentType.CONTACT;
};

Contact.prototype.getMid = function() {
  return this.meta.mid;
};

Contact.prototype.getDisplayName = function() {
  return this.meta.displayName;
};

module.exports = Contact;
