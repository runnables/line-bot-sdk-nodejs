var _ = require('lodash');
var bodyParser = require('body-parser');
var express = require('express');
var request = require('superagent');
var lineBot = require('line-bot-sdk')({
  channelID: 'YOUR_LINE_BOT_CHANNEL_ID',
  channelSecret: 'YOUR_LINE_BOT_CHANNEL_SECRET',
  trustedUserWithACL: 'YOUR_LINE_BOT_MID'
});

var simsimiAPIKey = 'YOUR_SIMSIMI_API_KEY';
var simsimiLanguageCode = 'th';
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: false, limit: 2 * 1024 * 1024 }));
app.use(bodyParser.json({ limit: 2 * 1024 * 1024 }));

app.post('/', function (req, res) {
  console.log(req.body);

  if (req.body.result && _.isArray(req.body.result)) {
    _.each(req.body.result, function(item) {
      if (item.content && item.content.from && item.content.text) {
        request
          .get('http://sandbox.api.simsimi.com/request.p?key=' + simsimiAPIKey + 
            '&text=' + encodeURIComponent(item.content.text) + 
            '&lc=' + simsimiLanguageCode)
          .end(function(err, res){
            if(!err){
              lineBot.sendText([item.content.from], res.body.response);
            }
          });
        //
      }
    });
  }
  
  res.send('ok');
});

app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port'));
});