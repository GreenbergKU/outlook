class Guest {
  constructor(data, date) {
    this.date = date;
    this.id = data ? data.id : undefined;
    this.name = data ? data.name : "";
    this.type = "guest";
  };

  calculations(hotel, dateFn) {
    // const USD = new Intl.NumberFormat('en-US', { 
    //   style: 'currency', 
    //   currency: 'USD' 
    // });
    const bookings = hotel.findBookings("userID", this.id, dateFn);
    //this.bookings = this.sortChronically(bookings, dateFn);
    this.sortedBookings = hotel.sortByDate(bookings, this.date, dateFn);
    //this.amountSpent = USD.format(hotel.calculateAmountTotals(this.bookings));
    this.amountSpent = hotel.calculateAmountTotals(bookings);
    //displayBookings(this);
    return this;
  };

  //<<<<<<< HEAD
  // sortChronically(data, formatDate) {
  //   return data.sort( (a, b) => formatDate(b.date, "sort") - formatDate(a.date, "sort") )
  // };

  // sortByDate(userData, formatDate) {
  //   let pastBookings = [], upcomingBookings = [];
  //   const sortDate = formatDate(this.date, "sort");
  //   userData.map(booking => {
  //     formatDate(booking.date, "sort") <= sortDate ? pastBookings.push(booking) : upcomingBookings.push(booking);  
  //   }); 
  //   return [{name: "upcoming-bookings", data: upcomingBookings}, {name: "past-bookings", data: pastBookings}];
  // };


  //=======
  // sortByDate(userData, formatDate) {
  //   let pastBookings = [], upcomingBookings = [];
  //   const date = formatDate(this.date, "sort");
  //   userData.map(booking => {
  //     formatDate(booking.date, "sort") <= date ? pastBookings.push(booking) : upcomingBookings.push(booking);  
  //   }); 
  //   return [{name: "upcoming-bookings", data: upcomingBookings}, {name: "past-bookings", data: pastBookings}];
  // };

  // sortChronically(data, formatDate) {
  //   return data.sort( (a, b) => formatDate(a.date, "sort") - formatDate(b.date, "sort") )
  // };
  //>>>>>>> Testing-HotelData-sw

};


export default Guest;

// NOTES

  // this.btnChildText = "new-reservation";
  // this.searchBtn = "find rooms";
  
  // this.labelInput = "date";
  // this.placeHolder = "YY/MM/DD";

  // this.totalUsers;
  // this.totalRooms; 

  // this.availableRooms;

  // addData(property, value) {
  //     // console.log('this: ', this);
  //     // console.log('property: ', property);
  //     // console.log('value: ', value);
  //   this[property] = value;
  //   return this
  // }

  // filterData(data, property, value) {
  //   this.availableRooms = data.filter(obj => obj[property] === value);
  //     // console.log('this.availableRooms @GUEST.filterData(): ', this.availableRooms);
  //   return this.availableRooms
  // }

  // getBookingID() {
  //   return this.id
  // };
   
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
    
    // console.log("bookings after gst.sortByDate()", bookings);
    // console.log('this.upcomingBookings: ', this.upcomingBookings);
  //const sortedBookings = {};
  //const pastBookings = {"past-bookings": past};
  //const upcomingBookings = {"upcoming-bookings": future}
    // console.log('sortedBookings: ', sortedBookings);

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

