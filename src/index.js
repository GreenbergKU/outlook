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
/* 
  //import className from './classes/.js';
  //import classNameData from './class/data/classNameData.js';
 */
import RenderDOM from './class/RenderDOM.js';
import User from './class/User.js';

import Guest from './class/Guest.js';
import Manager from './class/Manager.js';
import Hotel from './class/Hotel.js';

import UsersData from './class/data/UsersData.js';
import GuestsData from './class/data/GuestsData.js';
import BookingsData from './class/data/BookingsData.js';
import RoomsData from './class/data/RoomsData.js';

/*//// GLOBAL VARIABLES ////*/
 
let hotel, manager, guest; //loginUser;  

const renderOutlook = new RenderDOM();

// let outlook = {  
//   guestsData: null, 
//   bookingsData: null, 
//   roomsData: null
// };

/*//// ALL FUNCTIONS /////*/

// EVENT LISTNERS
window.onload = function() {
  fetchOutlook();
  activateForm();
};

// EVENT HANDLERS

function fetchOutlook() {
  fetchData()
  .then((data) => {
      //console.log("data @fetch().then: ", data); 
    hotel = new Hotel(data[0], data[1], data[2]);
  })
  .catch((error) => console.log(error.message)); 
};

function activateForm() {
  document.getElementById('submit').addEventListener("click", function(event) {
    const inputs = getLoginInputs();
    if (!inputs.username || !inputs.password) {
      alert("a username and password are both required");
    } else {
      const loginUser = createUser(inputs);
      const validLogin = validateLogin(loginUser, event);
      validLogin ? createUserType(loginUser) : alert("wrong username or password");    
    };   
  });
};

function getLoginInputs() {
  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;
  return  {
    username: `${usernameInput.toLowerCase()}`, 
    password: `${passwordInput}`
  }
};  

function createUser(loginInputs) {
  return new User(loginInputs.username, loginInputs.password).formatUser();
};

// function formatUser(username) {
//   username === "manager" ? user.formatManager() : username.includes('customer') ? user.formatGuest() : user;
// }

function validateLogin(user, event) {
  event.preventDefault();
    console.log('hotel: ', hotel);
  return user.password === "overlook2020" && user.validation(hotel.totalGuests);
};

function createUserType(user) {
  user.username === "guest" ? createGuest(user.userID) : createManager(user.username);
}

const createManager = (username) => {
    console.log('new Manager(username): ', new Manager(username));
  
  manager = new Manager(username);
  renderOutlook.displaySection("manager-page");
}

const createGuest = (userID) => {
  const guestName = findUserData("id", userID)[0].name;
  const guestBookings = findBookings("userID", userID);
  //console.log('new Guest(userID, guestName, guestBookings): ', new Guest(userID, guestName, guestBookings));
  const totalSpent = calculateRoomTotals(guestBookings);
  //console.log('totalSpent: ', totalSpent);
  guest = new Guest(userID, guestName, guestBookings, totalSpent);
  console.log('guest: ', guest);

  renderOutlook.displaySection("guest-page");
};

function findUserData(property, value) {
  return hotel.filterData(hotel.usersData, property, value);
};

function findBookings(property, value) {
  return hotel.filterData(hotel.bookingsData, property, value)
};

function calculateRoomTotals(roomList) {
  return hotel.findTotalAmount(roomList)
}

//function narrowFocus(data, property) {
  //hotel.createList(data, property);
//}















// HELPER FUNCTIONS

/*
**** IMPORT EXAMPLES ****
An example of how you tell webpack to use a CSS (SCSS) file:  
import './css/base.css';

An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
*/
