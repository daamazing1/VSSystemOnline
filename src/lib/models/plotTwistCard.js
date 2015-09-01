/*eslint-env node*/
var card = require("./card");
var plotTwistDef = {
    type: {
        enumerable: true,
        get: function(){
            "use strict";
            return "Plot Twist";
        }
    },
    anyTurnSymbol: {
        value: false,
        enumerable: true,
        configurable: false,
        writable: true
    }
};
module.exports = Object.create(card, plotTwistDef);
