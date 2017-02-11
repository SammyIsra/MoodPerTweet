var app = require("express")();
var http = require("http").Server(app)
var Twitter = require("twitter");
var io = require("socket.io")(http);

app.get('/', function(req, res){
    console.log("Reached /");
});

io.on('connection', function(socket){
    console.log('userConnected!')
})

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

var userID = "25073877";

client.stream('statuses/filter', {follow:userID}, streamCallback);

function streamCallback(stream){

    console.log("Stream:\n", stream);

    stream.on('data', function(event){

        if(event.user.id_str === userID){
            var message = `**************************\n${event.user.name} Says:\n${event.text}\n`;
            console.log("************************\n", event);
        }
    });

    stream.on('error', function(error){
        console.log(error);
    });
}

http.listen(3001, function(){
    console.log("Connected to server");
})
