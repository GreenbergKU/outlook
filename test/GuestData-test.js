import chai from 'chai';
const expect = chai.expect;

import fetchedData from '../src/fetchedData.js';
// import ClassName from '../src/class/data/.js';
import GuestData from '../src/class/data/GuestData.js';

import Hotel from '../src/class/Hotel.js'
import User from '../src/class/User.js';
import Guest from '../src/class/Guest.js';

let hotelData;


//console.log('fetchedData: ', fetchedData);
 

describe.only('GuestData', function() {
  
  const userGuest = new User("guest", "overlook2020");  
  const hotelData = new Hotel(fetchedData.users, fetchedData.bookings, fetchedData.rooms);
  const guestData = new GuestData(hotelData.usersData, hotelData.bookingsData, hotelData.roomsData);
  let guest;

  it('should be a function', function() {
    expect(GuestData).to.be.a("function");
  });

  it('should instantiate GuestData', function() {
    expect(guestData).to.be.an.instanceof(GuestData);
  });

  // it('should have a property of "usersData"', function() {  
  //   expect(guestData).to.haveOwnProperty("usersData");
  // });
  
  // it('should have a data property of an array', function() { 
  //   const dataGuests = guestData.data; 
  //   expect(dataGuests).to.be.an("array");
  //   expect(dataGuests.length).to.equal(2);
  // });

  // it('should have a data property that is an array of objects with defined properties', function() {
  //   const guest = guestData.data[0];
    
  //   expect(guest).to.be.an("object");
  //   expect(guest).to.haveOwnProperty("id", 1);
  //   expect(guest).to.haveOwnProperty("name", "Leatha Ullrich");
  // });

  // describe('countGuests', function() {
    
  //   it('should be a function', function() {
  //     expect(guestData.countGuests).to.be.a("function");
  //   });

  //   it('should return the number of total rooms', function() {
  //     const totalGuests = guestData.countGuests();
  //     expect(totalGuests).to.equal(2);
  //   });
  //});

});