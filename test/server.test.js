const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

global.Promise = require('bluebird');

const { searchYelp } = require('../server/controllers');

before(function(done) {
  done();
  // connect to db
});
after(function(done) {
  done();
  // disconnect from db
});

describe('controllers', function() {
  describe('searchYelp', function() {
    it('should do things', function(){
      return expect(searchYelp('austin')).to.eventually.be.an('array');
    });

    it('should throw an error if no location is provided', function() {
      return expect(searchYelp('')).to.be.rejectedWith(/missing/g);
    });

  }); // end searchYelp

  
});