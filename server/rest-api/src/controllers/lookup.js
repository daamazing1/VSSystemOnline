import mongoose from 'mongoose';
import Promise from 'bluebird';

function teams(req, res, next){
  var db = mongoose.connection;
  db.collections.cards.distinct('team')
    .then((teams) => res.json(teams));
}

function cardTypes(req, res, next){
  var db = mongoose.connection;
  db.collections.cards.distinct('type')
    .then((types) => res.json(types));
}

function powers(req, res, next){
  res.json(['flight', 'range']);
}

export default { teams, cardTypes, powers };
