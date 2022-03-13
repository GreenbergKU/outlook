import User from './User.js';

class Manager extends User{
  constructor(username, password, date) {
    super(username, password);
    this.date = date;
    this.name = "Manager";
    this.type = "manager";
  };

  // <<<<<<< HEAD
  //   calculations(hotel, formatDate) {//*local switch>Guest
  //     const USD = new Intl.NumberFormat('en-US', { 
  //       style: 'currency', 
  //       currency: 'USD' 
  //     });
  //     const percent = new Intl.NumberFormat('en-US' , {
  //       style: 'percent'
  //     });
  //     this.totalUsers = hotel.totalUsers;
  //     const bookedRooms = hotel.findBookings("date", this.date, formatDate); 
  // =======
  
  calculations(hotel, dateFn) {//*local switch>Guest

    //this.totalUsers = hotel.totalUsers;
    const bookedRooms = hotel.findBookings("date", this.date, dateFn); 
  //>>>>>>> Testing-HotelData-sw
    this.availableRoomsNum = hotel.findAvailableRooms(bookedRooms).length;
    
    //this.revenue = USD.format(hotel.calculateAmountTotals(bookedRooms));
    this.revenue = hotel.calculateAmountTotals(bookedRooms);

    //this.roomsOccupied = percent.format(hotel.calculatePercentage(bookedRooms.length, hotel.totalRooms));
    this.roomsOccupied = hotel.calculatePercentage(bookedRooms.length, hotel.totalRooms);

    //this.totalRooms = hotel.totalRooms;
    // this.roomsAvailable = hotelRepo.findAvailableRooms(bookedRooms);
    return this;
  };

}

export default Manager;


    //this.guestAdmin = null;

    // this.btnChildText = "guest-search";
    // this.searchBtn = "find guest";
    
    // this.labelInput = "Full Name",
    // this.placeHolder = "First Last";

    //this.roomsAvailable;

    //this.bookedRooms;
    //this.revenue; //= data.ammountSpent;
    //this.roomsOccupied;
    //this.guestAdmin; // Leatha Ullrich;

  
  // console.log('this.totalRooms: ', this.totalRooms);
  // console.log('this.bookedRooms.length: ', this.bookedRooms.length);
  //// console.log('this.bookedRooms.length / this.totalRooms: ', this.bookedRooms.length / this.totalRooms);
  // console.log('this.roomsOccupied: ', this.roomsOccupied);


  // percentBooked() {
  //   this.roomsOccupied = this.bookedRooms.length / this.totalRooms * 100;
  //   return this.roomsOccupied
  // };

  // getBookingID() {
  //   return this.guestAdmin.id;
  // };

  // defineBtn(btn) {
  //   return btn;
  // }
