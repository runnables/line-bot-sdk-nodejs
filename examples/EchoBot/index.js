var _ = require('lodash');
var bodyParser = require('body-parser');
var express = require('express');
var request = require('superagent');
var lineBot = require('line-bot-sdk')({
  channelID: '1466956410',
  channelSecret: '2a43289185e1769dcc9f6684e44b380c',
  trustedUserWithACL: 'ud17329fe10daf6988415791a917a6bb6'
});

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: false, limit: 2 * 1024 * 1024 }));
app.use(bodyParser.json({ limit: 2 * 1024 * 1024 }));

app.post('/', function (req, res) {
  console.log(req.body);

  var receives = lineBot.createReceivesFromJSON(req.body.result);
  console.log(receives);

  /*
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
  */
  
  res.send('ok');
});

app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port'));
});