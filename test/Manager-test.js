import chai from 'chai';
const expect = chai.expect;

import Manager from "../src/class/Manager.js";
import HotelData from "../src/class/data/HotelData.js";
import sampleBookings from "./testData/bookings-sample.js";
import sampleRooms from "./testData/rooms-sample.js";
import sampleUsers from "./testData/users-sample.js";
// import User from "../src/class/User.js";
// import Guest from "../src/class/Guest.js";

describe('Manager', function() {
  let guestAdmin, data, user, user2;
  
  const formatDate = (date, style) => {
    const dayjs = require('dayjs');
    dayjs().format();
    return style === 'sort' ? dayjs(date).format("YYYYMMDD")
      : style === 'words' ? dayjs(date).format("MMMM D, YYYY") 
      : style === 'numbers' ? dayjs(date).format("MM/DD/YYYY")
      : style === 'min' ? dayjs(date).format("YYYY-MM-DD")
      : dayjs(date).format("YYYY/MM/DD"); 
  };

  const sampleData = {usersData: sampleUsers, bookingsData: sampleBookings, roomsData: sampleRooms};
  const hotelData = new HotelData(sampleData);
    // console.log('hotelData.bookingsData: ', hotelData.bookingsData);

  const date = "2020/01/23";
  const instantiateManager = (date) => new Manager(date);
  const manager = instantiateManager(date);
  const calculatedManager = manager.calculations(hotelData, formatDate);
    console.log('calculatedManager: ', calculatedManager);

  it('should be a function', function() {
    expect(Manager).to.be.a("function");
  });

  it('should be an instance of Manager', function() {
    expect(manager).to.be.an.instanceOf(Manager);
  });

  it('Should not require an argument to create a new manager', function() { 
    expect(instantiateManager).to.not.throw(Error);
  });

  it('Should be undefined if no argument is given for the manager', function() {
    const noArguments = instantiateManager();
    expect(noArguments.date).to.equal(undefined);
  });
  
  it('should have a date, name and type property', function() {
    expect(manager.date).to.equal(date);
    expect(manager.name).to.equal("Manager");
    expect(manager.type).to.equal("manager");
  });

  describe('calculations', function() {

    it('should return a manager with a property of "availableRoomsNum"', function() {
      expect(calculatedManager).has.property("availableRoomsNum");
    });

    it('should return a manager with a property of "revenue"', function() {
      expect(calculatedManager).has.property("revenue");
    });

    it('should return a manager with a property of "roomsOccupied"', function() {
      expect(calculatedManager).has.property("roomsOccupied");
    });
  });
});