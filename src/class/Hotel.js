// import fetchedData from './fetchedData.js';
//import UsersData from './data/UsersData.js';
//import GuestsData from './data/GuestsData.js';
//import BookingsData from './data/BookingsData.js';
//import RoomsData from './data/RoomsData.js';


class Hotel {
  
  constructor(users, bookings, rooms) {
      //console.log("data @Hotel: ", data);
      //console.log(data.users)
    this.usersData = users;
    this.bookingsData = bookings;
    this.roomsData = rooms;
    //console.log('this.roomsData: ', this.roomsData.data);
      
    // this.usersData = new UsersData(users);
    // this.bookingsData = new BookingsData(bookings);
    // this.roomsData = new RoomsData(rooms);
    // console.log('this.roomsData: ', this.roomsData.data);
    

    this.usersTotal;
    this.roomsTotal;

      console.log('this @Hotel: ', this);
  };

  // calculateTotalGuests() {
  //   return this.usersData.countGuests();
  // }

  filterData(data, property, value) {
    return data.filter(obj => obj[property] === value);
  };

  // createList(data, property) {
  //   return data.map(dataSet => dataSet[property]);
  // }

  findTotalAmount(data) {
    let sum = 0;
    data.map(booking => {
      sum += this.filterData(this.roomsData, "number", booking.roomNumber)[0].costPerNight;
    });
    return Math.round(sum);  
  };

  countTotals() {
    this.totalRooms = this.roomsData.length;
    return this.totalUsers = this.usersData.length;
  }

}

export default Hotel;