import chai from 'chai';
const expect = chai.expect;

import HotelData from "../src/class/data/HotelData.js";
import sampleBookings from "./testData/bookings-sample.js";
import sampleRooms from "./testData/rooms-sample.js";
import sampleUsers from "./testData/users-sample.js";

describe('HotelData', function() {
  let guest; // data, user, user2;
  
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
    //data = {id: 1, name: "Sue"};
    expect(hotelData).to.be.an.instanceOf(HotelData);
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
  describe('findDataByProperty', function() {
    it('should be a function', function() {
      //execution;
      expect(hotelData.findDataByProperty).to.be.a("function");
    });
  });

  describe('findRoom', function() {
    it('should be a function', function() {
      //execution;
      expect(hotelData.findRoom).to.be.a("function");
    });
  });

  describe('findAvailableRooms', function() {
    it('should be a function', function() {
      //execution;
      expect(hotelData.findAvailableRooms).to.be.a("function");
    });
  });

  describe('findBookings', function() {
    it('should be a function', function() {
      //execution;
      expect(hotelData.findBookings).to.be.a("function");
    });
  });  

  describe('sortByDate', function() {
    it('should be a function', function() {
      //execution;
      expect(hotelData.sortByDate).to.be.a("function");
    });
  });

  describe('calculateAmountTotals', function() {
    it('should be a function', function() {
      //execution;
      expect(hotelData.calculateAmountTotals).to.be.a("function");
    });
  });

  describe('calculatePercentage', function() {
    it('should be a function', function() {
      //execution;
      expect(hotelData.calculatePercentage).to.be.a("function");
    });
  });

});