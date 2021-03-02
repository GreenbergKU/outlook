//import User from './class/User.js';

class BookingsData {
  constructor(data, id) {
    this.data = data;
    this.id = id;
  };

  countBookings() {
    return this.data.length;
  };

  findBookingsByProperty(property, value) {
    return this.data.filter(booking => booking[property] === value);
  };
}

export default BookingsData;