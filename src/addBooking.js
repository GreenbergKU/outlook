function addBooking(newBooking, formatDate, loadPage, update, userX) {
  console.log('newBooking: ', newBooking);
  //let confCode;
  let promise = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newBooking),
  })
  .then(response => {
    return response.json()
  })
  .then(json => {
    //const confCode = json.id;
    alert(`
      YOUR RESERVATION HAS BEEN CONFIRMED!
      
      BOOKING CONFIRMATION (for your records):
        
      Check-in Date: ${formatDate(json.date, "numbers")}
      Room Number: ${json.roomNumber}
      Confirmation Code: ${json.id}
    `);
    return json 
  })
  .then(json => console.log('Request success: ', json))
  .catch(err => console.log('err.message: ', err.message))
  .then(loadPage())
  .then(update(userX))
}

export default addBooking;