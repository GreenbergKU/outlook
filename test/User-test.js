import chai from 'chai';
const expect = chai.expect;
import User from "../src/class/User.js";
import HotelData from "../src/class/data/HotelData.js";
import sampleBookings from "./testData/bookings-sample.js";
import sampleRooms from "./testData/rooms-sample.js";
import sampleUsers from "./testData/users-sample.js";

const dayjs = require('dayjs');
dayjs().format();

describe.only('User', function() {
  
  it('should be a function', function() {
    expect(User).to.be.a("function");
  });
  
  let noData = new User();
  const date = new dayjs().format("YYYY/MM/DD");
  let user = new User(date, "customer1", "overlook2020");
  let user2 = new User(date, "manager", "overlook2020");
  let user3 = new User(date, "customer2", "overlook2019");
  let user4 = new User(date, "manager", "overlook2019");
  let user5 = new User(date, "customer10", "overlook2020");

  const sampleData = {usersData: sampleUsers, bookingsData: sampleBookings, roomsData: sampleRooms};
  const hotelData = new HotelData(sampleData);
  
  it('should be an instance of User', function() {
    expect(user).to.be.instanceOf(User);
  });

  it('should have a username and password', function() {
    expect(user.password).to.equal("overlook2020");
    expect(user2.username).to.equal("manager");
    expect(user2.password).to.equal("overlook2020");
  });

  let formattedUser = user.formatUser();
  let formattedUser2 = user2.formatUser();
  let formattedUser3 = user3.formatUser();
  let formattedUser4 = user4.formatUser();
  let formattedUser5 = user5.formatUser();

  describe('formatUser', function() {
    it('should remove "customer" from the username and reassign value to id if username is not "manager"', function() {
      
      expect(user3.username).to.equal("customer2");
      expect(user4.username).to.equal("manager");

      expect(formattedUser3.username).to.equal("customer2");
      expect(formattedUser3.id).to.equal(2);

      expect(formattedUser4.username).to.equal("manager");
      expect(formattedUser4.id).to.equal(undefined);      
    });

    it('should assign type to user', function() {
      
      expect(formattedUser.type).to.equal("guest");
      expect(formattedUser2.type).to.equal("manager");
      expect(formattedUser3.type).to.equal("guest");
      expect(formattedUser4.type).to.equal("manager");
      expect(formattedUser5.type).to.equal("guest");   
    });
  });
  
  describe('validation', function() {

    it('should return TRUE if "password" is valid AND if the "id" is found using the class methods passed as an argument', function() {

      let validUser = formattedUser.validation(formattedUser, hotelData);

      expect(validUser).to.equal(true);
    });

    it('"manager" should return TRUE if "password" is valid AND "username" is "manager" ', function() { 

      let validUser2 = formattedUser2.validation(formattedUser2, hotelData);

      expect(validUser2).to.equal(true);
    });

    it('should return true if password is null but username is found within the data supplied', function() {
      
      let user8 = new User(date, "Leatha Ullrich").formatUser();
      let validUser8 = user8.validation(user8, hotelData);
      
      expect(validUser8).to.equal(true);
    });

    it('should return a string explaining why the validation failed if conditionals are not met', function() {

      let validUser3 = formattedUser3.validation(formattedUser3, hotelData);
      let validUser4 = formattedUser4.validation(formattedUser4, hotelData);
      let validUser5 = formattedUser5.validation(formattedUser5, hotelData);
      let user6 = new User(date, "Sue").formatUser();
      let validUser6 = user6.validation(user6, hotelData);
      let user7 = new User(date, "Sue Wolf").formatUser();
      let validUser7 = user7.validation(user7, hotelData);
      
      expect(validUser3).to.be.a("string");
      expect(validUser3).to.equal("invalid password!");

      expect(validUser4).to.be.a("string");
      expect(validUser4).to.equal("invalid password!");

      expect(validUser5).to.be.a("string");
      expect(validUser5).to.equal("invalid username!");
      
      expect(validUser6).to.be.a("string");
      expect(validUser6).to.equal("First and last name is required!");

      expect(validUser7).to.be.a("string");
      expect(validUser7).to.equal("user not found, check spelling and try again!");
    });   
  });
});