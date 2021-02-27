//import fetchData from './fetchData.js';
//import User from './class/User.js';

class BookingsData {
  constructor(data, id) {
    console.log('data: ', data);
    
    this.data = data;
    this.id = id;
    console.log('this: ', this);

  };

  countUsers() {
    return this.data.length;
  };

  findBookingsByProperty(property, value) {
    return this.data.filter(booking => booking[property] === value)
  };

}

export default BookingsData;