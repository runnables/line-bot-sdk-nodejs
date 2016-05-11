var _ = require('lodash');
var bodyParser = require('body-parser');
var express = require('express');
var request = require('superagent');
var lineBot = require('line-bot-sdk')({
  channelID: 'YOUR_CHANNEL_ID',
  channelSecret: 'YOUR_CHANNEL_SECRET',
  channelMID: 'YOUR_CHANNEL_MID'
});

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: false, limit: 2 * 1024 * 1024 }));
app.use(bodyParser.json({ limit: 2 * 1024 * 1024 }));

app.post('/', function (req, res) {
  console.log(req.body.result);

  var receives = lineBot.createReceivesFromJSON(req.body);
  _.each(receives, function(receive){
    
    if(receive.isMessage()){

      if(receive.isText()){

        if(receive.getText()==='me'){
          lineBot.getUserProfile(receive.getFromMid())
            .then(function onResult(res){
              if(res.status === 200){
                var contacts = res.body.contacts;
                if(contacts.length > 0){
                  lineBot.sendText(receive.getFromMid(), 'Hi!, you\'re ' + contacts[0].displayName);
                }
              }
            }, function onError(err){
              console.error(err);
            });
        } else {
          lineBot.sendText(receive.getFromMid(), receive.getText());
        }

      }else if(receive.isImage()){
        
        lineBot.sendText(receive.getFromMid(), 'Thanks for the image!');

      }else if(receive.isVideo()){

        lineBot.sendText(receive.getFromMid(), 'Thanks for the video!');

      }else if(receive.isAudio()){

        lineBot.sendText(receive.getFromMid(), 'Thanks for the audio!');

      }else if(receive.isLocation()){

        lineBot.sendLocation(
            receive.getFromMid(),
            receive.getText() + receive.getAddress(),
            receive.getLatitude(),
            receive.getLongitude()
          );

      }else if(receive.isSticker()){

        // This only works if the BOT account have the same sticker too
        lineBot.sendSticker(
            receive.getFromMid(),
            receive.getStkId(),
            receive.getStkPkgId(),
            receive.getStkVer()
          );

      }else if(receive.isContact()){
        
        lineBot.sendText(receive.getFromMid(), 'Thanks for the contact');

      }else{
        console.error('found unknown message type');
      }
    }else if(receive.isOperation()){

      console.log('found operation');

    }else {

      console.error('invalid receive type');

    }

  });
  
  res.send('ok');
});

app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port'));
});