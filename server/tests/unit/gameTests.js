/*eslint-env node*/
define(function(require){
    "use strict";
    var registerSuite = require("intern!object");
    var assert = require("intern/chai!assert");
    var player = require("intern/dojo/node!../../src/app/lib/models/player");
    var game = require("intern/dojo/node!../../src/app/lib/models/game");

    registerSuite(function(){
        var player1 = null;
        var game1 = null;
        return {
            name: "player",
            beforeEach: function () {
                player1 = Object.create(player);
                player1.name = "Player1";
                game1 = Object.create(game);
            },
            "Player has name \"Player1\"": function () {
                assert.strictEqual(player1.name, "Player1", "Player has name \"Player1\"");
            },
            "Game contains player1 as first player": function () {
                game1.addPlayer(player1);
                assert.strictEqual(game1.players[0], player1, "First player is player1");
            },
            "Game contains player2 as second player": function () {
                var player2 = Object.create(player);
                game1.addPlayer(player1);
                game1.addPlayer(player2);
                assert.strictEqual(game1.players[1], player2, "Second player is player2");
            },
            "Game throws error if more than 2 players are added": function(){
                var player2 = Object.create(player);
                game1.addPlayer(player1);
                game1.addPlayer(player2);
                var player3 = Object.create(player);
                assert.throws(function(){ game1.addPlayer(player3); }, "Game already has two players");
            }
        };
    });
});
