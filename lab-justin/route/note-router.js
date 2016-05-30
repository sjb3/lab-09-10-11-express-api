'use strict';
//node modules
//npm modules
//app modules

//globals & the modules depend on globals
const Router = require('express').Router;//
const noteRouter = module.exports = new Router();
const debug = require('debug')('note:note-router');
const bodyParser = require('body-parser').json();//
const sendError = require('../lib/err-response');
// const AppError = require('../lib/app-error');
const storage = require('../lib/storage');
const Note = require('../model/note');

function createNote(reqBody){
  debug('createNote');
  return new Promise(function(resolve, reject){
    // debugger;
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

noteRouter.post('/', bodyParser, sendError, function(req, res){
  debug('HIT endpoint /api/note POST');

  // return new Promise(function(resolve, reject){ })
  createNote(req.body).then(function(note){
    res.status(200).json(note);
  }).catch(function(err){
    res.sendError(err);
  });
});

noteRouter.get('/:id', sendError, function(req, res){
  storage.fetchItem('note', req.params.id).then(function(note){
    // console.log(note , "INSIDE GET SUCCESS");
    res.status(200).json(note);
  }).catch((err) => {
    // console.log(err , "INSIDE GET CATCH");
    res.sendError(err);
  });
});

noteRouter.put('/:id', bodyParser, sendError, function(req, res){
  storage.updateItem('note', req.params.body).then(function(note){
    res.status(200).json(note);
  }).catch(function(err){
    res.sendError(err);
  });
});

noteRouter.delete('/:id', bodyParser, sendError, function(req, res){
  storage.deleteItem('note', req.params.id).then(function(note){
    res.status(200).json(note);
  }).catch(function(err){
    res.sendError(err);
  });
});
