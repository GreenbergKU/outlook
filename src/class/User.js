// const dayjs = require('dayjs');
// //import dayjs from 'dayjs' // ES 2015
// dayjs().format();

class User {
  constructor(date, username, password) {
    this.username = username;
    this.password = password ? password.toLowerCase() : null;
    this.date = date;
    //new dayjs().format("YYYY/MM/DD");
    //this.type;
    // this.labelInput = "username";
    // this.input = "submit";
    // this.placeHolder = "customer00";
    //this.id;
  };

  formatUser() {
    // console.log('this.username.includes("customer"): ', this.username.includes('customer'));
    if (this.username.toLowerCase() === 'manager') {
      this.username = this.username.toLowerCase();
      this.type = 'manager';
    }
    else if (this.username.toLowerCase().includes('customer')) {
      this.username = this.username.toLowerCase(); 
      this.id = parseInt(this.username.split('customer')[1]);
      this.type = 'guest';
    } else this.type = 'guest'
    
    //) : null;
    //// console.log('this @formatUser: ', this); 
    return this;
  }

  // validateUser(userNum, inputs) {
  //   //// console.log('validation(guestsNum): ', validation(guestsNum));
  //   const validPassword = this.password === "overlook2020" ? true : alert("invalid password!") 
    
  //   const validUsername = 
  //     this.username != "manager" 
  //     ? this.id > userNum 
  //     ? alert("invalid username") : this.username === "guest" 
  //     : this.username === "manager";
  //   this.type = this.username;
   
  //   return validPassword && validUsername;
  // };

  // validation(user, hotelRepo) {
  //   let isValid = false, found;
  //   // validation: stage I for manager & guest
  //   if (user.password && user.password != "overlook2020") {
  //       console.log('user.password: ', user.password);
  //     alert("invalid password!");
  //     return isValid;
  //   }
  //   // validation: stage II for manager
  //   if (user.username === "manager") return isValid = true  
  //   // validation: stage I for guestAdmin
  //   if (!user.password && user.username.split(" ").length != 2) {
  //     alert("First and last name is required!")
  //     return isValid;
  //   }
  //   // validation: stage II for guestAdmin
  //   if (!user.password) {
  //     found = hotelRepo.usersData.find(userData => userData.name === user.username);
  //     return !found ? alert("user not found, check spelling and try again!") : isValid = true;
  //   }
  //   // validation: stage II for guest
  //   if (user.id && typeof(user.id) === "number") {
  //     found = hotelRepo.usersData.find(userData => userData.id === user.id);
  //     return !found ? alert("invalid username!") : isValid = true;
  //   } 
  //   alert("invalid login");
  //   return isValid;
  // };

  validation(user, hotelRepo) {
    let isValid = false, found;
    // validation: stage I for manager & guest
    if (user.password && user.password != "overlook2020") {
        console.log('user.password: ', user.password);
      return "invalid password!";
      //return isValid;
    }
    // validation: stage II for manager
    if (user.username === "manager") return isValid = true  
    // validation: stage I for guestAdmin
    if (!user.password && user.username.split(" ").length != 2) {
      return "First and last name is required!"
      //return isValid;
    }
    // validation: stage II for guestAdmin
    if (!user.password) {
      found = hotelRepo.usersData.find(userData => userData.name === user.username);
      return !found ? "user not found, check spelling and try again!" : isValid = true;
    }
    // validation: stage II for guest
    if (user.id && typeof(user.id) === "number") {
      found = hotelRepo.usersData.find(userData => userData.id === user.id);
      return !found ? "invalid username!" : isValid = true;
    } 
    return "invalid login";
    //return isValid;
  }


  // findGuestByProperty(property, value) {
  //   return this.findDataByProperty("usersData", property, value)[0];
  // }


  // validation(inputs, userNum, user) {
  //   console.log('inputs: ', inputs);
  //   //!!inputs.password
  //   console.log('!!inputs.password: ', !!inputs.password, !!inputs.username);
  //   //console.log('inputs.contains("password"): ', inputs.includes("password"));
  //   console.log('Array.from(inputs).includes("password"): ', Array.from(inputs).includes('password'));
  //   //console.log("inputs.contains('password'): ", inputs.contains("password")); 
  //   if (user.password && this.password != "overlook2020") {
  //      ? true : alert("invalid password!") : null;
  //   this.id ? 
  // }
  



}

export default User