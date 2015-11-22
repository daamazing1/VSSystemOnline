/*eslint-env node*/
var card = require("./card");
var characterCard = require("./characterCard");
var supportingCharacterCard = require("./supportingCharacterCard");
var mainCharacterCard = require("./mainCharacterCard");
var enums = require("./enums");

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
player.removeResource = function(resource){
    "use strict";
    if(!card.isPrototypeOf(resource)){
        throw Error("Must be a valid card object");
    }
    for(var i = 0, j = this.resourceRow.length; i < j; i++){
        if(this.resourceRow[i] === resource){
            this.resourceRow.splice(i, 1);
        }
    }
};
player.addToKOPile = function(koCard){
    "use strict";
    if(!card.isPrototypeOf(koCard)){
        throw Error("Must be a valid card");
    }
    this.koPile.push(koCard);
};
player.recruitCharacter = function(supportingCharacter, row){
    "use strict";
    if(Object.getPrototypeOf(supportingCharacter) !== supportingCharacterCard){
        throw Error("Must be a valid supporting character");
    }
    if(!(row === enums.row.front || row === enums.row.back)){
        throw Error("Must be recruited in either enums.row.front or enums.row.back");
    }
    this[row].push(supportingCharacter);
    //todo: Add additional rule functionality around uniqueness and swarm abilities
};
player.moveCharacter = function(character, row){
    "use strict";
    if(!characterCard.isPrototypeOf(character)){
        throw Error("Must be a valid character");
    }
    if(!(row === enums.row.front || row === enums.row.back)){
        throw Error("Must be moved in either enums.row.front or enums.row.back");
    }

    ["frontRow", "backRow"].forEach(function(r){
        for(var i = 0, j = this[r].length; i < j; i++){
            if(this[r][i] === character){
                this[r].splice(i, 1);
                break;
            }
        }
    }, this);
    this[row].push(character);
};
player.stunCharacter = function(character){
    "use strict";
    if(!characterCard.isPrototypeOf(character)){
        throw Error("Must be a valid character");
    }
    //stun the character and then give him a wound.
    character.stunned = true;
    character.wounds++;
};
player.koCharacter = function(character){
    "use strict";
    if(!characterCard.isPrototypeOf(character)){
        throw Error("Must be a valid character");
    }
    ["frontRow", "backRow"].forEach(function(r){
        for(var i = 0, j = this[r].length; i < j; i++){
            if(this[r][i] === character){
                this[r].splice(i, 1); //remove the character from the field
                break;
            }
        }
    }, this);
};
module.exports = player;
