var ContentType = require('../../constants/ContentType');
var UnsupportedContentTypeException = require('../../exceptions/UnsupportedContentTypeException');

var Text = require('./Text');
var Image = require('./Image');
var Audio = require('./Audio');
var Location = require('./Location');
var Sticker = require('./Sticker');
var Contact = require('./Contact');

exports.create = function(config, result) {
  var contentType = result.content.contentType;
  console.log('contentType', contentType);
  switch(contentType) {
    case ContentType.TEXT:
      return new Text(config, result);
    case ContentType.IMAGE:
      return new Image(config, result);
    case ContentType.VIDEO:
      return new Video(config, result);
    case ContentType.AUDIO:
      return new Audio(config, result);
    case ContentType.LOCATION:
      return new Location(config, result);
    case ContentType.STICKER:
      return new Sticker(config, result);
    case ContentType.CONTACT:
      return new Contact(config, result);
    default:
      throw new UnsupportedContentTypeException('Unsupported contentType is given: ' + contentType);
  }
};