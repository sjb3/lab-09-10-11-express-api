'use strict';

const debug = require('debug')('note:app-error');

const AppError = module.exports = function(message, statusCode, responseMessage){
  debug('creating app error');
  Error.call(this);// act like contructor
  this.message = message;
  this.statusCode = statusCode;
  this.responseMessage = responseMessage;
};
AppError.prototype = Object.create(Error.prototype);//empty object with prototype

AppError.isAppError = function(err){
  debug('isAppError');
  return err instanceof AppError;
};

AppError.error400 = function(message){
  debug('error400');
  return new AppError(message, 400, 'bad request');
};

AppError.error404 = function(message){
  debug('error404');
  return new AppError(message, 404, 'not found');
};

AppError.error500 = function(message){
  debug('error500');
  return new AppError(message, 500, 'internal server error');
};
