class BookingsData {
  constructor(data) {
    this.data = data;
  };


  findBookingsByProperty(property, value) {
    return this.data.filter(booking => booking[property] === value);
  };
}

export default BookingsData;