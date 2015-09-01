/*eslint-env node*/
var characterCard = require("./characterCard");

var mainCharacterDef = {
    type: {
        enumerable: true,
        get: function(){
            "use strict";
            return "Main Character";
        }
    },
    level: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    },
    _experienceCounters: {
        value: 0,
        enumerable: false,
        configurable: false,
        writable: true
    },
    experienceCounters: {
        enumerable: true,
        configurable: false,
        get: function (){
            "use strict";
            return this._experienceCounters;
        }
    }
};
var character = Object.create(characterCard, mainCharacterDef);
character.addExperienceCounter = function(){
    "use strict";
    this._experienceCounters++;
};
character.clearExperienceCounters = function(){
    "use strict";
    this._experienceCounters = 0;
};
Object.seal(character);
module.exports = character;
