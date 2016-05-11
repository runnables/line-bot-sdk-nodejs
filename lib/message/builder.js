var ContentType = require('../constants/ContentType');

exports.buildText = function(text) {
  return {
    contentType: ContentType.TEXT,
    text: text
  };
};

exports.buildImage = function(imageUrl, previewUrl) {
  return {
    contentType: ContentType.IMAGE,
    originalContentUrl: imageUrl,
    previewImageUrl: previewUrl
  };
};

exports.buildVideo = function(videoUrl, previewImageUrl) {
  return {
    contentType: ContentType.VIDEO,
    originalContentUrl: videoUrl,
    previewImageUrl: previewImageUrl
  };
};

exports.buildAudio = function(audoUrl, durationMillis) {
  return {
    contentType: ContentType.AUDIO,
    originalContentUrl: audioUrl,
    contentMetadata: { AUDLEN: durationMillis.toString() }
  };
};

exports.buildLocation = function(text, latitude, longitude) {
  return {
    contentType: ContentType.LOCATION,
    text: text,
    location: {
      title: text,
      latitude: latitude,
      longitude: longitude
    }
  };
};

exports.buildSticker = function(stkid, stkpkgid, stkver) {
  return {
    contentType: ContentType.STICKER,
    contentMetadata: ['STKVER'].reduce( function(meta, stkver) {
      if (stkver) meta.STKVER = stkver.toString();
      return meta;
    }, { STKID: stkid.toString(), STKPKGID: stkpkgid.toString() })
  };
};

exports.buildRichMessage = function(imageUrl, altText, markup) {
  return {
    contentType: ContentType.RICH_MESSAGE,
    contentMetadata: {
      SPEC_REV: '1',
      DOWNLOAD_URL: imageUrl,
      ALT_TEXT: altText,
      MARKUP_JSON: markup
    }
  };
};
