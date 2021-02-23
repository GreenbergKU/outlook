import chai from 'chai';
const expect = chai.expect;
import User from "../src/class/User.js";

describe('User', function() {
  it('should be a function', function() {
    expect(User).to.be.a("function");
  });

  let user = new User("customer1", "overlook2020");
  let user2 = new User("manager", "overlook2020");
  let user3 = new User("customer2", "overlook2019");
  let user4 = new User("manager", "overlook2019");
  let outlookPassword = "overlook2020";
  
  it('should be an instance of User', function() {
    expect(user).to.be.instanceOf(User);
  });

  it('should have a username and password', function() {
    expect(user.password).to.equal("overlook2020");
    expect(user2.username).to.equal("manager");
    expect(user2.password).to.equal("overlook2020");
  });

  describe('formatUser', function() {
    it('should remove "customer" from the username if username is not "manager"', function() {
      
      expect(user3.username).to.equal("customer2");
      expect(user4.username).to.equal("manager");

      let formattedUser3 = user3.formatUser();
      let formattedUser4 = user4.formatUser();

      expect(formattedUser3.username).to.equal("2");
      expect(formattedUser4.username).to.equal("manager");
    });
  });
  
  describe('validateUser', function() {

    let hasUsername = (user) => user.username ? true : false;
    let hasValidPassword = (user) => user.password === outlookPassword;
    let isManager = (user) => user.username === "manager";

    it('should return a string of "guest" if login password is valid AND username is NOT "manager" ', function() {
      let formattedUser = user.formatUser();
      let nameInput = hasUsername(formattedUser);
      let validPassword = hasValidPassword(formattedUser);
      
      expect(nameInput).to.equal(true);
      expect(validPassword).to.equal(true);

      let validUser = formattedUser.validateUser();

      expect(validUser).to.be.a("string");
      expect(validUser).to.equal("guest");
    });

    it('should return a string of "manager" if login password is valid AND username is "manager" ', function() {
      
      let formattedUser2 = user2.formatUser(); 

      expect(formattedUser2.username).to.equal("manager");
      expect(formattedUser2.password).to.equal(outlookPassword);
      
      let validUser2 = formattedUser2.validateUser();
      expect(validUser2).to.be.a("string");
      expect(validUser2).to.equal("manager");
    });

    it('should return "null" if one or both conditionals are not met', function() {

      let nameInput = hasUsername(user3);
      let validPassword = hasValidPassword(user3);
      
      expect(nameInput).to.equal(true);
      expect(isManager(user3)).to.equal(false);
      expect(validPassword).to.equal(false);
      
      let formattedUser4 = user4.formatUser();
      nameInput = hasUsername(formattedUser4);
      validPassword = hasValidPassword(formattedUser4);

      expect(nameInput).to.equal(true);
      expect(isManager(formattedUser4)).to.equal(true);
      expect(validPassword).to.equal(false);

      let validUser3 = user3.validateUser();
      let validUser4 = formattedUser4.validateUser();

      expect(validUser3).to.equal(null);
      expect(validUser4).to.equal(null);
    });   
  });
});