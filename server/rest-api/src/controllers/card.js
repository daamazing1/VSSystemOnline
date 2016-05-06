import Card from '../models/card.js';

//load card and append to req
function query(req, res, next){
  console.log(req.body);
  Card.query(req.body)
    .then((cards) => {
      res.json(cards);
    })
    .error((e) => next(e));
}

function list(req, res, next){
  const { limit = 50, skip = 0} = req.query;
  Card.list({limit, skip})
    .then((cards) => res.json(cards))
    .error((e) => next(e));
}

export default { query, list };
