// import fetchedData from './fetchedData.js';
import UsersData from './UsersData.js';
//import GuestsData from './data/GuestsData.js';
import BookingsData from './BookingsData.js';
import RoomsData from './RoomsData.js';


class HotelData {
  
  constructor(data) {
    console.log('data @HotelData: ', data);

    this.usersData = new UsersData(data.users);
    console.log('this.usersData: ', this.usersData);
    
    this.bookingsData = new BookingsData(data.bookings);
    console.log('this.bookingsData: ', this.bookingsData);
    
    this.roomsData = new RoomsData(data.rooms);
    console.log('this.roomsData: ', this.roomsData);
    
    // this.date;
  
    this.totalUsers = this.usersData.data.length;
    this.totalRooms = this.roomsData.data.length;
  };


  findGuestByProperty(property, value) {
    return this.usersData.findUserByProperty(property, value)[0];
  }

  calculateAmountTotals(data) {
    console.log('data @calculateAmountTotals: ', data);

    let sum = 0;

    data.map(booking => {
      sum += this.roomsData.findRoomsByProperty("number", booking.roomNumber)[0].costPerNight;
    });
    return sum;  
  };

  calculatePercentage(total, num) {
    return total / num;
  }

  findBookings(property, value) {
    return this.bookingsData.findBookingsByProperty(property, value);
  }

  findRoom(property, value) {
    return this.roomsData.findRoomsByProperty(property, value);
  }

  findAvailableRooms(bookedRooms) {
    console.log('bookedRooms: ', bookedRooms);
    const allRooms = this.roomsData.data;
      console.log('allRooms: ', allRooms);

    bookedRooms.map(bookedRoom => allRooms.splice(allRooms.findIndex(room => room.number === bookedRoom.number)), 1);
    return allRooms
  };

  addTotals() {
      // console.log('this.usersData: ', this.usersData);
    this.totalUsers = this.usersData.data.length;
    this.totalRooms = this.roomsData.data.length;
    return this
  };

  

}

export default HotelData;


  // findGuest(id) {
  //   return this.usersData.findUserByProperty("id", id)[0];
  // };

  // findGuestByName(name) {
  //   return this.usersData.findUserByProperty("name", name)[0];
  // }

  // findGuestBookings(id) {
  //   return this.bookingsData.findBookingsByProperty("userID", id);
  // }