/*
  //// * INSTRUCTOR's CODE BELOW * /////////////////////////////////
  // This is the JavaScript entry file - your code begins here
  // Do not delete or rename this file ********
  ///////////////////////////////////////////////////////////////////
*/

/*////// IMPORTS /////*/
// stylesheets
import './css/base.scss';

// images
import './images/hotel-lobby-small.jpg';

// functions or files
import fetchData from './fetchData.js';

// classes
/* import className from './classes/.js' */
import User from './class/User.js';
import Guest from './class/Guest.js';
import Manager from './class/Manager.js';
import Hotel from './class/Hotel.js';

/*//// GLOBAL VARIABLES ////*/
const outlook = {  
  guests: null, 
  bookings: null, 
  rooms: null
};
/*//// ALL FUNCTIONS /////*/

// EVENT LISTNERS

window.onload = loadOutlook;

console.log('outlook: ', outlook);

// EVENT HANDLERS
function loadOutlook() {
  fetchData()
  .then((data) => {
    outlook.guests = data.guests;
    outlook.bookings = data.bookings;
    outlook.rooms = data.rooms;
    console.log('outlook: ', outlook); 
  })
  .catch((error) => console.log(error.message));
  activateForm();
}

function activateForm() {
  //let user;
  document.getElementById('submit').addEventListener("click", validateLogin);
    // console.log("user-0: ", user);
    // validateLogin(user);
    // console.log("user-1: ", user);
    // validateCredientials(event, user);
    // console.log("user-2: ", user);
};

function validateLogin(event) {
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  let user = new User(username.value, password.value).formatUser();
    console.log("user-1: ", user);
  validateCredientials(event, user);
  //   let userPage = user.validateUser();
  //   event.preventDefault();
  // !userPage ? alert("wrong username or password") : alert("loadPage(userPage)");
};

function validateCredientials(event, user) {
  event.preventDefault();
  console.log("user-2: ", user);
  let validatedUser = user.validateUser();    
  !validatedUser ? alert("wrong username or password") : alert("loadPage(userPage)");
}







// HELPER FUNCTIONS

/*
**** IMPORT EXAMPLES ****
An example of how you tell webpack to use a CSS (SCSS) file:  
import './css/base.css';

An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
*/
