'use strict';

const Router = require('express').Router;
const noteRouter = module.exports = new Router();
const debug = require('debug')('note:note-router');
const AppError = require('../lib/app-error');
const storage = require('../lib/storage');
const Note = require('../model/note');

function createNote(reqBody){
  debug('createNote');
  return new Promise(function(resolve, request){
    debugger;
    var note;
    try{
      note = new Note(reqBody.content);
    } catch(err){
      reject(err);
    }
    storage.setItem('note', note).then(function(note){
      resolve(note);
    }).catch(function(err){
      reject(err);
    });
  });
}

noteRouter.post('/', function(req, res){
  debug('HIT endpoint /api/note POST');
  createNote(req.body).then(function(note){
    res.status(200).json(note);
  }).catch(function(err){
    console.error(err.message);
    if(AppError.isAppError(err)){
      res.status(err.statusCode).send(err.responseMessage);
      return;
    }
    res.status(500).send('internal server error');
  });
});

noteRouter.get(':/id', function(req, res){
  storage.fetchItem('note', req.params.id).then(function(note){
  }).catch(function(err){
    console.error(err.message);
    if(AppError.idAppError(err)){
      res.status(err.statusCode).send(err.responseMessage);
      return;
    }
    res.status(500).send('internal server error');
  });
});

noteRouter.put(':/id', function(req, res){
  storage.updateItem('note', req.params.body).then(function(note){
  }).catch(function(err){
    console.error(err.message);
    if(AppError.idAppError(err)){
      res.status(err.statusCode).send(err.responseMessage);
      return;
    }
    res.status(500).send('internal server error');
  });
});

noteRouter.delete(':/id', function(req, res){
  storage.deleteItem('note', req.params.id).then(function(note){
  }).catch(function(err){
    console.error(err.message);
    if(AppError.idAppError(err)){
      res.status(err.statusCode).send(err.responseMessage);
      return;
    }
    res.status(500).send('internal server error');
  });
});
