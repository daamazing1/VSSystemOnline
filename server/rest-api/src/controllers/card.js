import Card from '../models/card.js';

//load card and append to req
function query(req, res, next){
  Card.query(req.body)
    .then((cards) => {
      res.json(cards);
    })
    .error((e) => next(e));
}

//list out all the cards from the database
function list(req, res, next){
  const { limit = 50, skip = 0} = req.query;
  Card.list({limit, skip})
    .then((cards) => res.json(cards))
    .error((e) => next(e));
}

export default { query, list };
