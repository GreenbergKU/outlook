class Manager {
  constructor(data, date) {
    this.name = "Manager";
    this.date = date;
    this.type = "manager";
    this.guestAdmin;

    this.btnChildText = "guest-search";
    this.searchBtn = "find guest";
    
    this.labelInput = "Full Name",
    this.placeHolder = "First Last";

    this.totalUsers = data.totalUsers;
    this.totalRooms = data.totalRooms;
  }

  // percentBooked() {
  //   this.roomsOccupied = this.bookedRooms.length / this.totalRooms * 100;
  //   return this.roomsOccupied
  // };

  // getBookingID() {
  //   return this.guestAdmin.id;
  // };


}

export default Manager;

    //this.roomsAvailable;
  //this.bookedRooms;
  //this.revenue; //= data.ammountSpent;
  //this.roomsOccupied;
  //this.guestAdmin; // Leatha Ullrich;

  
  // console.log('this.totalRooms: ', this.totalRooms);
  // console.log('this.bookedRooms.length: ', this.bookedRooms.length);
  //// console.log('this.bookedRooms.length / this.totalRooms: ', this.bookedRooms.length / this.totalRooms);
  // console.log('this.roomsOccupied: ', this.roomsOccupied);

  // defineBtn(btn) {
  //   return btn;
  // }
