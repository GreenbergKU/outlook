class BookingsData {
  constructor(data) {
    this.data = data;
  };

  countBookings() {
    return this.data.length;
  };

  findBookingsByProperty(property, value) {
    return this.data.filter(booking => booking[property] === value);
  };
}

export default BookingsData;