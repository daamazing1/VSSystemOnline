/*eslint-env node*/
var card = require("./card");
var locationDef = {
    type: {
        enumerable: true,
        get: function(){
            "use strict";
            return "Special Location";
        }
    },
    powerSymbols: {
        value: ["Energy", "Intellect", "Might", "Skill"],
        enumerable: true,
        configurable: false,
        writable: false
    },
    teamAffiliation: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    },
    gameText: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    }
};
module.exports = Object.create(card, locationDef);
