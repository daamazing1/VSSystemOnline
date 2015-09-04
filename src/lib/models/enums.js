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
enums.gamePhase = Object.create(null, {
    "draw": {
        value: "drawPhase",
        enumerable: true
    },
    "recovery": {
        value: "recoveryPhase",
        enumerable: true
    },
    "build": {
        value: "buildPhase",
        enumerable: true
    },
    "main": {
        value: "mainPhase",
        enumerable: true
    }
});
enums.phaseStep = Object.create(null, {
    "resource": {
        value: "resourceStep",
        enumerable: true
    },
    "recruit": {
        value: "recruitStep",
        enumerable: true
    },
    "formation": {
        value: "formationStep",
        enumerable: true
    }
});
Object.freeze(enums);
module.exports = enums;

