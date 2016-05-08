import Promise from 'bluebird';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes'; //should pickup index.js
import bodyParser from 'body-parser';

import Card from './models/card.js';

var app = express();

//Connect to mongo db
Promise.promisifyAll(mongoose);
mongoose.connect('mongodb://172.17.0.2:27017/vs_system_2pcg', {server: {socketOptions: {keepAlive: 1}}});
mongoose.connection.on('error', () => {
  throw new Error('unable to connect to database');
});
mongoose.connection.on('open', () => {
  console.log("Connected to vs_system_2pcg");
});

//express configuration
var app = express();
//Add CORS
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})


app.use(bodyParser.json());
app.use('/api', routes);

app.listen(8080, () => {
  console.log('Listening to port 8080');
});

export default app;
