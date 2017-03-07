/* eslint-env node, mocha */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

global.Promise = require('bluebird');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { searchYelp, toggleVisiting, } = require('../server/controllers');

before(function(done) {
  mongoose.connect('localhost:27017/nightlife', (err) => {
    if (err) {
      process.exitCode = 1;
      console.log('failed to connect to mongoDB');
      process.exit();
    }
    done();
  });
});

after(function(done) {
  mongoose.connection.close(() => {
    done();
  });
});

describe('controllers', function() {
  describe('searchYelp', function() {
    this.timeout(5000);
    it('should return an array of docs', function() {
      return expect(searchYelp('austin')).to.eventually.be.an('array')
        .and.have.deep.property('[0]._id');
    });

    it('should throw an error if no location is provided', function() {
      return expect(searchYelp('')).to.be.rejectedWith(/missing parameter/g);
    });
  }); // end searchYelp

  describe('toggleVisiting', function() {
    it('should add a user to the visitor list when that user is not already attending', function() {
      return expect(
        toggleVisiting('test-bar', 'test-user')
      ).to.eventually.have.property('visitors').with.lengthOf(1);
    });

    it ('should remove a user from the visitor list when that visitor is already attending', function() {
      return expect(
        toggleVisiting('test-bar', 'test-user')
      ).to.eventually.have.property('visitors').with.lengthOf(0);
    })
  }); // end toggleVisiting
});
