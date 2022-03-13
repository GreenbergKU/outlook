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

describe('Guest', function() {
  //<<<<<<< HEAD
  // let guest; // data, user, user2;
  
  function formatDate(date, style) {
    const dayjs = require('dayjs');
    dayjs().format();
    return style === 'sort' ? dayjs(date).format("YYYYMMDD")
      : style === 'words' ? dayjs(date).format("MMMM D, YYYY") 
      : style === 'numbers' ? dayjs(date).format("MM/DD/YYYY")
      : style === 'min' ? dayjs(date).format("YYYY-MM-DD")
      : dayjs(date).format("YYYY/MM/DD"); 
  };

  const hotelData = new HotelData({usersData: sampleUsers, bookingsData: sampleBookings, roomsData: sampleRooms});
  // const sampleData = {usersData: sampleUsers, bookingsData: sampleBookings, roomsData: sampleRooms};
  // const hotelData = new HotelData(sampleData);

  const date = "2020/04/19";
  //guest = new Guest(sampleUsers[0], date);
  //=======

  const guest = new Guest(sampleUsers[0], date);
  //let guest;

  it('should be a function', function() {
    expect(Guest).to.be.a("function");
  });

  it('should be an instance of Guest', function() {
    // guest = new Guest(sampleUsers[0], date);
    expect(guest).to.be.an.instanceOf(Guest);
  });

  it('Should not require an argument to create a new guest', function() {
    expect( () => new Guest() ).to.not.throw(Error);
  });

  it('Should be undefined if no arguement is given for the guest', function() {
    const noArguments = new Guest();
    expect(noArguments.id).to.equal(undefined);
  });

  it('Should have a date, id, name and type property', function() {
    
    expect(guest).has.property("date");
    expect(guest.date).to.equal("2020/04/19");
    
    expect(guest).has.property("id");
    expect(guest.id).to.equal(1);
    
    expect(guest).has.property("name");
    expect(guest.name).to.equal("Leatha Ullrich");
    
    expect(guest).has.property("type");
    expect(guest.type).to.equal("guest");

  });

  it('Can have any date, id, name and type property', function() {
    
    const guest2 = new Guest(sampleUsers[1], "2022/01/01");
      console.log('guest2 @Guest-test: ', guest2);
    const guest3 = new Guest(sampleUsers[2], "2019/02/14");
      console.log('guest3 @Guest-test: ', guest3);

    expect(guest2).has.property("date");
    expect(guest2.date).to.equal("2022/01/01");
    
    expect(guest2).has.property("id");
    expect(guest2.id).to.equal(2);
    
    expect(guest2).has.property("name");
    expect(guest2.name).to.equal("Rocio Schuster");
    
    expect(guest2).has.property("type");
    expect(guest2.type).to.equal("guest");

    expect(guest3).has.property("date");
    expect(guest3.date).to.equal("2019/02/14");
    
    expect(guest3).has.property("id");
    expect(guest3.id).to.equal(3);
    
    expect(guest3).has.property("name");
    expect(guest3.name).to.equal("Kelvin Schiller");
    
    expect(guest3).has.property("type");
    expect(guest3.type).to.equal("guest");
  });

  // CALCULATIONS(hotel, formatDate)
  describe('calculations', function() {

    const calculatedGuest = guest.calculations(hotelData, formatDate);
      // console.log('calculatedGuest: ', calculatedGuest);

    it('should return a guest with a property of "sortedBookings"', function() {
      expect(calculatedGuest).has.property("sortedBookings");
    });

    it('should return a guest with a property of "amountSpent"', function() {
      expect(calculatedGuest).has.property("amountSpent");
    });
  });

  /*
  // sortCHRONICALLY(data, formatDate)
  describe('sortChronically', function() {
    
    data = hotelData.findBookings("userID", guest.id);
    const chronicalData = guest.sortChronically(data, formatDate);

    it('should return an array of objects', function() {
      expect(chronicalData).to.be.an("array");
      expect(chronicalData[0]).to.be.an("object");
    });

    it('should contain the same amount of data as the data argument', function() {
      expect(chronicalData.length).to.equal(data.length);
    });
  });

  // SORTbyDATE(userData, formatDate)
  describe('sortByDate', function() {
 
    data = guest.sortChronically(data, formatDate);
    const sortedData = guest.sortByDate(data, formatDate);
      console.log(sortedData[0].name, ": ", sortedData[0].data);
      console.log(sortedData[1].name, ": ", sortedData[1].data);

    it('should return an array of objects', function() {
      expect(sortedData).to.be.an("array");
      expect(sortedData[0]).to.be.an("object");
    });

    it('should contain the same amount of data as the data argument', function() {
      let dataSum = sortedData[0].data.length + sortedData[1].data.length;
      expect(dataSum).to.equal(data.length);
    });
  });

  */
});

