/*eslint-env node*/
var enums = Object.create(null);
enums.row = Object.create(null, {
    "front": {
        value: "frontRow",
        enumerable: true
    },
    "back": {
        value: "backRow",
        enumerable: true
    }
});
Object.freeze(enums);
module.exports = enums;

