line-bot-sdk-nodejs
==

[![npm version](https://badge.fury.io/js/line-bot-sdk.svg)](https://badge.fury.io/js/line-bot-sdk)

SDK of the LINE BOT API Trial for Node.js

Installation
--

The LINE BOT API SDK can be installed with [NPM](https://www.npmjs.com).

```
npm install line-bot-sdk
```

Usage
--

```js
var lineBot = require('line-bot-sdk')({
  channelID: '<your channel ID>',
  channelSecret: '<your channel secret>',
  trustedUserWithACL: '<your channel MID>'
});
```

### Sending Message

mid can be a string or an array of strings.

#### sendText(mid, text[, toType])

Send a text message to mid(s).
[https://developers.line.me/bot-api/api-reference#sending_message_text](https://developers.line.me/bot-api/api-reference#sending_message_text)

```js
lineBot.sendText('<target mid>', 'Message');
lineBot.sendText(['<target mid 1>', '<target mid 2>'], 'Message');
```

#### sendImage(mid, imageURL, previewURL[, toType])

Send an image to mid(s).
[https://developers.line.me/bot-api/api-reference#sending_message_image](https://developers.line.me/bot-api/api-reference#sending_message_image)

```js
lineBot.sendImage('<target mid>', 'http://example.com/image.jpg', 'http://example.com/preview.jpg');
```

#### sendVideo(mid, videoURL, previewImageURL[, toType])

Send a video to mid(s).
[https://developers.line.me/bot-api/api-reference#sending_message_video](https://developers.line.me/bot-api/api-reference#sending_message_video)

```js
lineBot.sendVideo('<target mid>', 'http://example.com/video.mp4', 'http://example.com/video_preview.jpg');
```

#### sendAudio(mid, audioURL, durationMillis[, toType])

Send a voice message to mid(s).
[https://developers.line.me/bot-api/api-reference#sending_message_audio](https://developers.line.me/bot-api/api-reference#sending_message_audio)

```js
lineBot.sendAudio('<target mid>', 'http://example.com/audio.m4a', 5000);
```

#### sendLocation(mid, text, latitude, longitude[, toType])

Send location information to mid(s).
[https://developers.line.me/bot-api/api-reference#sending_message_location](https://developers.line.me/bot-api/api-reference#sending_message_location)

```js
lineBot.sendLocation('<target mid>', '2 Chome-21-1 Shibuya Tokyo 150-0002, Japan', 35.658240, 139.703478);
```

#### sendSticker(mid, stkid, stkpkgid, stkver[, toType])

Send a sticker to mid(s).
[https://developers.line.me/bot-api/api-reference#sending_message_sticker](https://developers.line.me/bot-api/api-reference#sending_message_sticker)

```js
lineBot.sendSticker('<target mid>', 1, 1, 100);
```

#### sendRichMessage(mid, imageURL, altText, markup[, toType])

#### sendMultipleMessages(mid, multipleMessages[, messageNotified])

#### getMessageContent(messageId, fileHandler)

#### getMessageContentPreview(messageId, fileHandler)

#### getUserProfile(mid)

#### validateSignature(json, signature)

#### createReceivesFromJSON(json)

See Also
--

- [https://business.line.me/](https://business.line.me/)
- [https://developers.line.me/bot-api/overview](https://developers.line.me/bot-api/overview)
- [https://developers.line.me/bot-api/getting-started-with-bot-api-trial](https://developers.line.me/bot-api/getting-started-with-bot-api-trial)
