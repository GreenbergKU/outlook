// import fetchedData from './fetchedData.js';
// import UsersData from './UsersData.js';
//import GuestsData from './data/GuestsData.js';
// import BookingsData from './BookingsData.js';
// import RoomsData from './RoomsData.js';

class HotelData {
  constructor(data) {
    // console.log('data @HotelData: ', data);

    this.usersData = data ? data.usersData : [];
      // console.log('this.usersData: ', this.usersData);  
    this.bookingsData = data ? data.bookingsData : [];
      // console.log('this.bookingsData: ', this.bookingsData);   
    this.roomsData = data ? data.roomsData : [];
      // console.log('this.roomsData: ', this.roomsData);
    this.totalUsers = this.usersData.length;
      //console.log('this.totalUsers: ', this.totalUsers);
    this.totalRooms = this.roomsData.length;
      //console.log('this.totalRooms: ', this.totalRooms);
  };

  // findGuestByProperty(property, value) {
  //   return this.findDataByProperty("usersData", property, value)[0];
  // };

  findDataByProperty(dataSet, property, value) {
    return this[dataSet].filter(data => data[property] === value);
  };

  findBookings(property, value, fnDate) {//*global
    let bookings = this.findDataByProperty("bookingsData", property, value);
      //console.log('@HotelData bookings.length: ', bookings.length);
    
    bookings = bookings.map(booking => {
      booking.room = this.findDataByProperty("roomsData", "number", booking.roomNumber)[0];
      return booking
    })
    .sort( (a, b) => fnDate(b.date, "sort") - fnDate(a.date, "sort") );
      
      //console.log('@HotelData bookings.length: ', bookings.length);
    return bookings
    
    // let roomNum;
    //// const findRoom = (roomNum) => this.findDataByProperty("roomsData", "number", roomNum)[0];
    // const sortChronically = (data) => {
    //   return data.sort( (a, b) => fnDate(b.date, "sort") - fnDate(a.date, "sort") )
    // };
    // const bookings = this.indDataByProperty("bookingsData", property, value);
    // bookings.map(booking => {
    //   roomNum = booking.roomNumber;
    //   booking.room = this.findDataByProperty("roomsData", "number", roomNum)[0];
    //   return booking
    // });
    //// return sortChronically(bookings)
    // return bookings.sort( (a, b) => fnDate(b.date, "sort") - fnDate(a.date, "sort") );
  };

  // findRoom(roomNum) {//*global
  //   return this.findDataByProperty("roomsData", "number", roomNum)[0];
  // };

  sortByDate(data, date, fnDate) {
    let pastBookings = [], upcomingBookings = [];
    const sortDate = fnDate(date, "sort");
    data.map(booking => {
      fnDate(booking.date, "sort") <= sortDate ? pastBookings.push(booking) : upcomingBookings.push(booking);  
    }); 
    return [{name: "upcoming-bookings", data: upcomingBookings}, {name: "past-bookings", data: pastBookings}];
  };

  findAvailableRooms(bookedRooms) {
      // console.log('bookedRooms.length: ', bookedRooms.length);
    let rooms = this.roomsData.slice(); //rooms = this.roomsData.slice();
      // console.log('rooms.length: ', rooms.length);  
    bookedRooms.map(bookedRoom => rooms.splice(rooms.findIndex(room => room.number === bookedRoom.roomNumber), 1));
      // console.log('rooms.length: ', rooms.length); 
      // console.log('this.roomsData.length: ', this.roomsData.length);
    return rooms;
  };

  calculateAmountTotals(bookings) {
    const USD = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }); 
    let sum = 0;
    bookings.map(booking => sum += booking.room.costPerNight);
    return USD.format(sum);  
      // const room = this.findDataByProperty("roomsData", "number", parseInt(booking.roomNumber));
      // sum += room[0].costPerNight;  
  };

  calculatePercentage(num) {
    const percent = new Intl.NumberFormat('en-US' , {
      style: 'percent'
    });
    //const isNum = typeof(num) === "number";
    if(typeof(num) === "number") return percent.format(num / this.totalRooms);
  };



  // validateUser(user) {
  //   let isValid = false, found;
  //     console.log('user.password && user.password != "overlook2020": ', user.password && user.password != "overlook2020");
  //   if (user.password && user.password.toLowerCase() != "overlook2020") {
  //       console.log('user.password: ', user.password);
  //     alert("invalid password!");
  //     return isValid;
  //   };
  //     console.log('user.username && user.username === "manager": ', user.username && user.username === "manager"); 
  //   if (user.username && user.username.toLowerCase() === "manager") return isValid = true;  
  //   if (user.fullName && user.fullName.split(" ").length != 2) {
  //       console.log("user.fullName: ", user.fullName);
  //     alert("First and last name is required!")
  //     return isValid;
  //   };
  //   if (user.fullName) {
  //       console.log("user.fullName: ", user.fullName);
  //     found = this.usersData.find(userData => userData.name === user.fullName);
  //     return !found ? alert("user not found, check spelling and try again!") : isValid = true;
  //   };
  //   if (user.id && typeof(user.id) === "number") {
  //     found = this.usersData.find(userData => userData.id === user.id);
  //       console.log('found: ', found);
  //     return !found ? alert("invalid username!") : isValid = true;
  //   } else alert("invalid login");
  //   return isValid;
  // }


  
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