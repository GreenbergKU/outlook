function deleteBooking(bookingID) {
  console.log('bookingID: ', bookingID);
  
  bookingID = {"id":bookingID};
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookingID),
  })
  .then(response => response.json())
  .catch(error => error.message)
}

export default deleteBooking;