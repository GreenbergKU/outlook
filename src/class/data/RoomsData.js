class RoomsData {
  constructor(data) {
    this.data = data;
    //this.roomCount = this.findRoomCount;
  };

  countRooms() {
    return this.data.length 
  };

  findRoomsByProperty(property, value) {
    return this.data.filter(room => room[property] === value)
  };

}

export default RoomsData;