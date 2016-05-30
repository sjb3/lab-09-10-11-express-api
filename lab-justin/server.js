'use strict';
//??? errResponse???
//set env variables
// req node modules
//req npm modules
const debug = require('debug')('note:server');
const express = require('express');
const morgan = require('morgan');

const bodyParser = require('body-Parser');
//req app modules
const noteRouter = require('./route/note-router');
//setup globals && req modules that dependent of -g

const port = process.env.PORT || 3000;
// like create http server
//invoking express create app
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
//prefixed path - router
app.use('/api/note', noteRouter);
//any unmatched /api/note will
app.all('*', function(req, res){
  debug('hit 404 route');
  res.status(404).send('not found');
});

const server = app.listen(port, function(){
  debug('listen');
  console.log('app up on port', port);
});

server.isRunning = true;
module.exports = server;
