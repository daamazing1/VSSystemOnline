/*eslint-env node*/
var card = require("./card");
var characterDef = {
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
    },
    type: {
        enumerable: true,
        configurable: true,
        writable: false
    },
    powers: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    },
    health: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    },
    baseAttack: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    },
    baseDefense: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    },
    flightSymbol: {
        value: false,
        enumerable: true,
        configurable: false,
        writable: true
    },
    rangeSymbol: {
        value: false,
        enumerable: true,
        configurable: false,
        writable: true
    },
    stunned: {
        value: false,
        enumerable: true,
        configurable: false,
        writable: true
    },
    exhausted: {
        value: false,
        enumerable: true,
        configurable: false,
        writable: true
    },
    wounds: {
        value: 0,
        enumerable: true,
        configurable: false,
        writable: true
    },
    _counters: {
        value: null,
        enumerable: false,
        writable: true
    },
    counters: {
        enumerable: true,
        get: function(){
            "use strict";
            if(!this._counters){
                this._counters = [];
            }
            return this._counters;
        }
    }
};
var characterCard = Object.create(card, characterDef);
characterCard.addCounter = function(val){
    "use strict";
    this.counters.push(val);
};

characterCard.removeCounter = function(val){
    "use strict";
    //search for the right type of counter.
    for(var i = 0, j = this.counters.length; i < j; i++){
        if(this.counters[i] === val){
            this.counters.splice(i, 1);
            return;
        }
    }
};
characterCard.hasCounter = function(val){
    "use strict";
    var keepCount = 0;
    //search fro teh right type of counter.
    for(var i = 0, j = this.counters.length; i < j; i++){
        if(this.counters[i] === val){
            keepCount++;
        }
    }
    return keepCount;
};
module.exports = characterCard;
