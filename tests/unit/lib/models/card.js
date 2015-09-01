/*eslint-env node*/
var cardDef = {
    number: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    },
    name: {
        value: null,
        enumerable: true,
        configurable: false,
        writable: true
    }
};
module.exports = Object.create({}, cardDef);
