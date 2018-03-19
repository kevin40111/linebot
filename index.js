var linebot = require('linebot');
var express = require('express');
var getJSON = require('get-json');

var bot = linebot({
    channelId: '1569059743',
    channelSecret: 'fb3b393e9da577bb6e710dca3db3ab55',
    channelAccessToken: 'ejGWdw0hwPAsRIv1G+I/m8XIw5+RmcM9XUBVjWsUWLmHxbgX41zNi8kXsL71dcq5G9bQxa0S+nke1u+4T9uq79hKif5G0MGaLZO3HKvh3LTdTrnSDMTtab4rqs9vb9OFYwX4TaIqZyAl51kHIDkyHwdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function (event) {
    if (event.message.type = 'text') {
        var msg = event.message.text;
        var userId = event.source.userId;
        switch (msg) {
            case 'weather':
                    weather(userId);
                break;

            default:
                break;
        }


        event.reply(msg).then(function (data) {
            console.log(event.source.userId);
        }).catch(function (error) {
            console.log('error');
        });
    }
});

function weather(userId) {
    getJSON('http://opendata2.epa.gov.tw/AQX.json', function (error, response) {
        console.log(response);
        response.forEach(function (e, i) {
            bot.push(userId, e);
        });
    });
}

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});