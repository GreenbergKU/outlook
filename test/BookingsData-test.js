import chai from 'chai';
const expect = chai.expect;
// import ClassName from '../src/class/data/.js';
import BookingsData from '../src/class/data/BookingsData.js';

describe('BookingsData', function() {
  it('should be a function', function() {
    expect(BookingsData).to.be.a("function");
  });
});