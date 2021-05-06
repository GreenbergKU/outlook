import chai from 'chai';
const expect = chai.expect;
//import User from "../src/class/User.js";
import Guest from "../src/class/Guest.js";
import HotelData from "../src/class/data/HotelData.js";
import sampleBookings from "./testData/bookings-sample.js";
import sampleRooms from "./testData/rooms-sample.js";
import sampleUsers from "./testData/users-sample.js";

// const dayjs = require('dayjs');
// dayjs().format();

const sampleData = {usersData: sampleUsers, bookingsData: sampleBookings, roomsData: sampleRooms};
const hotelData = new HotelData(sampleData);

describe('Guest', function() {
  let guest, data, user, user2, noArguments;

  // beforeEach(() => {
  //   return (
  //     data = {id: 1, name: "Sue"},
  //     guest = new Guest("2021/05/03", data),
  //     noArguments = new Guest(),
  //     user = new User("manager", "overlook2020"),
  //     user2 = new User("customer7", "overlook2020")
  //   )
  // });

  it('should be a function', function() {

    expect(Guest).to.be.a("function");
  });

  it('should be an instance of Guest', function() {

    //data = {id: 1, name: "Sue"};
    guest = new Guest({id: 1, name: "Sue"}, "2021/05/03");

    expect(guest).to.be.an.instanceOf(Guest);
  });

  it('Should not require an argument to create a new guest', function() {
    //noArguments = new Guest();
    expect( () => new Guest() ).to.not.throw(Error);
  });

  it('Should be undefined if no arguement is given for the guest', function() {
    noArguments = new Guest();
    expect(noArguments.id).to.equal(undefined);
  });

  it('Should have a date, id and name property', function() {
    
    guest = new Guest({id: 1, name: "Sue"}, "2021/05/03");
    
    expect(guest.date).to.equal("2021/05/03");
    expect(guest.id).to.equal(1);
    expect(guest.name).to.equal("Sue");
  });
});

