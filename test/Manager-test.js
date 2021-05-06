import chai from 'chai';
const expect = chai.expect;
import User from "../src/class/User.js";
import Guest from "../src/class/Guest.js";
import Manager from "../src/class/Manager.js";
import HotelData from "../src/class/data/HotelData.js";
import sampleBookings from "./testData/bookings-sample.js";
import sampleRooms from "./testData/rooms-sample.js";
import sampleUsers from "./testData/users-sample.js";

const sampleData = {usersData: sampleUsers, bookingsData: sampleBookings, roomsData: sampleRooms};
const hotelData = new HotelData(sampleData);

// const dayjs = require('dayjs');
// dayjs().format();

const date = "2021/05/03";

describe('Manager', function() {

  it('should be a function', function() {
    //const manager = new Manager("2021/05/03");
    expect(Manager).to.be.a("function");
  });

  it('should have a date, id and name property', function() {
    
    const manager = new Manager("2021/05/03");
    
    expect(manager.date).to.equal("2021/05/03");
  });
});