import mongoose from 'mongoose';
import Promise from 'bluebird';

var cardSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  name: {
    type: String
  },
  type: {
    type: String
  },
  cardNumber: {
    type: String
  },
  cost: {
    type: Number
  },
  atk: {
    type: Number
  },
  def: {
    type: Number
  },
  flight: {
    type: Boolean
  },
  range: {
    type: Boolean
  },
  team: {
    type: String
  },
  health:{
    type: Number
  }
});

cardSchema.statics = {
  query(query){
    for(var prop in query) {
      // remove any properties of the query which are empty.
      if((typeof query[prop] === 'string' && query[prop].trim() === '') || (query[prop].length === 0)){
        delete query[prop];
        continue;
      }
      // use in clause for some query fields
      switch(prop){
        case 'name':
        case 'rules':
          query[prop] = new RegExp(query[prop], 'i');
          break;
        case 'type':
        case 'team':
        case 'powers':
          // allow for multiple card types and do an or filter on them.
          // allow for multiple team selection
          // for now only covers flight and range, this will change
          query[prop] = { $in: query[prop] };
      }
    }
    //check and make sure that query has something to query, if query object is
    //empty then just return an empty recordset.
    for(var key in query){
      if(query.hasOwnProperty(key)){
        return this
          .find(query)
          .execAsync();
      }
    }
    var deferred = Promise.defer();
    deferred.resolve([]);
    return deferred.promise;
  },
  list({ skip = 0, limit = 50} = {}){
    return this
      .find()
      .skip(skip)
      .limit(limit)
      .execAsync();
  }
};

export default mongoose.model('Card', cardSchema);
