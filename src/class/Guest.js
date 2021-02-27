class Guest {
  constructor(id, name, bookings, totalSpent) {
      console.log(name);
    this.id = id;
    this.name = name;
    this.bookings = bookings;
    //console.log('this.bookings: ', this.bookings);
    this.totalSpent = totalSpent;
  };
  

}

export default Guest