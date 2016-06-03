'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const server = require('../server');
const storage = require('../lib/storage');
const Note = require('../model/note');
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
        server.isRunning = false;
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

    it('should return a note', (done) => {
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

    describe('testing bad posting, no body provided', () => {
      it('test for bad request', (done) => {
        request
        .post(baseUrl)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.text).to.eql('bad request');
          done();
        });
      });
    });
  });

//test GET
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
    describe('testing incase of no ID', () => {
      it('should return 404 statusCode-no ID', function(done){
        request
        .get(baseUrl)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.error.text).to.equal('not found');
          done();
        });
      });
    });

  });

//test PUT
  describe('testing PUT @ /api/note', function(){
    before((done) => {
      this.tempNote = new Note('meow');
      storage.setItem('note', this.tempNote);
      done();
    });
    after((done) => {
      storage.pool = {};
      done();
    });

    describe('testing PUT', () => {
      it('should return "meow"', (done) => {
        request
        .put(`${baseUrl}/${this.tempNote.id}`)
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body.content).to.eql('meow');
          expect(!!res.body.id);
          expect(res.body.content).to.eql(this.tempNote.content);
          expect(res.body.id).to.eql(this.tempNote.id);
          done();
        });
      });
    });
  //

    describe('test PUT 400 @ api/note', () => {
      it('should return 400 bad request', (done)=>{
        request
        .put(`${baseUrl}/${this.tempNote}`)
        // .put(`${baseUrl}/${this.tempNote.id}`)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.text).to.eql('bad request');
          done();
        });
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

    describe('test DELETE method @ api/note', () => {
      it('should return status 200 with successful deletion', (done) => {
        request
        .del(`${baseUrl}/${this.tempNote.id}`)
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body.content).to.eql(undefined);
          done();
        });
      });
    });

  });
});
