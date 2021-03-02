import UsersData from "./UsersData.js";
import BookingsData from './BookingsData.js';
import RoomsData from './RoomsData.js';

class GuestData {
  constructor(data, id) {
    this.usersData = new UsersData(data.usersData);
    this.bookingsData = new BookingsData(data.bookingsData);
    this.roomsData = new RoomsData(data.roomsData);
    this.id = id;
    this.date;
 
    this.guest; //= this.findGuest;
    
    this.guestBookings;//= this.findGuestBookings();
    this.ammountSpent; //= this.calculateRoomTotals();
    
    this.availableRooms; //= this.findAvailableRooms();

    this.totalUsers = data.totalUsers;
    this.totalRooms = data.totalRooms;
  }

  findGuest() {
    return this.guest = this.usersData.findUserByProperty("id", this.id)[0];
  }

  findGuestBookings() {
    return this.guestBookings = this.bookingsData.findBookingsByProperty("userID", this.id);
  }

  calculateRoomTotals() {
    let sum = 0;
    this.guestBookings.map(booking => {
      sum += this.roomsData.findRoomsByProperty("number", booking.roomNumber)[0].costPerNight;
    });
    return Math.round(sum);  
  };

  findAvailableRooms(date) {
    const bookedRooms = this.bookingsData.findBookingsByProperty("date", date);
    const allRooms = this.roomsData;
    bookedRooms.map(bookedRoom => allRooms.splice(allRooms.findIndex(room => room.number === bookedRoom.number)), 1);
    return allRooms
  };

  // countGuests() {
  //   return this.data.length
  // };
  
  // findGuestsByProperty(property, value) {
  //   return this.data.filter(guest => guest[property] === value)
  // };

}

export default GuestData;