var mongodb = require("mongodb");
var fs = require('fs');
var xml2js = require('xml2js');
var path = require('path');
var _ = require('lodash');
var util = require('util');

var url = "mongodb://localhost:27017/vssystem";
var MongoClient = mongodb.MongoClient;
MongoClient.connect(url, function(err, db){
    "use strict";
    if(err){
        console.log("Unable to connect to the mongoDB server. Error: ", err);
    }
    else{
        console.log("Connection established to", url);
        findSets(db, "The Marvel Battles")
          .then(function(data){
            console.log(util.inspect(data, {depth: null}));
          })
          .catch(function(error){
            console.log(error);
          })
    };
});


function findSets(db, setName){
  return new Promise(function(fulfill, reject){
    var findCriteria = {}
    if(setName){
      findCriteria.name = setName;
    }

    var cursor = db.collection("sets").find(findCriteria);
    cursor.each(function(err, data){
      if(err) reject(err);
      else{
        fulfill(data)
      }
    });
  });
};
