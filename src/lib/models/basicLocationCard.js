/*eslint-env node*/
var card = require("./card");
var locationDef = {
    type: {
        enumerable: true,
        get: function(){
            "use strict";
            return "Basic Location";
        }
    },
    powerSymbol: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    }
};
module.exports = Object.create(card, locationDef);
