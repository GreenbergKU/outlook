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

  validateUser(user) {
    let isValid = false, found;
      console.log('user.password && user.password != "overlook2020": ', user.password && user.password != "overlook2020");
    
    if (user.password && user.password.toLowerCase() != "overlook2020") {
        console.log('user.password: ', user.password);
      alert("invalid password!");
      return isValid;
    };
      console.log('user.username && user.username === "manager": ', user.username && user.username === "manager"); 
    
    if (user.username && user.username.toLowerCase() === "manager") return isValid = true;  
      //console.log('typeof(user.id) === "number": ', typeof(user.id) === "number", typeof(user.id), !isNaN(user.id));
    
    if (user.fullName && user.fullName.split(" ").length != 2) {
      //let name = user.fullName;
        console.log("user.fullName: ", user.fullName);
      alert("First and last name is required!")
      return isValid;
    }
    if (user.fullName) {
        console.log("user.fullName: ", user.fullName);
      found = this.usersData.data.find(userData => userData.name === user.fullName);
      return !found ? alert("user not found, check spelling and try again!") : isValid = true;
    }
    if (user.id && typeof(user.id) === "number") {
      found = this.usersData.data.find(userData => userData.id === user.id);
        console.log('found: ', found);
      return !found ? alert("invalid username!") : isValid = true;
    } else alert("invalid form");
    return isValid;
  }

  userValidation(properties) {
    console.log('properties: ', properties);

  }

  findGuestByProperty(property, value) {
    return this.usersData.findUserByProperty(property, value)[0];
  }

  calculateAmountTotals(data) {
     console.log('data @calculateAmountTotals: ', data[0]);

    let sum = 0;
    data.map(booking => {
       // console.log('booking: ', booking.roomNumber);
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