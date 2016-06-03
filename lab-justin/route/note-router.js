'use strict';

const Router = require('express').Router;//
const noteRouter = module.exports = new Router();//instance of Router
const debug = require('debug')('note:note-router');
// const AppErr = require('../lib/app-error');
const sendError = require('../lib/err-response');
const storage = require('../lib/storage');
const Note = require('../model/note');
const jsonParser = require('body-parser').json();

function createNote(reqBody){
  return new Promise(function(resolve, reject){
    var note;
    try{
      note = new Note(reqBody.content);

      // return resolve(note);
    } catch(err){
      return reject(err);
    }
    storage.setItem('note', note).then(function(note){
      resolve(note);
    }).catch(function(err){
      reject(err);
    });
  });
}

noteRouter.post('/', jsonParser, sendError, function(req, res){  // debug('HIT endpoint /api/note POST');
  debug('hit endpoint');
  createNote(req.body).then(function(note){
    res.status(200).json(note);
  }).catch(function(err){
    res.sendError(err);
  });
});

noteRouter.get('/:id', sendError, function(req, res){
  debug('GET api/note/:id');
  storage.fetchItem('note', req.params.id).then(function(note){
    res.status(200).json(note);
  }).catch((err) => {
    res.sendError(err);
  });
});

noteRouter.put('/:id', jsonParser, sendError, function(req, res){
  storage.updateItem('note', req.params.id , req.body).then(function(note){
    res.status(200).json(note);
  }).catch(function(err){
    res.sendError(err);
  });
});

noteRouter.delete('/:id', jsonParser, sendError, function(req, res){
  storage.deleteItem('note', req.params.id).then(function(){
    res.status(200).json({});
  }).catch(function(err){
    res.sendError(err);
  });
});
