function addBooking(newBooking) {
  console.log('newBooking: ', newBooking);
  
  fetch('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newBooking),
  })
    .then(response => response.json())
    .then(json => console.log('Request success: ', json))
    .catch(err => console.log(err.message))

}

export default addBooking;