/*eslint-env node*/
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
    }


};
module.exports = Object.create({}, playerDef);
