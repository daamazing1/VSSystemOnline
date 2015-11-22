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
        var cap = Object.create(mainCharacter);
        cap.number = "MNB-001";
        cap.name = "Captain America";
        cap.teamAffiliation = "Avengers";
        cap.gameText = "Avengers Assemble\nMain  Skill: This turn, enemy characters can't strike back during team attacks.\n\nSide By Side\nLevel Up (3) - When Cap team attacks and stuns an enemy character, he gains an XP.";
        cap.health = 5;
        cap.baseAttack = 2;
        cap.baseDefense = 5;
        cap.flightSymbol = false;
        cap.rangeSymbol = false;
        cap.level = 1;
        cards.insert(cap,function(err, result){
            if(err){
                console.log(err);
            }
            else {
                console.log("Inserted %d documents into the \"cards\" collection. The documents inserted with the \"_id\" are", result.length, result);
            }
        });
    }
});