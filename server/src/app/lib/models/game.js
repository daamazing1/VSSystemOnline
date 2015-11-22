/*eslint-env node*/
var gameDef = {
    room: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    },
    _players: {
        value: null,
        writable: true
    },
    players: {
        enumerable: true,
        get: function(){
            "use strict";
            if(!this._players){
                this._players = [];
            }
            return this._players;
        }
    },
    turnCount: {
        value: 0,
        enumerable: true,
        configurable: false,
        writable: true
    },
    currentTurnPlayer: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    },
    currentTurnPhase: {
        value: null, //Draw, Recovery, Build, Main
        enumerable: true,
        configurable: false,
        writable: true
    },
    currentPhaseStep: {
        value: null, //Build: Resource, Recruit, Formation.
        enumerable: true,
        configurable: false,
        writable: true
    },
    inCombat: {
        value: false,
        enumerable: true,
        configurable: false,
        writable: true
    },
    status: {
        value: "waiting",
        enumerable: true,
        writable: true
    }
};

var game = Object.create({}, gameDef);
game.addPlayer = function (player) {
    //Only allow for two players
    if (this.players.length < 2) {
        this.players.push(player);
    }
    else {
        throw new Error("Game already has two players");
    }
};
module.exports = game;
