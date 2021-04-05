function deleteBooking(bookingID) {
  console.log('bookingID: ', bookingID);
  
  bookingID = {"id":bookingID};
  fetch('', {
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