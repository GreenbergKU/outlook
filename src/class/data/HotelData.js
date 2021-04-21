// import fetchedData from './fetchedData.js';
import UsersData from './UsersData.js';
//import GuestsData from './data/GuestsData.js';
import BookingsData from './BookingsData.js';
import RoomsData from './RoomsData.js';


class HotelData {
  
  constructor(data) {
     console.log('data @HotelData: ', data);

    this.usersData = new UsersData(data.usersData);
     console.log('this.usersData: ', this.usersData);
    
    this.bookingsData = new BookingsData(data.bookingsData);
     console.log('this.bookingsData: ', this.bookingsData);
    
    this.roomsData = new RoomsData(data.roomsData);
     console.log('this.roomsData: ', this.roomsData);
    
    this.totalUsers = this.usersData.data.length;
    this.totalRooms = this.roomsData.data.length;
  };
  // constructor(data) {
  //   console.log('data @HotelData: ', data);

  //   this.usersData = new UsersData();
  //     console.log('this.usersData: ', this.usersData);
    
  //   this.bookingsData = new BookingsData();
  //     console.log('this.bookingsData: ', this.bookingsData);
    
  //   this.roomsData = new RoomsData();
  //     console.log('this.roomsData: ', this.roomsData);

  //   this.totalUsers = this.usersData.length;
  //   this.totalRooms = this.roomsData.length;
  // };


  findGuestByProperty(property, value) {
    return this.usersData.findUserByProperty(property, value)[0];
  }

  calculateAmountTotals(data) {
     console.log('data @calculateAmountTotals: ', data[0]);

    let sum = 0;
    data.map(booking => {
       console.log('booking: ', booking.roomNumber);
      const room = this.roomsData.findRoomsByProperty("number", parseInt(booking.roomNumber));
      sum += room[0].costPerNight;
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
    // console.log('bookedRooms: ', bookedRooms);
    const allRooms = this.roomsData.data;
      // console.log('allRooms: ', allRooms);

    bookedRooms.map(bookedRoom => allRooms.splice(allRooms.findIndex(room => room.number === bookedRoom.number)), 1);
    return allRooms
  };

  addTotals() {
      // // console.log('this.usersData: ', this.usersData);
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