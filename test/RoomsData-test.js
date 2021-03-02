import chai from 'chai';
const expect = chai.expect;

// import ClassName from '../src/class/data/.js';
import RoomsData from '../src/class/data/RoomsData.js';

describe('RoomsData', function() {
  
  const data = [
    {"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4},
    {"number":2,"roomType":"suite","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":477.38},
    {"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14},
    {"number":4,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":1,"costPerNight":429.44},
    {"number":5,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":2,"costPerNight":340.17}
  ];

  const roomsData = new RoomsData(data);
  const dataRooms = roomsData.data

  it('should be a function', function() {
    expect(RoomsData).to.be.a("function");
  });  

  it('should have data', function() {  
    expect(roomsData).to.haveOwnProperty("data");
  });
  
  it('should be an array', function() { 
    expect(dataRooms).to.be.an("array");
    expect(dataRooms.length).to.equal(5);
  });

  it('should be an array of objects with defined properties', function() {
    const room = roomsData.data[0];
    expect(room).to.be.an("object");
    expect(room).to.haveOwnProperty("number", 1);
  });

  describe('countRooms', function() {
    it('should be a function', function() {
      expect(roomsData.countRooms).to.be.a("function");
    });

    it('should return the number of total rooms', function() {
      const totalRooms = roomsData.countRooms();
      expect(totalRooms).to.equal(5);
    });
  });

  describe('findRoomsByProperty', function() {
 
    it('should be a function', function() {
      expect(roomsData.findRoomsByProperty).to.be.a("function");
    });

    it('should return all room objects with a property value that matched the argument', function() {

      const queenRooms = roomsData.findRoomsByProperty("bedSize", "queen");
      
      expect(queenRooms[0]).to.equal(roomsData.data[0]);
      expect(queenRooms.length).to.equal(3);
      
      const isMatch = (match) => {
        queenRooms.forEach(room => {
          if(room["bedSize"] !== "queen") {
            return match = !match;
          };
        });
        return match;
      };

      expect(isMatch(true)).to.equal(true);
    });
  });
  
});