//helper
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

// credentials
var lineBot = require('line-bot-sdk').client({
  channelID: '1467087507',
  channelSecret: '0aa2c41f0d1ec186fdb65153027aef92',
  channelMID: 'u686b53cd5babc28410b0204de188529e'
});

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

//db credentials hosted on pixnode
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'pixnode.com',
  user     : 'root',
  password : 'abcd6712',
  database : 'lineapp'
});
connection.connect();


// expressJS configure
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false, limit: 2 * 1024 * 1024 }));
app.use(bodyParser.json({ limit: 2 * 1024 * 1024 }));

// incoming MSG

sendQuiz = function(roomMID){
	sql = "SELECT * FROM puzzle WHERE id not in (SELECT quiz FROM quiztaken WHERE room='"+roomMID+"')";
	console.log(sql);
	//get unused quiz
	connection.query(sql, function(err, rows, fields) {
		if (err) throw err;
		if(rows.length == 0)
		{
			lineBot.sendText(roomMID, "หมดสิ้นคำถาม ทุกๆคำ ที่เธอทำมันฟ้องเรื่องราว... บาย ~");
			return;
		}
		console.log(JSON.stringify(rows));
		shuffle(rows);
		picked = rows[0];

		//delete old/current quiz that is not done.
		connection.query("DELETE FROM quiztaken WHERE room='"+roomMID+"' AND done=0");

		// insert new quiz
		connection.query("INSERT INTO quiztaken (room,quiz,postedAt,done) VALUES ('"+roomMID+"',"+picked['id']+","+Math.floor(Date.now() / 1000)+",0)");

		// send quiz to user
		lineBot.sendImage(roomMID, picked['imgurl'], picked['imgurl']);
		lineBot.sendText(roomMID, picked['words']+"พยางค์นะจ๊ะ");
	});
};

app.post('/', function (req, res) {
	
	for(var i=0;i<req.body.result.length;i++)
	{
		msg = req.body.result[i];
		console.log(JSON.stringify(msg));

		if(typeof msg.content.opType != 'undefined')
		{
			if(msg.content.opType == 4)
			{
				// hello everyone ! my name is Cony ! I wanna play games with ya !
				lineBot.sendText(msg.content.params[0], 'สวัสดี หนูชื่อโคนี่ค่ะ มาเล่นเกมกันน้า ใครแพ้เลี้ยงข้าว เค๊​?​');

				// initialize the room !
				connection.query("INSERT INTO currentRoom (room) VALUES ('"+ msg.content.params[0] +"');");
				
				// send the first quiz
				sendQuiz(msg.content.params[0]);
			}

			if(msg.content.opType == 8)
			{
				// remove the room
				connection.query('DELETE FROM currentRoom WHERE room=\''+ msg.content.params[0] +'\';');
				connection.query('DELETE FROM quiztaken WHERE room=\''+ msg.content.params[0] +'\';');
				connection.query('DELETE FROM score WHERE room=\''+ msg.content.params[0] +'\';');
			}
		}

		if(typeof msg.content.contentType != 'undefined')
		{
			if(msg.content.contentType == 1)
			{
				//find pending quiz
				sql = "SELECT * FROM puzzle WHERE id = (SELECT quiz FROM quiztaken WHERE done=0 AND room='"+msg.content.from+"' limit 1)";

				connection.query(sql, function(err, rows, fields) {
					//so sad no more question
					if(rows.length == 0)
					{
						return;
					}
					console.log(JSON.stringify(rows));
					//check answer match
					if(rows[0].answer == msg.content.text)
					{
						quizid = rows[0].id;
						
						//acknowledge them
						lineBot.sendText(msg.content.from,"ถั่วต้มมมมมม !!!");
						
						//push score 
						sql = "SELECT * FROM score WHERE room='"+msg.content.from+"' AND personID='"+msg.from+"'";
						connection.query(sql, function(err, rows, fields) {
							if(rows.length ==0)
							{
								//add score record
								connection.query("INSERT INTO score (room,personname,personID,score) VALUES ('"+ msg.content.from +"','','"+msg.from+"',1);", function(err){
									// print score
									updatesql = "UPDATE quiztaken SET done=1 WHERE room='"+ msg.content.from +"' AND quiz='"+quizid+"'"
									
									// currently cannot get the name.
									// lineBot.sendText(msg.content.from,"ตอนนี้คะแนนคือ ..\n1\n2\n"+updatesql);
									// lineBot.getUserProfile([msg.from]).then(function(res) {
									// 	var contacts = res.body.contacts;
									// 	console.log(JSON.stringify(contacts));
									// });

									// next quiz
									connection.query(updatesql, function(err){
										sendQuiz(msg.content.from);
									});
								});
							}
							else
							{
								//update score
								connection.query("UPDATE score SET score=score+1 WHERE room='"+ msg.content.from +"' AND personID='"+msg.from+"'", function(err){
									
									updatesql = "UPDATE quiztaken SET done=1 WHERE room='"+ msg.content.from +"' AND quiz='"+quizid+"'"
									
									// print score
									// currently cannot get the name.
									// lineBot.sendText(msg.content.from,"ตอนนี้คะแนนคือ ..\n1\n2\n"+updatesql);
									// lineBot.getUserProfile([msg.from]).then(function(res) {
									// 	var contacts = res.body.contacts;
									// 	console.log(JSON.stringify(contacts));
									// });

									// next quiz
									connection.query(updatesql, function(err){
										sendQuiz(msg.content.from);
									});
								});
							}
						});
					}
				});
			}
		}
	}
	res.send('SUCCESS');
});

// give new question if no one can answer that within a day. every 8 am ?
// NOT DONE YET :/

// start
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
