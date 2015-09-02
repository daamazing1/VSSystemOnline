/*eslint-env node*/
define(function(require){
    "use strict";
    var registerSuite = require("intern!object");
    var assert = require("intern/chai!assert");
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
            "Add a invalid resource throws an error": function(){
                assert.throw(function() {player1.addResource(player);}, "Must be a valid card object");
            },
            "Add a invalid front row character throws an error": function(){
                assert.throw(function(){player1.addFrontRowCharacter(cap);}, "Must be a valid supporting character");
            },
            "Add a invalid back row character throws an error": function(){
                assert.throw(function(){player1.addBackRowCharacter(cap);}, "Must be a valid supporting character");
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
            }
        };
    });
});
