/*eslint-env node*/
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var path = require("path");

var rooms = [];

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
    "use strict";
    res.render("/index.html");
});

server.listen(80);
io.on("connection", function(socket){
    "use strict";
    //Once a socket connects, emit room list globally
    io.sockets.emit("list-rooms", { rooms: rooms });
    //Listen for user to join a room
    socket.on("join-room", function(data){
        console.log("joining room:" + data.room);
        socket.leave(socket.rooms[1], function(error){
            if(error){
                console.log(error);
                return;
            }
            //socket can only belong to one socket at a time.
            socket.join(data.room, function(joinError){
                if(joinError){
                    console.log(error);
                    return;
                }
                if(rooms.indexOf(data.room) === -1){
                    rooms.push(data.room);
                }
                //let all the sockets know about the new room.
                io.sockets.emit("list-rooms", {rooms: rooms});
                //send message back to socket letting it know it joined the room
                //successfully
                socket.emit("joined-room", {room: data.room});
            });
        });
    });

    socket.on("send-chat", function(data){
        console.log("Chat sent: " + data.message);
        for(var i = 1, j = socket.rooms.length; i < j; i++){
            console.log("socket.rooms[i]: " + socket.rooms[i]);
            io.sockets.in(socket.rooms[i]).emit("room-message", data.message);
        }
    });
});

console.log("Multiplayer app listening on port 80");
