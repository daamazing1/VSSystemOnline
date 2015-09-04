/*eslint-env node*/
define(function(require){
    "use strict";
    var registerSuite = require("intern!object");
    var assert = require("intern/chai!assert");
    var enums = require("intern/dojo/node!../lib/models/enums");
    var player = require("intern/dojo/node!../lib/models/player");
    var card = require("intern/dojo/node!../lib/models/card");
    var character = require("intern/dojo/node!../lib/models/characterCard");
    var mainCharacter = require("intern/dojo/node!../lib/models/mainCharacterCard");
    var supportCharacter = require("intern/dojo/node!../lib/models/supportingCharacterCard");


    registerSuite(function(){
        var cap = null;
        var player1 = null;
        return {
            name: "player",
            beforeEach: function () {
                cap = Object.create(mainCharacter);
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

                player1 = Object.create(player);
                player1.name = "Player1";
            },
            "Player has name \"Player1\"": function () {
                assert.strictEqual(player1.name, "Player1", "Player has name \"Player1\"");
            },
            "Player has Captain America as a Level 1 Main Character.": function () {
                player1.mainCharacter = cap;
                assert.strictEqual(player1.mainCharacter[0], cap, "Player has level 1 main character of Captain America");
            },
            "Player has Red Skull as a level 2 Main Character": function () {
                var redSkull = Object.create(mainCharacter);
                redSkull.number = "XXX-001";
                redSkull.name = "Red Skull";
                redSkull.teamAffiliation = "Avengers";
                redSkull.gameText = "test";
                redSkull.health = 5;
                redSkull.baseAttack = 2;
                redSkull.baseDefense = 5;
                redSkull.flightSymbol = false;
                redSkull.rangeSymbol = false;
                redSkull.level = 2;
                player1.mainCharacter = redSkull;
                assert.strictEqual(player1.mainCharacter[1], redSkull, "Player has level 2 main character of Red Skull");
            },
            "Main character must have level defined before player can set mainCharacter": function () {
                var redSkull = Object.create(mainCharacter);
                redSkull.number = "XXX-001";
                redSkull.name = "Red Skull";
                redSkull.teamAffiliation = "Avengers";
                redSkull.gameText = "test";
                redSkull.health = 5;
                redSkull.baseAttack = 2;
                redSkull.baseDefense = 5;
                redSkull.flightSymbol = false;
                redSkull.rangeSymbol = false;
                assert.throw(function(){
                    player1.mainCharacter = redSkull;
                }, "Main character must have level defined.");
            },
            "Main character must be derived from mainCharacterCard object": function(){
                var loki = Object.create(supportCharacter);
                loki.number = "XXX-009";
                loki.name = "Loki";
                assert.throw(function(){ player1.mainCharacter = loki; }, "Must be a mainCharacterCard object.");
            },
            "Add a invalid resource throws an error": function(){
                assert.throw(function() {player1.addResource(player); }, "Must be a valid card object");
            },
            "Remove a invalid resource throws an error": function(){
                assert.throw(function() {player1.removeResource(player); }, "Must be a valid card object");
            },
            "Add a invalid front row character throws an error": function(){
                assert.throw(function(){player1.recruitCharacter(cap, enums.row.front); }, "Must be a valid supporting character");
            },
            "Add a invalid back row character throws an error": function(){
                assert.throw(function(){player1.recruitCharacter(cap, enums.row.back); }, "Must be a valid supporting character");
            },
            "Add a valid resource": function(){
                var redSkull = Object.create(supportCharacter);
                redSkull.number = "XXX-001";
                redSkull.name = "Red Skull";
                var loki = Object.create(supportCharacter);
                loki.number = "XXX-009";
                loki.name = "Loki";
                player1.addResource(redSkull);
                player1.addResource(loki);
                assert.strictEqual(player1.resourceRow.length, 2, "Player should have 2 resources in the resource row");
                assert.strictEqual(player1.resourceRow[0], redSkull, "Player should have Red Skull and Loki in the resource row");
                assert.strictEqual(player1.resourceRow[1], loki, "Player should have Red Skull and Loki in the resource row");
            },
            "Remove a valid resource": function(){
                var redSkull = Object.create(supportCharacter);
                redSkull.number = "XXX-001";
                redSkull.name = "Red Skull";
                var loki = Object.create(supportCharacter);
                loki.number = "XXX-009";
                loki.name = "Loki";
                player1.addResource(redSkull);
                player1.addResource(loki);
                player1.removeResource(redSkull);
                assert.deepEqual(player1.resourceRow, [loki], "Resource row has the correct cards after removal");
            },
            "Add a valid front row character": function(){
                var redSkull = Object.create(supportCharacter);
                redSkull.number = "XXX-001";
                redSkull.name = "Red Skull";
                var loki = Object.create(supportCharacter);
                loki.number = "XXX-009";
                loki.name = "Loki";
                player1.recruitCharacter(redSkull, enums.row.front);
                player1.recruitCharacter(loki, enums.row.back);
            },
            "Recruit a valid character without defining a row throws error": function(){
                var loki = Object.create(supportCharacter);
                loki.number = "XXX-009";
                loki.name = "Loki";
                assert.throw(function(){player1.recruitCharacter(loki); }, "Must be recruited in either enums.row.front or enums.row.back");
            },
            "Move character from front row to back row": function(){
                var redSkull = Object.create(supportCharacter);
                redSkull.number = "XXX-001";
                redSkull.name = "Red Skull";
                var loki = Object.create(supportCharacter);
                loki.number = "XXX-009";
                loki.name = "Loki";
                player1.recruitCharacter(redSkull, enums.row.front);
                player1.recruitCharacter(loki, enums.row.back);
                player1.moveCharacter(redSkull, enums.row.back);
                assert.strictEqual(player1.backRow.length, 2, "There should be two cards in the back row");
                assert.strictEqual(player1.frontRow.length, 0, "There should be no cards in the front row");
                assert.deepEqual(player1.backRow, [loki, redSkull], "The correct cards are in the back row");
            },
            "Add card to KO Pile": function(){
                player1.addToKOPile(cap);
                assert.strictEqual(player1.koPile.length, 1, "KO Pile only has one card");
                assert.deepEqual(player1.koPile, [cap], "Ko Pile contains correct cards");
            },
            "Add multiple cards to KO Pile": function(){
                player1.addToKOPile(cap);
                var redSkull = Object.create(supportCharacter);
                redSkull.number = "XXX-001";
                redSkull.name = "Red Skull";
                player1.addToKOPile(redSkull);
                var loki = Object.create(supportCharacter);
                loki.number = "XXX-009";
                loki.name = "Loki";
                player1.addToKOPile(loki);
                assert.strictEqual(player1.koPile.length, 3, "KO Pile only has three cards");
                assert.deepEqual(player1.koPile, [cap, redSkull, loki], "Ko Pile contains correct cards");
            },
            "Adding invalid object to KO Pile throws error": function(){
                assert.throw(function(){ player1.addToKOPile(player1); }, "Must be a valid card");
            },
            "Moving invalid object throws error": function(){
                assert.throw(function(){player1.moveCharacter({something: "cool"}, enums.row.back); }, "Must be a valid character");
            },
            "Moving invalid row throws error": function(){
                assert.throw(function(){player1.moveCharacter(cap, "I guess"); }, "Must be moved in either enums.row.front or enums.row.back");
            },
            "KO none character card throws error": function(){
                assert.throw(function(){player1.koCharacter(player1); }, "Must be a valid character");
            },
            "KO character removes the character from the board":function() {
                var redSkull = Object.create(supportCharacter);
                redSkull.number = "XXX-001";
                redSkull.name = "Red Skull";
                player1.recruitCharacter(redSkull, enums.row.front);
                var loki = Object.create(supportCharacter);
                loki.number = "XXX-009";
                loki.name = "Loki";
                player1.recruitCharacter(loki, enums.row.front);
                var gamora = Object.create(supportCharacter);
                gamora.number = "XXX-009";
                gamora.name = "Gamora";
                player1.recruitCharacter(gamora, enums.row.back);
                assert.deepEqual(player1.frontRow, [redSkull, loki], "The correct cards are in the back row");
                assert.deepEqual(player1.backRow, [gamora], "The correct cards are in the back row");
                player1.koCharacter(loki);
                assert.deepEqual(player1.frontRow, [redSkull], "The correct cards are in the back row");
                assert.deepEqual(player1.backRow, [gamora], "The correct cards are in the back row");
            },
            "Stunning character changes character status and adds wound": function(){
                var redSkull = Object.create(supportCharacter);
                redSkull.number = "XXX-001";
                redSkull.name = "Red Skull";
                player1.recruitCharacter(redSkull, enums.row.front);
                var loki = Object.create(supportCharacter);
                loki.number = "XXX-009";
                loki.name = "Loki";
                player1.recruitCharacter(loki, enums.row.front);
                var gamora = Object.create(supportCharacter);
                gamora.number = "XXX-009";
                gamora.name = "Gamora";
                player1.recruitCharacter(gamora, enums.row.back);
                player1.stunCharacter(loki);
                assert.strictEqual(loki.stunned, true, "Character should be stunned");
                assert.strictEqual(loki.wounds, 1, "Character should have a wound");
            },
            "Stunning invalid card throws an error": function(){
                assert.throw(function(){player1.stunCharacter(player1); }, "Must be a valid character");
            }
        };
    });
});
