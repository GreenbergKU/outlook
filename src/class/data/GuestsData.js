class GuestsData {
  constructor(data) {
    this.data = data;
  };

  countGuests() {
    return this.data.length
  };
  
  findGuestsByProperty(property, value) {
    return this.data.filter(guest => guest[property] === value)
  };

}

export default GuestsData;