var mongodb = require('mongodb');
var fs = require('fs');
var _ = require('lodash');

var url = 'mongodb://localhost:27017/vs_system_2pcg';
var mongoClient = mongodb.MongoClient;
mongoClient.connect(url, function(err, db){
  'use strict';
  if(err){
    console.log('Unable to connectio to mongoDB server. Error: ', err);
  }
  else{
    console.log('Connection established to ', url);
    // create a text stream to the file we are inputting
    var input = fs.createReadStream('Powers_Sheet1.tsv');
    var remaining = '';
    input.on('data', function(data){
      remaining += data;
      var index = remaining.indexOf('\n');
      while(index > -1){
        var line = remaining.substring(0, index);
        remaining = remaining.substring(index + 1);
        // take the line and parse it outside
        var tabSplit = line.split('\t');
        var card = {};
        // card number
        card.number = tabSplit[0].substring(1, tabSplit[0].length - 1);
        card.powers = tabSplit[1].substring(1, tabSplit[1].length - 1).split(';');
        for(var i = 0, j = card.powers.length; i < j; i++){
          card.powers[i] = card.powers[i].trim();
        }
        console.dir(card);
        db.collection('cards').update(
          {"cardNumber" : card.number},
          {
            $set: {"powers": card.powers}
          });
        index = remaining.indexOf('\n');
      }
    });

    input.on('end', function(){
      if(remaining.length > 0){
        data = remaining;
        var index = remaining.indexOf('\n');
        while(index > -1){
          var line = remaining.substring(0, index);
          remaining = remaining.substring(index + 1);
          // take the line and parse it outside
          var tabSplit = line.split('\t');
          var card = {};
          // card number
          card.number = tabSplit[0].substring(1, tabSplit[0].length - 1);
          card.powers = tabSplit[1].substring(1, tabSplit[1].length - 1).split(';');
          for(var i = 0, j = card.powers.length; i < j; i++){
            card.powers[i] = card.powers[i].trim();
          }
          console.dir(card);
          db.collection('cards').update({"cardNumber" : card.number}, {"powers": card.powers});
          index = remaining.indexOf('\n');
        }
      }
      db.close();
      console.log("complete");
    });
  }
})
