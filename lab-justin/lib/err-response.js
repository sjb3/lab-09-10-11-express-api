'use strict';

const debug = require('debug')('note: error.response');
const AppError = require('./app-error');

module.exports = function(req, res, next){
  res.sendError = function(err){
    //from note-router.js
    debug('sendError');

    if(AppError.isAppError(err)){
      res.status(err.statusCode).send(err.responseMessage);
      return;
    }
    res.status(500).send({content: 'internal server error'});
  };
  next();
};
