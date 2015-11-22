/*eslint-env node*/
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var path = require("path");
var mongodb = require("mongodb");

var game = require("./lib/models/game");
var mainCharacter = require("./lib/models/mainCharacterCard");


var url = "mongodb://localhost:27017/vssystem";
var MongoClient = mongodb.MongoClient;
MongoClient.connect(url, function(err, db){
    "use strict";
    if(err){
        console.log("Unable to connect to the mongoDB server. Error: ", err);
    }
    else{
        console.log("Connection established to", url);
        var cards = db.collection("cards");
    }
});

var rooms = {};

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
    "use strict";
    res.render("/index.html");
});

server.listen(80);
io.on("connection", function(socket){
    "use strict";
    socket.on("join-room", function(data){
        //data should contain: username, room
        socket.join(data.room, function(joinError){
            if(joinError){
                console.log(joinError);
                return;
            }
            //check to see if the room exists
            if(rooms[data.room] === undefined) {
                //create the game...
                rooms[data.room] = Object.create(game);
            }
            //add the player to the room
            rooms[data.room].addPlayer(data.username);
            if(rooms[data.room].players.length === 2 ) {
                rooms[data.room].status = "ready";
            }
            //since the game object has most of the properties in the prototype we need to flatten the object so
            // socket.io can send it across the wire.
            var flatRoom = Object.create({});
            for(var key in rooms[data.room]){
                flatRoom[key] = rooms[data.room][key];
            }
            //send message back to socket letting it know it joined the room successfully
            io.sockets.to(data.room).emit("joined-room", {room: flatRoom});
        });
    });

    socket.on("")

    socket.on("send-chat", function(data){
        console.log("Chat sent: " + data.message);
        for(var i = 1, j = socket.rooms.length; i < j; i++){
            console.log("socket.rooms[i]: " + socket.rooms[i]);
            io.sockets.in(socket.rooms[i]).emit("room-message", data.message);
        }
    });
});

console.log("Multiplayer app listening on port 80");
