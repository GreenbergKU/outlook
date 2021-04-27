class RoomsData {
  constructor(data) {
    this.data = data;
    //this.roomCount = this.findRoomCount;
  };

  findRoomsByProperty(property, value) {
      // console.log('this.data[0] @findRoomsByProperty: ', this.data[0]);
    return this.data.filter(room => room[property] === value);
  };

}

export default RoomsData;