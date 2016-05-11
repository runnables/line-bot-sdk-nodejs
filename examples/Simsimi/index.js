var _ = require('lodash');
var bodyParser = require('body-parser');
var express = require('express');
var request = require('superagent');
var LineBot = require('line-bot-sdk');
var client = LineBot.client({
  channelID: 'YOUR_CHANNEL_ID',
  channelSecret: 'YOUR_CHANNEL_SECRET',
  channelMID: 'YOUR_CHANNEL_MID'
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
              client.sendText([item.content.from], res.body.response);
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