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
