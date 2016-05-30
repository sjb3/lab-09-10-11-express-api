'use strict';

const debug = require('debug')('note:storage');
const AppError = require('./app-error');
exports.pool = {};

exports.setItem = function(schema, item){
  debug('setItem');
  return new Promise((resolve, reject) => {
    if (!item.id){
      var err = AppError.error400('storage setItem requires id');
      return reject(err);
    }
    if (!this.pool[schema]) this.pool[schema] = {};
    this.pool[schema][item.id] = item;
    resolve(item);
  });
};

exports.fetchItem = function(schema, id){
  debug('fetchItem');
  return new Promise((resolve, reject) => {
    //Schema not found
    if(!this.pool[schema]){
      var schemaErr = AppError.error404('storage schema not found');
      return reject(schemaErr);
    }
    //ID Not Found
    if(!this.pool[schema][id]){
      var itemErr = AppError.error404('storage item not found');
      return reject(itemErr);
    }
    resolve(this.pool[schema][id]);
  });
};

exports.updateItem = function(schema, id, item){
  debug('updateItem');
  return new Promise((resolve, reject) =>{
    if(!item.id) {
      var err = AppError.error404('storage schema not found');
      return reject(err);
    }
    if(!this.pool[schema][id]){
      err;
      return reject(err);
    }
    resolve(this.pool[schema][id]);
  });
};

exports.deleteItem = function(schema, id){
  debug('deleteItem');
  return new Promise((resolve, reject) => {
    if(!this.pool[schema]){
      var err = AppError.error404('storage schema not found');
      return reject(err);
    }
    if(!this.pool[schema][id]){
      err;
      return reject(err);
    }
    delete this.pool[schema][id];
    resolve(true);
  });
};
