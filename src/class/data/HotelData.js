// import fetchedData from './fetchedData.js';
// import UsersData from './UsersData.js';
//import GuestsData from './data/GuestsData.js';
// import BookingsData from './BookingsData.js';
// import RoomsData from './RoomsData.js';


class HotelData {

  constructor(data) {
    console.log('data @HotelData: ', data);

    this.usersData = data.usersData;
      console.log('this.usersData: ', this.usersData);
    
    this.bookingsData = data.bookingsData;
      console.log('this.bookingsData: ', this.bookingsData);
    
    this.roomsData = data.roomsData;
      console.log('this.roomsData: ', this.roomsData);

    this.totalUsers = this.usersData.length;
    this.totalRooms = this.roomsData.length;
  };

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
    if (user.fullName && user.fullName.split(" ").length != 2) {
        console.log("user.fullName: ", user.fullName);
      alert("First and last name is required!")
      return isValid;
    };
    if (user.fullName) {
        console.log("user.fullName: ", user.fullName);
      found = this.usersData.find(userData => userData.name === user.fullName);
      return !found ? alert("user not found, check spelling and try again!") : isValid = true;
    };
    if (user.id && typeof(user.id) === "number") {
      found = this.usersData.find(userData => userData.id === user.id);
        console.log('found: ', found);
      return !found ? alert("invalid username!") : isValid = true;
    } else alert("invalid login");
    return isValid;
  }

  findGuestByProperty(property, value) {
    // return this.usersData.findUserByProperty(property, value)[0];
    return this.findDataByProperty("usersData", property, value)[0];
  }

  calculateAmountTotals(data) {    
    let sum = 0;
    data.map(booking => {
      const room = this.findDataByProperty("roomsData", "number", parseInt(booking.roomNumber));
      sum += room[0].costPerNight;
    });
    return sum;  
  }

  calculatePercentage(num, total) {
    return num / total;
  }
  // findBoookings(user, "date") {
  //   hotelRepo.findDataByProperty("bookingsData", "date", manager.date); 
  // }

  // findCustomizedData(userData, property, value) {
  //   return userData.filter(data => data[property] === value);
  // }
 // //   // return this.bookingsData.findBookingsByProperty(property, value);
  // //   //return alert("changed to findDataByProperty(dataSet, property, value)")
  // //   return user.id ? this.findDataByProperty("bookingsData", property, user.id) :
  // //   this.findDataByProperty("bookingsData", property, user[property]); 

  // findRoom(property, value) {
  //   // return this.roomsData.findRoomsByProperty(property, value);
  //   return alert("changed to findDataByProperty(dataSet, property, value)")
  // }

  findAvailableRooms(bookedRooms) {    
    const allRooms = this.roomsData;    
    bookedRooms.map(bookedRoom => allRooms.splice(allRooms.findIndex(room => room.number === bookedRoom.number)), 1);
    return allRooms
  }

  findDataByProperty(dataSet, property, value) {
    return this[dataSet].filter(data => data[property] === value);
  }
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