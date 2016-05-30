'use strict';

//set env var
//req node modules
// req npm modules
const expect = require('chai').expect;
const request = require('superagent');
//req app modules
const server = require('../server');
const storage = require('../lib/storage');
const Note = require('../model/note');
//setup globals add req modules dependent on -g
const port = process.env.PORT || 3000;
const baseUrl = `localhost:${port}/api/note`;

describe('testing module note-router', function(){
  before((done) => {
    if(!server.isRunning){
      server.listen(port, ()=> {
        server.isRunning = true;
        console.log('server running on port', port);
        done();
      });
      return;
    }
    done();
  });
  after((done) => {
    if(server.isRunning){
      server.close(() => {
        console.log('turn off the server');
        done();
      });
      return;
    }
    done();
  });

// test POST
  describe('testing POST @ /api/note', function(){
    after((done) => {
      storage.pool = {};
      done();
    });

    it('should return a note', function(done){
      request
      .post(baseUrl)
      .send({content: 'test note'})
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.content).to.eql('test note');
        expect(!!res.body.id);
        done();
      });
    });
    describe('testing bad posting', function(){
      it('test for bad request', function(done){
        request
        .post(baseUrl)
        .end((err, res) => {
          console.log('HIT IT', res.status);
          expect(res.status).to.eql(400);
          expect(res.text).to.eql('bad request');
          // expect(!res.body.id);
          done();
        });
      });
    });
  });

// //test GET
  describe('testing GET @ /api/note', function() {
    before((done) => {
      this.tempNote = new Note('test data');
      storage.pool.note= {};
      storage.pool.note[this.tempNote.id] = this.tempNote;
      done();
    });
    after((done) => {
      storage.pool = {};
      done();
    });
    it('should return a note', (done) => {
      request
      .get(`${baseUrl}/${this.tempNote.id}`)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.content).to.eql(this.tempNote.content);
        expect(res.body.id).to.eql(this.tempNote.id);
        done();
      });
    });
    describe('testing incase of no valid ID', function(){
      it('should return 404 statusCode', function(done){
        request
        .get(baseUrl)
        .end((err, res) => {
          console.log(res.body, 'RES ERROR');
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('not found');
          done();
        });
      });
    });
  });
  //test PUT
  describe('testing PUT @ /api/note', function(){
    before((done) => {
      this.tempNote = new Note('test data');
      storage.setItem('note', this.tempNote);
      done();

    });
    after((done) => {
      storage.pool = {};
      done();
    });
    it('should return a note', (done) => {
      request.put(`${baseUrl}/${this.tempNote.id}`)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.content).to.eql(this.tempNote.content);
        expect(res.body.id).to.eql(this.tempNote.id);
        done();
      });
    });

    it('should return a note', (done) => {
      request.put(`${baseUrl}/${this.tempNote.id}`)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.content).to.eql(this.tempNote.content);
        expect(res.body.id).to.eql(this.tempNote.id);
        done();
      });
    });
  });
      //test DELETE
  describe('testing DELETE /api/note', function() {
    before((done) => {
      this.tempNote = new Note('test data');
      storage.setItem('note', this.tempNote);
      done();

    });
    after((done) => {
      storage.pool = {};
      done();
    });

    it('should return a note', (done) => {
      request.get(`${baseUrl}/${this.tempNote.id}`)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.content).to.eql(this.tempNote.content);
        expect(res.body.id).to.eql(this.tempNote.id);
        done();
      });
    });
  });
});
