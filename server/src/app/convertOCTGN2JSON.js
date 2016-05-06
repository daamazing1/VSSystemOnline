var fs = require('fs');
var xml2js = require('xml2js');
var path = require('path');
var util = require('util');
var _ = require('lodash');


var parser = new xml2js.Parser( );

fs.readFile(path.join(__dirname,'set.xml'), function(err, data) {
    parser.parseString(data, function (err, result) {
        //need to clean up this mess into something more reasonable
        var cleanedSet = result.set['$'];
        cleanedSet.cards = _.map(result.set.cards[0].card, function(card){
          var newCard = {
            id: card['$'].id,
            name: card['$'].name
          };
          for(var property of card.property){
            var name = property['$'].name.toLowerCase();
            if(name === "card number"){
              name = "cardNumber";
            }
            var value = property['$'].value;
            if(!Number.isNaN(Number(value))){
              value = Number(value);
            }

            if(name === "team1"){
              name = "team";
            }

            if(name === "team2"){
              continue;
            }
            newCard[name] = value;
          }
          return newCard;
        });
        console.log(util.inspect(cleanedSet,{depth: null}));
    });
});
