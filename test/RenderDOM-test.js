import chai from 'chai';
const expect = chai.expect;
import RenderDOM from "../src/class/RenderDOM.js";

// import sampleBookings from "./testData/bookings-sample.js";
// import sampleRooms from "./testData/rooms-sample.js";
// import sampleUsers from "./testData/users-sample.js";
// import HotelData from "../src/class/data/HotelData.js";

// const sampleData = {usersData: sampleUsers, bookingsData: sampleBookings, roomsData: sampleRooms};
// const hotelData = new HotelData(sampleData);
// const date = "2020/02/19";

// function formatDate(date, style) {
//   const dayjs = require('dayjs');
//   dayjs().format();
//   return style === 'sort' ? dayjs(date).format("YYYYMMDD")
//     : style === 'words' ? dayjs(date).format("MMMM D, YYYY") 
//     : style === 'numbers' ? dayjs(date).format("MM/DD/YYYY")
//     : style === 'min' ? dayjs(date).format("YYYY-MM-DD")
//     : dayjs(date).format("YYYY/MM/DD"); 
// };

describe.only('RenderDOM', function() {
  const renderDOM = new RenderDOM();
  
  it('should be a function', function() {
    expect(RenderDOM).to.be.a("function");
  });

  it('should be an instance of HotelData', function() {
    expect(renderDOM).to.be.an.instanceOf(RenderDOM);
  });

  it('Should not require an argument to create a new hotelData', function() {
    expect( () => new RenderDOM() ).to.not.throw(Error);
  });

});