function deleteBooking(booking) { //, loadPage, update, userX) {

  let promise = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(booking),
  })
  .then(response => {
    return response.json()
  })
  .catch(error => console.log('error.message: ', error.message));
  
  return promise
  // .then(json => {
  //   const confCode = json.message.split(" ")[1];
  //   alert(`
  //     ${json.message}.
  //     Please keep a record of your confirmation code: 
  //     ${confCode}
  //   `);
  // });
}

export default deleteBooking;