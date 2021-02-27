class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.type = "";
    this.userID = null;
  };

  formatUser() {
    if (this.username.includes('customer')) { 
      this.type = 'guest';
      this.userID = parseInt(this.username.split('customer')[1]);
      this.username = 'guest';
    } else if (this.username === 'manager') {
      this.type = this.username;
      this.userID = 0;
    };
    return this;
  }

  validation(guestsNum) {
    return this.type === "guest" ? this.userID <= guestsNum : this.type === "manager";
  }

}

export default User