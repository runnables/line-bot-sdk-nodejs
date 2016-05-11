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

Send a rich message to mid(s).  
[https://developers.line.me/bot-api/api-reference#sending_rich_content_message_request](https://developers.line.me/bot-api/api-reference#sending_rich_content_message_request)

Note: Please see [image url specifications](https://developers.line.me/bot-api/api-reference#sending_rich_content_message_prerequisite)

```js
var Markup = require('line-bot-sdk').Markup;
var markup = new Markup(1040); // height

markup
  .setAction('openHomepage', 'Open Homepage', 'https://line.me')
  .addListener('openHomepage', 0, 0, 1040, 1040);

lineBot.sendRichMessage('<target mid>', 'https://example.com/image', 'Alt text', markup.build());
```

#### sendMultipleMessages(mid, multipleMessages[, messageNotified])

Send multiple messages to mids(s).  
[https://developers.line.me/bot-api/api-reference#sending_multiple_messages_request](https://developers.line.me/bot-api/api-reference#sending_multiple_messages_request)

```js
var MultipleMessages = require('line-bot-sdk').MultipleMessages;
var Markup = require('line-bot-sdk').Markup;
var multipleMessages = new MultipleMessages();
var markup = new Markup(1040); // height

// markup for rich message
markup
  .setAction('openHomepage', 'Open Homepage', 'https://line.me')
  .addListener('openHomepage', 0, 0, 1040, 1040);

multipleMessages
  .addText('Text')
  .addImage('http://example.com/image.jpg', 'http://example.com/preview.jpg')
  .addVideo('http://example.com/video.mp4', 'http://example.com/video_preview.jpg')
  .addAudio('http://example.com/audio.m4a', 5000)
  .addLocation('2 Chome-21-1 Shibuya Tokyo 150-0002, Japan', 35.658240, 139.703478)
  .addSticker(1, 1, 100)
  .addRichMessage('https://example.com/image', 'Alt text', markup.build());

lineBot.sendMultipleMessages('<target mid>', multipleMessages);
```

### Getting Message Content

#### getMessageContent(messageId, fileHandler)

### Getting Previews of Message Content

#### getMessageContentPreview(messageId, fileHandler)

### Getting User Profile Infomation

#### getUserProfile(mid)

### Other

#### validateSignature(json, signature)

#### createReceivesFromJSON(json)

License
--

```
Copyright (c) 2016, Runnables Company Limited

Permission to use, copy, modify, and/or distribute this software for any purpose with 
or without fee is hereby granted, provided that the above copyright notice and this 
permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD 
TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. 
IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL 
DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER 
IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN 
CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

See Also
--

- [https://business.line.me/](https://business.line.me/)
- [https://developers.line.me/bot-api/overview](https://developers.line.me/bot-api/overview)
- [https://developers.line.me/bot-api/getting-started-with-bot-api-trial](https://developers.line.me/bot-api/getting-started-with-bot-api-trial)
