var ContentType = require('../constants/ContentType');

exports.buildText = (text) => {
  return {
    contentType: ContentType.TEXT,
    text: text
  };
}

exports.buildImage = (imageUrl, previewUrl) => {
  return {
    contentType: ContentType.IMAGE,
    originalContentUrl: imageUrl,
    previewImageUrl: previewUrl
  };
};

exports.buildVideo = (videoUrl, previewImageUrl) => {
  return {
    contentType: ContentType.VIDEO,
    originalContentUrl: videoUrl,
    previewImageUrl: previewImageUrl
  };
};

exports.buildAudio = (audoUrl, durationMillis) => {
  return {
    contentType: ContentType.AUDIO,
    originalContentUrl: audioUrl,
    contentMetadata: { AUDLEN: durationMillis.toString() }
  };
}

exports.buildLocation = (text, latitude, longitude) => {
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

exports.buildSticker = (stkid, stkpkgid, stkver) => {
  return {
    contentType: ContentType.STICKER,
    contentMetadata: ['STKVER'].reduce((meta, stkver) => {
      if (stkver) meta.STKVER = stkver.toString();
      return meta;
    }, { STKID: stkid.toString(), STKPKGID: stkpkgid.toString() })
  };
};

exports.buildRichMessage = (imageUrl, altText, markup) => {
  return {
    contentType: ContentType.RICH_MESSAGE,
    contentMetadata: {
      SPEC_REV: '1',
      DOWNLOAD_URL: imageUrl,
      ALT_TEXT: altText,
      MARKUP_JSON: markup
    }
  };
}
