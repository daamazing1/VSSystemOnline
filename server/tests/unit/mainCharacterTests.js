/*eslint-env node*/
define(function(require){
    "use strict";
    var registerSuite = require("intern!object");
    var assert = require("intern/chai!assert");
    var card = require("intern/dojo/node!../../src/app/lib/models/card");
    var character = require("intern/dojo/node!../../src/app/lib/models/characterCard");
    var mainCharacter = require("intern/dojo/node!../../src/app/lib/models/mainCharacterCard");
    var cap = null;
    registerSuite({
        name: "captainAmerica",
        beforeEach: function(){
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
        },
        "Captain America is a card": function(){
            assert.strictEqual(card.isPrototypeOf(cap), true, "Captain America should be an instance of card object.");
        },
        "Captain America is a character card": function(){
            assert.strictEqual(character.isPrototypeOf(cap), true, "Captain America should be an instance of characterCard object.");
        },
        "Captain America is a main character card": function(){
            assert.strictEqual(mainCharacter.isPrototypeOf(cap), true, "Captain America should be an instance of mainCharactercard object.");
        },
        "Captain America should have zero +1/+1 counters": function(){
            assert.strictEqual(cap.hasCounter(1), 0, "Captain America should have zero +1/+1 counters.");
        },
        "Captain America should have 5 +1/+1 counters": function(){
            for(var i = 0; i < 5; i++){
                if((i % 2) === 0){
                    cap.addCounter(-1);
                }
                cap.addCounter(1);
            }
            assert.strictEqual(cap.hasCounter(1), 5, "Captain America should have five +1/+1 counters.");
        },
        "Captain America should have three -1/-1 counters": function(){
            for(var i = 0; i < 5; i++){
                if((i % 2) === 0){
                    cap.addCounter(-1);
                }
                cap.addCounter(1);
            }
            assert.strictEqual(cap.hasCounter(-1), 3, "Captain America should have three -1/-1 counters.");
        },
        "Captain America has two less -1/-1 counters": function(){
            for(var i = 0; i < 5; i++){
                if((i % 2) === 0){
                    cap.addCounter(-1);
                }
                cap.addCounter(1);
            }
            assert.strictEqual(cap.hasCounter(-1), 3, "Captain America should have three -1/-1 counters.");
            cap.removeCounter(-1);
            cap.removeCounter(-1);
            assert.strictEqual(cap.hasCounter(1), 5, "Captain America should have five +1/+1 counters.");
            assert.strictEqual(cap.hasCounter(-1), 1, "Captain America should have one -1/-1 counters.");
        },
        "Captain America should return Main Character text": function(){
            assert.strictEqual(cap.type, "Main Character", "Captain America type should be \"Main Character\".");
        },
        "Captain America should have no experience counters": function(){
            assert.strictEqual(cap.experienceCounters, 0, "Captain America should have zero experience counters");
        },
        "Captain America has gained an experience counter": function(){
            cap.addExperienceCounter();
            assert.strictEqual(cap.experienceCounters, 1, "Captain America has an experience counter.");
        },
        "Captain America has experience counters cleared": function(){
            cap.addExperienceCounter();
            cap.clearExperienceCounters();
            assert.strictEqual(cap.experienceCounters, 0, "Captain America has no experience counters.");
        }
    });
});
