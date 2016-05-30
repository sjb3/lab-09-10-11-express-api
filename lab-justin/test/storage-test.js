'use strict';

const expect = require('chai').expect;
const storage = require('../lib/storage');

describe('testing modules storage', function(){
  describe('testing setItem', function(){
    after((done) => {
      delete storage.pool.note;
      done();
    });

    it('should create a note', (done) => {
      storage.setItem('note', {id:123, content:'test data'}).then(function(){
        expect(storage.pool.note[123].id).to.eql(123);
        done();
      }).catch(done);

    });
  });
  describe('testing module fetchItem', function(){
    before((done) => {
      storage.pool.unicorn = {'321': {id:321, name:'sluggacorn'}};
      done();
    });
    after((done) => {
      delete storage.pool.unicorn;
      done();
    });
    it('should resolve a unicorn', function(done){
      storage.fetchItem('unicorn', 321).then((unicorn) => {
        expect(unicorn.id).to.eql(321);
        done();
      }).catch(done);

    });
  });
  describe('testing modules deleteItem', function(){
    before((done) => {
      storage.pool.unicorn = {'321': {id:321, name: 'sluggacorn'}};
      done();
    });
    after((done) => {
      delete storage.pool.unicorn;
      done();
    });
    it('should resolve a true', function(done){
      storage.deleteItem('unicorn', 321).then((success) => {
        expect(success).to.eql(true);
        done();
      }).catch(done);
    });
  });
  describe('testing modules updateItem', function(){
    before((done) => {
      storage.pool.unicorn = {'321': {id:321, name: 'sluggacorn'}};
      done();
    });
    after((done) => {
      delete storage.pool.unicorn;
      done();
    });
    it('should resolve a true', function(done){
      storage.deleteItem('unicorn', 321).then((success) => {
        expect(success).to.eql(true);
        done();
      }).catch(done);
    });
  });
  describe('testing modules setItem', function(){
    before((done) => {
      storage.pool.unicorn = {'321': {id:321, name: 'sluggacorn'}};
      done();
    });
    after((done) => {
      delete storage.pool.unicorn;
      done();
    });
    it('should resolve a true', function(done){
      storage.deleteItem('unicorn', 321).then((success) => {
        expect(success).to.eql(true);
        done();
      }).catch(done);
    });
  });

});
