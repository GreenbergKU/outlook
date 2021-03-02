class Guest {
  // constructor(data) {
      //console.log(name);
  //   this.id = data.id;
  //   this.name = data.guestName;

  //   this.bookings = data.guestBookings;
  //   //console.log('this.bookings: ', this.bookings);
  //   this.ammountSpent = data.ammountSpent;
  //   this.availableRooms;

  //   this.totalUsers = data.totalUsers;
  //   this.totalRooms = data.totalRooms;
  // };

  constructor(data, hotelData) {
    //console.log(name);
    this.id = data.id;
    this.name = data.name;
    this.date;

    this.bookings; //= data.guestBookings;
    
    this.ammountSpent; //= data.ammountSpent;
    this.availableRooms;

    this.totalUsers = hotelData.totalUsers;
    this.totalRooms = hotelData.totalRooms;
  };
  

}


export default Guest