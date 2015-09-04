/*eslint-env node*/
define(function(require) {
    "use strict";
    var registerSuite = require("intern!object");
    var assert = require("intern/chai!assert");
    var enums = require("intern/dojo/node!../lib/models/enums");
    var player = require("intern/dojo/node!../lib/models/player");
    var card = require("intern/dojo/node!../lib/models/card");
    var character = require("intern/dojo/node!../lib/models/characterCard");
    var mainCharacter = require("intern/dojo/node!../lib/models/mainCharacterCard");
    var supportCharacter = require("intern/dojo/node!../lib/models/supportingCharacterCard");
    registerSuite(function () {
        var cap, player1, redSkull, loki, gamora;
        return {
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
                redSkull = Object.create(supportCharacter);
                redSkull.number = "XXX-001";
                redSkull.name = "Red Skull";
                player1.recruitCharacter(redSkull, enums.row.front);
                loki = Object.create(supportCharacter);
                loki.number = "XXX-009";
                loki.name = "Loki";
                player1.recruitCharacter(loki, enums.row.front);
                gamora = Object.create(supportCharacter);
                gamora.number = "XXX-009";
                gamora.name = "Gamora";
            },
            "Supporting Character is a card": function () {
                assert.strictEqual(card.isPrototypeOf(loki), true, "Supporting Character should be an instance of card object.");
            },
            "Supporting Character is a character card": function () {
                assert.strictEqual(character.isPrototypeOf(loki), true, "Supporting Character should be an instance of characterCard object.");
            },
            "Supporting Character is a supporting character card": function () {
                assert.strictEqual(supportCharacter.isPrototypeOf(loki), true, "Supporting Character should be an instance of mainCharactercard object.");
            },
            "Supporting Character should have zero +1/+1 counters": function () {
                assert.strictEqual(loki.hasCounter(1), 0, "Supporting Character should have zero +1/+1 counters.");
            },
            "Supporting Character should have 5 +1/+1 counters": function () {
                for (var i = 0; i < 5; i++) {
                    if ((i % 2) === 0) {
                        loki.addCounter(-1);
                    }
                    loki.addCounter(1);
                }
                assert.strictEqual(loki.hasCounter(1), 5, "Supporting Character should have five +1/+1 counters.");
            },
            "Supporting Character should have three -1/-1 counters": function () {
                for (var i = 0; i < 5; i++) {
                    if ((i % 2) === 0) {
                        loki.addCounter(-1);
                    }
                    loki.addCounter(1);
                }
                assert.strictEqual(loki.hasCounter(-1), 3, "Supporting Character should have three -1/-1 counters.");
            },
            "Supporting Character has two less -1/-1 counters": function () {
                for (var i = 0; i < 5; i++) {
                    if ((i % 2) === 0) {
                        loki.addCounter(-1);
                    }
                    loki.addCounter(1);
                }
                assert.strictEqual(loki.hasCounter(-1), 3, "Supporting Character should have three -1/-1 counters.");
                loki.removeCounter(-1);
                loki.removeCounter(-1);
                assert.strictEqual(loki.hasCounter(1), 5, "Supporting Character should have five +1/+1 counters.");
                assert.strictEqual(loki.hasCounter(-1), 1, "Supporting Character should have one -1/-1 counters.");
            },
            "Supporting Character should return Supporting Character text for type property": function () {
                assert.strictEqual(loki.type, "Supporting Character", "Supporting Character type should be \"Supporting Character\".");
            }
        };
    });
});
