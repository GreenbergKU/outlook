class Manager {
  constructor(date, data) {
    this.name = "Manager";
    this.date = date;
    this.type = "manager";

    this.btnChildText = "guest-search";
    this.searchBtn = "find guest";

    this.labelInput = "Full Name of Guest",
    this.placeHolder = "First Last";

    this.totalUsers = data.totalUsers;
    this.totalRooms = data.totalRooms;

    this.roomsAvailable;
    this.bookedRooms;
    this.revenue; //= data.ammountSpent;
    this.roomsOccupied;

    this.guestAdmin; // Leatha Ullrich
  }

  percentBooked() {

    this.roomsOccupied = this.bookedRooms.length / this.totalRooms * 100;
    
    console.log('this.totalRooms: ', this.totalRooms);
    console.log('this.bookedRooms.length: ', this.bookedRooms.length);
    //console.log('this.bookedRooms.length / this.totalRooms: ', this.bookedRooms.length / this.totalRooms);
    console.log('this.roomsOccupied: ', this.roomsOccupied);
    return this.roomsOccupied
  }

  defineBtn(btn) {
    console.log('btn: ', btn);
    return btn
  }

}

export default Manager;