class User {
  constructor(username, password, date) {
    this.username = username;
    this.password = password; 
    this.date = date;
    this.userID;
  };

  formatUser() {
    if (this.username.includes('customer')) { 
      this.userID = parseInt(this.username.split('customer')[1]);
      this.username = 'guest';
    }
    return this;
  }

  validation(guestsNum) {
    //console.log('validation(guestsNum): ', validation(guestsNum));
    let isValid = this.username === "guest" ? this.userID <= guestsNum : this.username === "manager";
    return isValid
  }

}

export default User