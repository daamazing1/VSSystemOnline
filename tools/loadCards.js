var mongodb = require("mongodb");
var fs = require('fs');
var xml2js = require('xml2js');
var path = require('path');
var _ = require('lodash');
var ObjectID = require("mongodb").ObjectID;

//var url = "mongodb://54.152.95.76:27017/vs_system_2pcg";
var url = "mongodb://localhost:27017/vs_system_2pcg";
var MongoClient = mongodb.MongoClient;
MongoClient.connect(url, function(err, db){
    "use strict";
    if(err){
        console.log("Unable to connect to the mongoDB server. Error: ", err);
    }
    else{
        console.log("Connection established to", url);
        parseXML()
          .then(function(sets){
            console.log("Returning with sets");
            console.dir(sets);
            sets.forEach(function(data){
              //we currently have the data as a single document... need to break
              //this into a one-to-many relationship between the set and the
              //cards.
              var setData = {};
              setData.name = data.name.trim();
              setData._id = data.id;
              setData.cards = _.map(data.cards,"_id");
              insertSet(db, setData)
                .then(function(){
                    // Add the set_id property to the cards
                    var cardData = _.map(data.cards, function(card){
                      return _.extend({}, card, { set_id:data.id });
                    });
                    // insert the cards for the set
                    insertCards(db, cardData)
                      .then(function(){
                        db.close();
                        console.log("complete");
                      });
                });
            });
          });
    };
});

function insertSet(db, data){
  return new Promise(function(fulfill, reject){
    db.collection("sets").insertOne(data, function(err, result){
      if(err) reject(err);
      else{
        fulfill("Inserted a document into the sets collection.")
      };
    });
  });
}

function insertCards(db, data){
  return new Promise(function(fulfill, reject){
    db.collection("cards").insert(data, function(err, result){
      if(err) reject(err);
      else{
        fulfill("Inserted a documents into the cards collection.")
      };
    });
  });
}

function parseXML(){
  return new Promise(function(fulfill, reject){
    // read xml files from the sets sub-folder, for each one parse out the set
    // and card information
    fs.readdir(
      path.join(__dirname, "sets"),
      function(err, fileList){
        // if there is an error return the promise with an error
        if(err) reject(err);

        // loop through the files found
        var readList = [];
        fileList.forEach(function(fileName){
          if(path.extname(fileName) === ".xml"){
            readList.push(readSet(fileName));
          }
        });
        Promise
          .all(readList)
          .then(function(data){
            fulfill(data);
          })
          .catch(function(err){
            reject(err);
          });
      });
  });
}

function readSet(fileName){
  var parser = new xml2js.Parser();
  return new Promise(function(fulfill, reject){
    fs.readFile(path.join(__dirname, "sets", fileName), function(err,data){
      if(err) reject(err);
      else{
        parser.parseString(data, function(err, result){
          if(err) reject(err);
          else{
            var cleanedSet = result.set['$'];
            cleanedSet.cards = _.map(result.set.cards[0].card, function(card){
              var newCard = {
                _id: card['$'].id,
                name: card['$'].name.trim()
              };
              //find the card type first, we need this information to determine
              //what fields to populate
              for(var property of card.property){
                var name = property['$'].name.toLowerCase();
                if(name === "type"){
                  var value = property['$'].value.trim();
                  newCard.type = value;
                }
              }

              for(var property of card.property){
                var name = property['$'].name.toLowerCase();
                if(name === "card number"){
                  name = "cardNumber";
                }
                var value = property['$'].value.trim();
                if(!Number.isNaN(Number(value))){
                  value = Number(value);
                }

                if(name === "team1"){
                  name = "team";
                  if(value === "" || value === 0){
                    newCard.team = "None";
                    continue;
                  }
                }

                if(name === "team2"){
                  continue;
                }

                switch(newCard.type.toUpperCase()){
                  case 'PLOT TWIST':
                  case 'SPECIAL LOCATION':
                  case 'BASIC LOCATION':
                    if('cost, atk, def, flight, range, health'.indexOf(name) > -1){
                      continue
                    }
                }

                //property name is flight or range
                if(name === "flight" || name === "range"){
                  //if the value is true
                  if(value){
                    //add to the powers array
                    if(newCard.powers){
                      newCard.powers.push(name);
                    }
                    else{
                      newCard.powers = [name];
                    }
                  }
                  continue;
                }
                newCard[name] = value;
              }
              return newCard;
            });
            fulfill(cleanedSet);
          };
        });
      };
    });
  });
}
