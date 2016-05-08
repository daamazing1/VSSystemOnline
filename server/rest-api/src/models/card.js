import mongoose from 'mongoose';
import Promise from 'bluebird';

var cardSchema = new mongoose.Schema({
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
    for (var prop in query) {
      if(prop === "name" || prop === "rules"){
        query[prop] = new RegExp(query[prop], 'i');
      }

      if(prop === 'type'){
        // allow for multiple card types and do an or filter on them.
        query[prop] = { $in: query[prop] };
      }

      if(prop === 'team'){
        // allow for multiple team selection
        query[prop] = { $in: query[prop] };
      }

      if(prop === 'powers'){
        //for now only covers flight and range, this will change
        query[prop] = { $in: query[prop] };
      }
    }
    return this
      .find(query)
      .execAsync();
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
