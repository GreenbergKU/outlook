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
  let guest, data, user, user2, noArguments;

  it('should be a function', function() {
    expect(Guest).to.be.a("function");
  });

  it('should be an instance of Guest', function() {
    guest = new Guest(sampleUsers[0], date);
    expect(guest).to.be.an.instanceOf(Guest);
  });

  it('Should not require an argument to create a new guest', function() {
    expect( () => new Guest() ).to.not.throw(Error);
  });

  it('Should be undefined if no arguement is given for the guest', function() {
    const noArguments = new Guest();
    expect(noArguments.id).to.equal(undefined);
  });

  it('Should have a date, id and name property', function() {
    //guest = new Guest({id: 1, name: "Sue"}, "2021/05/03");
    expect(guest.date).to.equal("2020/04/19");
    expect(guest.id).to.equal(1);
    expect(guest.name).to.equal("Leatha Ullrich");
  });

  // CALCULATIONS(hotel, formatDate)
  describe('calculations', function() {
    
    const calculatedGuest = new Guest({id: 1, name: "Leatha Ullrich"}, "2020/01/23")
    .calculations(hotelData, formatDate);
      console.log('calculatedGuest: ', calculatedGuest);

    it('should return a guest with a property of "sortedBookings"', function() {
      const bookingsSorted = calculatedGuest.sortedBookings ? true : false;
      expect(bookingsSorted).to.equal(true);
    });

    it('should return a guest with a property of "amountSpent"', function() {
      const amtSpent = calculatedGuest.amountSpent ? true : false;
      expect(amtSpent).to.equal(true);
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

