/*eslint-env node*/
var restify = require("restify");
var path = require("path");
var vsdb = require("./db");

vsdb.getCards({"name" : "Captain America"}).then(function(data){console.dir(data);});
