class UsersData {
  constructor(data) {
    this.data = data;
  };
  
  countUsers() {
    return this.data.length
  };

  findUserByProperty(property, value) {
    return this.data.filter(user => user[property] === value)
  };

}

export default UsersData;