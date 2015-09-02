/*eslint-env node*/
var card = require("./card");
var supportingCharacterCard = require("./supportingCharacterCard");
var mainCharacterCard = require("./mainCharacterCard");

var playerDef = {
    name: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    },
    socket: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    },
    gameRoom: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    },
    deck: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    },
    _koPile: {
        value: null,
        writable: true
    },
    koPile: {
        get: function(){
            "use strict";
            if(!this._koPile){
                this._koPile = [];
            }
            return this._koPile;
        }
    },
    _frontRow: {
        value: null,
        writable: true
    },
    frontRow: {
        get: function(){
            "use strict";
            if(!this._frontRow){
                this._frontRow = [];
            }
            return this._frontRow;
        }
    },
    _backRow: {
        value: null,
        writable: true
    },
    backRow: {
        get: function(){
            "use strict";
            if(!this._backRow){
                this._backRow = [];
            }
            return this._backRow;
        }
    },
    _resourceRow: {
        value: null,
        writable: true
    },
    resourceRow: {
        get: function(){
            "use strict";
            if(!this._resourceRow){
                this._resourceRow = [];
            }
            return this._resourceRow;
        }
    },
    _mainCharacter: {
        value: null,
        writable: true
    },
    mainCharacter: {
        get: function(){
            "use strict";
            if(!this._mainCharacter){
                this._mainCharacter = [null, null];
            }
            return this._mainCharacter;
        },
        set: function(value){
            "use strict";
            if(Object.getPrototypeOf(value) !== mainCharacterCard){
                throw Error("Must be a mainCharacterCard object.");
            }
            //level is either 1 or 2...
            if(value.level === 1 || value.level === 2){
                this.mainCharacter[value.level - 1] = value;
            }
            else{
                throw Error("Main character must have level defined.");
            }
        }
    }
};
var player = Object.create({}, playerDef);
player.addResource = function(resourceCard){
    "use strict";
    //must be a card, any card.
    if(!card.isPrototypeOf(resourceCard)){
        throw Error("Must be a valid card object");
    }
    this.resourceRow.push(resourceCard);
};
player.addFrontRowCharacter = function(frontCard){
    "use strict";
    //must be s supporting character card
    if(Object.getPrototypeOf(frontCard) !== supportingCharacterCard){
        throw Error("Must be a valid supporting character");
    }
    this.frontRow.push(frontCard);
};
player.addBackRowCharacter = function(backCard){
    "use strict";
    //must be s supporting character card
    if(Object.getPrototypeOf(backCard) !== supportingCharacterCard){
        throw Error("Must be a valid supporting character");
    }
    this.frontRow.push(backCard);
};
module.exports = player;
