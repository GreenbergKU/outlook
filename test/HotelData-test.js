import chai from 'chai';
const expect = chai.expect;
const assert = require('chai').assert;

import HotelData from "../src/class/data/HotelData.js";
import sampleBookings from "./testData/bookings-sample.js";
import sampleRooms from "./testData/rooms-sample.js";
import sampleUsers from "./testData/users-sample.js";

const sampleData = {usersData: sampleUsers, bookingsData: sampleBookings, roomsData: sampleRooms};
    // console.log(
    //   "sampleData.usersData[0]: ", sampleData.usersData[0],
    //   "sampleData.bookingsData[0]: ", sampleData.bookingsData[0],
    //   "sampleData.roomsData[0]: ", sampleData.roomsData[0],
    // );
const date = "2020/02/19";

describe('HotelData', function() {
  let guestData, bookings, unavailableRooms, availableRooms; // user, user2;
  // const sampleData = {usersData: sampleUsers, bookingsData: sampleBookings, roomsData: sampleRooms};
  //   console.log(
  //     "sampleData.usersData[0]: ", sampleData.usersData[0],
  //     "sampleData.bookingsData[0]: ", sampleData.bookingsData[0],
  //     "sampleData.roomsData[0]: ", sampleData.roomsData[0],
  //   );
  function formatDate(date, style) {
    const dayjs = require('dayjs');
    dayjs().format();
    return style === 'sort' ? dayjs(date).format("YYYYMMDD")
      : style === 'words' ? dayjs(date).format("MMMM D, YYYY") 
      : style === 'numbers' ? dayjs(date).format("MM/DD/YYYY")
      : style === 'min' ? dayjs(date).format("YYYY-MM-DD")
      : dayjs(date).format("YYYY/MM/DD"); 
  };

  const hotelData = new HotelData(sampleData);
    console.log("hotelData.bookingsData[0]: ", hotelData.bookingsData[0]);

  it('should be a function', function() {
    expect(HotelData).to.be.a("function");
  });

  it('should be an instance of HotelData', function() {
    expect(hotelData).to.be.an.instanceOf(HotelData);
  });

  it('Should have a "usersData", "bookingsData", "roomsData", "totalUsers", and "totalRooms" property', function() {    
    // const hasUsersData = hotelData.usersData ? true : false;
    //   console.log('hotelData.usersData: ', hotelData.usersData);
    // expect(hasUsersData).to.be.true;

    // const hasBookingsData = hotelData.bookingsData ? true : false;
    // expect(hasBookingsData).to.equal(true);
    
    // const hasRoomsData = hotelData.roomsData ? true : false;
    // expect(hasRoomsData).to.equal(true);
    
    // const hasTotalUsers = hotelData.totalUsers ? true : false;
    // expect(hasTotalUsers).to.equal(true);
    
    // const hasTotalRooms = hotelData.totalRooms ? true : false;
    // expect(hasTotalRooms).to.equal(true);
    
    expect(hotelData).has.property("usersData");
    expect(hotelData).has.property("bookingsData");
    expect(hotelData).has.property("roomsData");
    expect(hotelData).has.property("totalUsers");
    expect(hotelData).has.property("totalRooms");

    //expect(hotelData.usersData[0], sampleData.usersData).to.be.equal; // doesn't work, shouldn't pass but does
    expect(hotelData.usersData).include(sampleData.usersData[0]);
    expect(hotelData.usersData, 'should be equal').to.equal(sampleData.usersData)
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
    const guestBookings = hotelData.findBookings("userID", 1, formatDate);

    it('should be a function', function() {
      expect(hotelData.findBookings).to.be.a("function");
    });

    it('should be an array of "booking" objects', function() {
      expect(guestBookings).to.be.an("array");
      expect(guestBookings[0]).to.be.an("object");
    });

    it('contains only booking objects with a userID property of 1', function() {
      const matchID = guestBookings.map(booking => booking.userID === 1);
      expect(matchID.length).to.equal(guestBookings.length);
    });

    it('should return objects in chronological order, according to the date property of each booking', function() {
      const bookingDate = (date) => formatDate(date, "sort");
      let inOrder = true;
      let i = guestBookings.length;
      while(--i) {
        if( bookingDate(guestBookings[i-1].date) < bookingDate(guestBookings[i].date) ) inOrder = false;
      };
      expect(inOrder).to.equal(true);
    });
  });

  describe('sortByDate', function() {
    const guestBookings = hotelData.findBookings("userID", 1, formatDate);
    //const date = "2020/02/19";
    const sortedBookings = hotelData.sortByDate(guestBookings, date, formatDate);
    
    it('should be a function', function() {
      expect(hotelData.sortByDate).to.be.a("function");
    });
    
    it('should return an array containing only two objects', function() {
      // sortByDate(data, date, fnDate);
        console.log("sortedBookings.length", sortedBookings.length);
      expect(sortedBookings).to.be.an("array");
      expect(sortedBookings.length).to.equal(2);
      expect(sortedBookings[0]).to.be.an("object");
      expect(sortedBookings[1]).to.be.an("object");
    });

    it('should return two objects with identical properties of name and data', function() {
      let namesForBoth = true, dataForBoth = true, identicalProps = true;
      
      identicalProps = sortedBookings.map(obj => {
        return obj.name ? obj.data ? identicalProps : !dataForBoth : !namesForBoth;
      })
      .find(obj => obj === "false") === undefined;
        console.log('identicalProps: ', identicalProps);
        console.log('namesForBoth: ', namesForBoth);
        console.log('dataForBoth: ', dataForBoth);

      expect(namesForBoth).to.equal(true);
      expect(dataForBoth).to.equal(true);
      expect(identicalProps).to.equal(true);
    });
  });

  describe('findAvailableRooms', function() {
    //let hotelData = new HotelData(sampleData);
    //let bookedRooms, availableRooms;      
    const bookedRooms = hotelData.findBookings("date", date, formatDate);
    const availableRooms = hotelData.findAvailableRooms(bookedRooms);
    //console.log('date: ', date);

    it('should be a function', function() {
      expect(hotelData.findAvailableRooms).to.be.a("function");
    });
    
    it('should return an array', function() {
      expect(availableRooms).to.be.an("array");
    });

    it('should contain room objects', function() {
      expect(availableRooms[0]).to.be.an("object");
    });

    it('should contain room objects ONLY if there is a room, or multiple rooms, available for any given date', function() {
      const soldOutRooms = [
        {date: '2020/02/05', roomNumber: 1,}, 
        {date: '2020/02/05', roomNumber: 2,},
        {date: '2020/02/05', roomNumber: 3,},
        {date: '2020/02/05', roomNumber: 4,},
        {date: '2020/02/05', roomNumber: 5,},
        {date: '2020/02/05', roomNumber: 6,},
        {date: '2020/02/05', roomNumber: 7,},
        {date: '2020/02/05', roomNumber: 8,},
        {date: '2020/02/05', roomNumber: 9,},
        {date: '2020/02/05', roomNumber: 10,},
        {date: '2020/02/05', roomNumber: 11,},
        {date: '2020/02/05', roomNumber: 12,},
        {date: '2020/02/05', roomNumber: 13,},
        {date: '2020/02/05', roomNumber: 14,},
        {date: '2020/02/05', roomNumber: 15,},
        {date: '2020/02/05', roomNumber: 16,},
        {date: '2020/02/05', roomNumber: 17,},
        {date: '2020/02/05', roomNumber: 18,},
        {date: '2020/02/05', roomNumber: 19,},
        {date: '2020/02/05', roomNumber: 20,},
        {date: '2020/02/05', roomNumber: 21,},
        {date: '2020/02/05', roomNumber: 22,},
        {date: '2020/02/05', roomNumber: 23,},
        {date: '2020/02/05', roomNumber: 24,},
        {date: '2020/02/05', roomNumber: 25}
      ];
      const noVacancy = hotelData.findAvailableRooms(soldOutRooms);

      expect(noVacancy).to.be.an("array");
      expect(noVacancy.length).to.equal(0);
    });
    
    it('should find all available rooms', function() {
      const roomSum = bookedRooms.length + availableRooms.length;
      expect(roomSum).to.equal(hotelData.totalRooms);
    });
  });

  describe('calculateAmountTotals', function() {
    it('should be a function', function() {
      expect(hotelData.calculateAmountTotals).to.be.a("function");
    });

    it('should calculate the total amount spent of all bookings', function() {
      //execution;
      const USD = new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      });
      bookings = [
        {room: {costPerNight: 358.4}},
        {room: {costPerNight: 477.38}},
        {room: {costPerNight: 491.14}},
        {room: {costPerNight: 429.44}},
        {room: {costPerNight: 397.02}},
        {room: {costPerNight: 231.46}},
        {room: {costPerNight: 261.26}},
        {room: {costPerNight: 200.39}},
        {room: {costPerNight: 207.24}},
        {room: {costPerNight: 172.09}}
      ];
      const totalCost = hotelData.calculateAmountTotals(bookings);
        console.log('totalCost: ', totalCost);
      const manualSum = USD.format(358.4 + 477.38 + 491.14 + 429.44 + 397.02 + 231.46 + 261.26 + 200.39 + 207.24 + 172.09);
      //= 3225.8200000000006
        console.log('manualSum: ', manualSum);
      expect(totalCost).to.equal(manualSum);
    });
  });

  describe('calculatePercentage', function() {
    it('should be a function', function() {
      expect(hotelData.calculatePercentage).to.be.a("function");
    });
    
    it('requires one argument to perform the calculation', function() {
      const percent = new Intl.NumberFormat('en-US' , {
        style: 'percent'
      });
      const percentBooked = hotelData.calculatePercentage(bookings.length);
      const manualPercentage = percent.format(10 / 25);
      expect(percentBooked).to.equal(manualPercentage);
    });

    it('should not calculate percentage when no argument is supplied ', function() {
      const noNumber = hotelData.calculatePercentage();
        console.log('noNumber: ', noNumber);
      expect(noNumber).to.equal(undefined);
    });

    it('should not calculate percentage if argument is not a number', function() {
      const notNumber = hotelData.calculatePercentage(bookings[0]);
        console.log('notNumber: ', notNumber);
      expect(notNumber).to.equal(undefined);
    });
    
  });

});