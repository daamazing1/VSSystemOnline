var mongodb = require("mongodb");
var config = require("./config");


function VsSystemDb(){
  return {
    connect : function(){
      var url = config.mongoDbUrl;
      var MongoClient = mongodb.MongoClient;

      return new Promise(function(resolve, reject){
        MongoClient.connect(url, function(err, db){
          if(err) reject(err);
          else{
            resolve(db);
          };
        });
      });
    },
    getCards : function(options){
      var options = options || {};
      return new Promise(function(resolve, reject){
        this.connect()
          .then(function(db){
            var cursor = db.collection("cards").find(options);
            cursor.toArray(function(err, data){
              if(err) reject(err);
              else{
                resolve(data)
              };
            })
          .catch(function(error){
            console.log(error);
          })
        });
      }.bind(this));
    }
  };
};

module.exports = exports = new VsSystemDb();
