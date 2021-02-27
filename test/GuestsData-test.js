import chai from 'chai';
const expect = chai.expect;

// import ClassName from '../src/class/data/.js';
import GuestsData from '../src/class/data/GuestsData.js';

describe('GuestsData', function() {
  const data = [
    {
      "id":1,
      "name":"Leatha Ullrich"
    },
    {
      "id":2,
      "name":"Rocio Schuster"
    },
  ];

  const guestsData = new GuestsData(data);
 
  it('should be a function', function() {
    expect(GuestsData).to.be.a("function");
  });

  it('should instantiate GuestData', function() {
    expect(guestsData).to.be.an.instanceof(GuestsData);
  });

  it('should have a property of "data"', function() {  
    expect(guestsData).to.haveOwnProperty("data");
  });
  
  it('should have a data property of an array', function() { 
    const dataGuests = guestsData.data; 
    expect(dataGuests).to.be.an("array");
    expect(dataGuests.length).to.equal(2);
  });

  it('should have a data property that is an array of objects with defined properties', function() {
    const guest = guestsData.data[0];
    
    expect(guest).to.be.an("object");
    expect(guest).to.haveOwnProperty("id", 1);
    expect(guest).to.haveOwnProperty("name", "Leatha Ullrich");
  });

  describe('countGuests', function() {
    
    it('should be a function', function() {
      expect(guestsData.countGuests).to.be.a("function");
    });

    it('should return the number of total rooms', function() {
      const totalGuests = guestsData.countGuests();
      expect(totalGuests).to.equal(2);
    });
  });

});