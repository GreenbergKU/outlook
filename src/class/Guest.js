const dayjs = require('dayjs');
//import dayjs from 'dayjs' // ES 2015
dayjs().format();

class Guest {
  constructor(data, date) {
    // console.log("data@guest: ", data);
    this.id = data.id;
    this.name = data.name;
    
    this.type = "guest";
    this.date = date;

    this.btnChildText = "new-reservation";
    this.searchBtn = "find rooms";
    
    this.labelInput = "date";
    this.placeHolder = "YY/MM/DD";

    this.totalUsers; //= user.totalUsers;
    this.totalRooms; //= user.totalRooms;

    this.bookings = []; //= user.guestBookings;
    
    this.sortedBookings = [];

    this.amountSpent; //= data.ammountSpent;
    this.availableRooms;
    this.filters;
  };

  sortByDate(userData, formatDate) {
      // console.log('userData @Guest.sortByDate(): ', userData);
    let pastBookings = [], upcomingBookings = [];
    const currDate = new dayjs().format("YYYYMMDD");
      // console.log('currDate @sortByDate(userData): ', currDate);

    const date = this.date ? formatDate(this.date, "sort") : currDate;
      // console.log('date @ sortByDate: ', date);
    userData.map(booking => {
      formatDate(dayjs(booking.date),"sort") <= date ? pastBookings.push(booking) : upcomingBookings.push(booking);  
    }); 

    this.sortedBookings.push({ name: "upcoming-bookings", data: upcomingBookings}, {name: "past-bookings", data: pastBookings});
      // console.log('this @Guest.sortByDate: ', this);
    //this.sortedBookings.upcomingBookings = upcomingBookings;
    //this.sortedBookings.pastBookings = pastBookings; 
    return this.sortedBookings
  };

  sortChronically(data, formatDate) {
      // console.log('formatDate: ', formatDate);
    //return data.sort( (a,b) => dayjs(a.date).format("YYYYMMDD") - dayjs(b.date).format("YYYYMMDD") );
    return data.sort( (a,b) => formatDate(a.date, "sort") - formatDate(b.date, "sort") )
  }

  addData(property, value) {
      // console.log('this: ', this);
      // console.log('property: ', property);
      // console.log('value: ', value);
    this[property] = value;
    return this
  }

  filterData(data, property, value) {
    this.availableRooms = data.filter(obj => obj[property] === value);
      // console.log('this.availableRooms @GUEST.filterData(): ', this.availableRooms);
    return this.availableRooms
  }

  getBookingID() {
    return this.id
  };
   
  // sayMyName() {
  //     // console.log("NAME: ", this.name, "TYPE: ", this.type)
  //   return this.name;
  // }

    //this.searchDate;
      
    // { name: "upcoming-bookings",
    //   data
    // },
    // {
    //   name: "past-bookings",
    //   data: []
    // }

    //  //this.roomsBooked = {};

    // this.sortedBookings.pastBookings = [];
    // this.sortedBookings.pastBookings = [];
    //     name: 
    //   }
    //   {"upcomingBookings" : upcomingBookings}
    // };

    //this.pastBookings = [],
    //this.upcomingBookings = [];

        //this.pastBookings = [];
    //this.upcomingBookings = [];
    // this.sortedBookings = {
    //     "upcoming-bookings" : [],

    //     "past-bookings" : [],
    //   // "upcoming-bookings": this.upcomingBookings,
    //   // "past-bookings": this.pastBookings
    // }

  // createSortedBookings  
  //   this.sortedBookings.push(
  //     this.upcomingBookings,
  //     this.pastBookings
  //   );
  //   // console.log('this.bookings: ', this.bookings);
  //   //this.sortedBookings 
  //   //return confirmedBookings;
  // };
    
    /*
    // console.log("bookings after gst.sortByDate()", bookings);
    //// console.log('this.upcomingBookings: ', this.upcomingBookings);
    //const sortedBookings = {};
    const pastBookings = {"past-bookings": past};
    const upcomingBookings = {"upcoming-bookings": future}
      // console.log('sortedBookings: ', sortedBookings);
    */
    // this.bookings = {
    //   bookings: data,
    //   "upcoming-bookings": future,
    //   "past-bookings": past
    // };


  // addRoomDetails(data, dataStr, roomData) {
  //   this.rooms.upcoming = [];
  //   this.rooms.past = [];
  //   dataStr === "upcoming" ? this.rooms.upcoming.push(roomData) : this.rooms.past.push(roomData);
  //   return this.rooms
  // };





  // defineBtn() {
  //   return this.btnName
  // }

  // calculateData(data) {
  //   this.bookings = this.findGuestBookings(data);
  //   this.amountSpent = this.calculateAmountTotals(this.bookings);
  //   return this
  // }

  // findGuestBooking(property, value) {
  //   //return this.guestBookings = this.bookingsData.findBookingsByProperty("userID", this.id);
  //   return this.bookings.findBookingsByProperty("userID", id);
  // }
 
  // calculateAmountTotals(filteredBookings) {
  //   let sum = 0;
    
  //   filteredBookings.map(booking => {
  //     sum += this.roomsData.findRoomsByProperty("number", booking.roomNumber)[0].costPerNight;
  //   });
  //   return Math.round(sum);  
  // };

}


export default Guest