const dayjs = require('dayjs');
//import dayjs from 'dayjs' // ES 2015
dayjs().format();

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.date = new dayjs().format("MM/DD/YYYY");

    this.type = "login";
    this.labelInput = "username";
    this.input = "submit";
    this.placeHolder = "customer00";

    this.userID;
  };

  formatUser() {
    console.log('this.username.includes("customer"): ', this.username.includes('customer'));
    this.username.includes('customer') ? (
      this.userID = parseInt(this.username.split('customer')[1]),
      this.username = 'guest'
    ) : null;
    console.log('this @formatUser: ', this);  
    return this;
  }

  validateUser(userNum) {
    //console.log('validation(guestsNum): ', validation(guestsNum));
    const validPassword = this.password === "overlook2020" ? true : alert("invalid password!") 
    const validUsername = 
      this.username != "manager" 
      ? this.userID > userNum 
      ? alert("invalid username") : this.username === "guest" 
      : this.username === "manager";
    //!this.userID ? this.username != "manager" ? alert("wrong username") : this.userID > users ? alert("wrong customerID") : ;
    return validPassword && validUsername;
  };
  



}

export default User