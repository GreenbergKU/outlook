class UsersData {
  constructor(data) {
    // console.log('data @UsersData: ', data);
    this.data = data;
  };

  findUserByProperty(property, value) {
    return this.data.filter(user => user[property] === value)
  };

}

export default UsersData;

/* 
  countUsers() {
    return this.data.length
  };

  findUserByProperty(property, value) {
    return this.data.filter(user => user[property] === value)
  };

*/