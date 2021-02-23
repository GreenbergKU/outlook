class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  };

  formatUser() {
    // console.log("this.username: ", this.username);
    this.username = this.username === "manager" ? "manager" : this.username.split('customer')[1];
    return this
  };

  validateUser() { 
    // console.log("this.username: ", this.username, this.username ? true : false);
    return this.username === "manager" && this.password === "overlook2020" ? "manager" : 
      this.username && this.password === "overlook2020" ? "guest" : null
  };

}

export default User