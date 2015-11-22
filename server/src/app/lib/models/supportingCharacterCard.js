/*eslint-env node*/
var card = require("./characterCard");
var supportCharacterDef = {
    type: {
        enumerable: true,
        get: function(){
            "use strict";
            return "Supporting Character";
        }
    },
    cost: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    }
};
module.exports = Object.create(card, supportCharacterDef);
