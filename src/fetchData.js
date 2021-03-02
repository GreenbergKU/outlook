
function fetchData() {
  let usersData = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users")
    .then(response => response.json())
    .then(json => {
      return json.users;
    })
    .catch(error => console.log(error.message))

  let bookingsData = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings")
    .then(response => response.json())
    .then(json => {
      return json.bookings;
    })
    .catch(error => console.log(error.message));

  let roomsData = fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms")
  .then(response => response.json())
  .then(json => {
    return json.rooms;
  })
  .catch(error => console.log(error.message));

  return Promise.all([usersData, bookingsData, roomsData])
    .then(jsonData => {
      //const data = {};
      // data.users = jsonData[0];
      // data.bookings = jsonData[1];
      // data.rooms = jsonData[2];
      const data = jsonData;
      return data;
    });
}

export default fetchData;