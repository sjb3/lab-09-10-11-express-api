'use strict';

const debug = require('debug')('note:server');
const express = require('express');
const morgan = require('morgan');
// const jsonParser = require('body-Parser').json();
const noteRouter = require('./route/note-router');
const errorResponse = require('./lib/err-response');
// const AppError = require('./lib/app-error');
const port = process.env.PORT || 3000;
const app = express();// like create http server, invoking express create app

// app.use(bodyParser.json());
app.use(morgan('dev'));//enable middleware
app.use(errorResponse);
app.use('/api/note', noteRouter);//prefixed path - router//define route

app.all('*', function(req, res){
  debug('hit 404 route');
  res.status(404).send('not found');
  // try {
  //   wat = 1/0;
  // } catch (err){
  //   res.sendError(err);
  // }
});

const server = app.listen(port, function(){
  debug('listen');
  console.log('app up on port', port);
});

server.isRunning = true;
module.exports = server;
