import chai from 'chai';
const expect = chai.expect;

import HotelData from "../src/class/data/HotelData.js";
import sampleBookings from "./testData/bookings-sample.js";
import sampleRooms from "./testData/rooms-sample.js";
import sampleUsers from "./testData/users-sample.js";

describe('HotelData', function() {
  let guestData, bookings; // user, user2;
  
  function formatDate(date, style) {
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

  const date = "2021/05/20";
  //guest = new HotelData({id: 1, name: "Sue"}, date);

  it('should be a function', function() {
    expect(HotelData).to.be.a("function");
  });

  it('should be an instance of HotelData', function() {
    expect(hotelData).to.be.an.instanceOf(HotelData);
  });

  it('Should have a "usersData", "bookingsData", "roomsData", "totalUsers", and "totalRooms" property', function() {
    //hotelData = new hotelData({id: 1, name: "Sue"}, "2021/05/03");
    const hasUsersData = hotelData.usersData ? true : false;
    expect(hasUsersData).to.equal(true);
    
    const hasBookingsData = hotelData.bookingsData ? true : false;
    expect(hasBookingsData).to.equal(true);
    
    const hasRoomsData = hotelData.roomsData ? true : false;
    expect(hasRoomsData).to.equal(true);
    
    const hasTotalUsers = hotelData.totalUsers ? true : false;
    expect(hasTotalUsers).to.equal(true);
    
    const hasTotalRooms = hotelData.totalRooms ? true : false;
    expect(hasTotalRooms).to.equal(true);
  });

  it('Should not require an argument to create a new hotelData', function() {
    expect( () => new HotelData() ).to.not.throw(Error);
  });

  it('Should have empty array property values for data if no arguement is given for the hotelData', function() {
    const noArguments = new HotelData();
    expect(noArguments.usersData.length).to.equal(0);
  });

  it('Should have property values equalling 0 for any property value that includes length if no arguement is given for the hotelData', function() {
    const noArguments = new HotelData();
    expect(noArguments.totalUsers).to.equal(0);
    expect(noArguments.totalRooms).to.equal(0);
  });

  describe('findDataByProperty', function() {
    it('should be a function', function() {
      expect(hotelData.findDataByProperty).to.be.a("function");
    });
    
    it('should return an array of objects, each with an "id" and "name" property', function() {
      
      const userData = hotelData.findDataByProperty("usersData", "id", 1);
      guestData = userData[0];
      const hasID = guestData.id ? true : false;
      const hasName = guestData.name ? true : false;
      
      expect(userData).to.be.an("array");
      expect(guestData).to.be.an("object");
      expect(hasID).to.equal(true);     
      expect(hasName).to.equal(true);
    });
  });

  describe('findBookings', function() {
    bookings = hotelData.findBookings("userID", 1, formatDate);

    it('should be a function', function() {
      expect(hotelData.findBookings).to.be.a("function");
    });

    it('should be an array of "booking" objects', function() {
      expect(bookings).to.be.an("array");
      expect(bookings[0]).to.be.an("object");
    });

    it('contains only booking objects with a userID property of 1', function() {
      const matchID = bookings.map(booking => booking.userID === 1);
      expect(matchID.length).to.equal(bookings.length);
    });

    it('should be in chronological order, according to the date property of each booking', function() {
      const date = (date) => formatDate(date, "sort");
      let inOrder = true;
      let i = bookings.length;
      while(--i) {
        if(date(bookings[i-1].date) > date(bookings[i].date)) inOrder = false;
      };
      expect(inOrder).to.equal(true);
    });
  });

  describe('sortByDate', function() {
    it('should be a function', function() {
      expect(hotelData.sortByDate).to.be.a("function");
    });
  });

  describe('findAvailableRooms', function() {
    it('should be a function', function() {
      expect(hotelData.findAvailableRooms).to.be.a("function");
    });
  });

  describe('calculateAmountTotals', function() {
    it('should be a function', function() {
      expect(hotelData.calculateAmountTotals).to.be.a("function");
    });
  });

  describe('calculatePercentage', function() {
    it('should be a function', function() {
      expect(hotelData.calculatePercentage).to.be.a("function");
    });
  });

});