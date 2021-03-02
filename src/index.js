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
import fetchedData from './fetchedData.js';

// classes
/* 
  import className from './classes/.js';
  import classNameData from './class/data/classNameData.js';
 */
import RenderDOM from './class/RenderDOM.js';
import User from './class/User.js';

import Guest from './class/Guest.js';
import Manager from './class/Manager.js';
import Hotel from './class/Hotel.js';

//import UsersData from './class/data/UsersData.js';
import GuestData from './class/data/GuestData.js';
//import BookingsData from './class/data/BookingsData.js';
//import RoomsData from './class/data/RoomsData.js';

/*//// GLOBAL VARIABLES ////*/
 
let manager, guest, user, hotelData;
// let user, hotelData;


const renderOutlook = new RenderDOM();

/*//// ALL FUNCTIONS /////*/

// EVENT LISTNERS
window.onload = function() {
  fetchOutlook(hotelData);
  activateForm();
  
  console.log('fetchedData.bookings.length: ', fetchedData.bookings.length);
  console.log("fetchOutlook(): ", fetchOutlook())
};

// EVENT HANDLERS

function fetchOutlook() {
  fetchData()
  .then(data => hotelData = new Hotel(...data))
  .catch((error) => console.log(error.message));
  return hotelData
};

function activateForm() {
  document.getElementById('submit').addEventListener("click", function(event) {
    
    const inputs = getInputs();
    
    if (!inputs.name || !inputs.password) {
      alert("a username and password are both required");
    } else {
      const loginUser = createUser(inputs);
      // instantiate UserData here
      const validLogin = validateLogin(loginUser, event);
      validLogin ? differentiateUsers(loginUser) : alert("wrong username or password");    
    };   
  });
};

function getInputs() {
  const nameInput = document.getElementById("name").value;
  const passwordInput = document.getElementById("password").value;
  return  {
    name: `${nameInput.toLowerCase()}`, 
    password: `${passwordInput}`
  };
};  

function createUser(inputs) {
  let currDate = "2020/04/20";
  return new User(inputs.name, inputs.password, currDate).formatUser();
};

function validateLogin(user, event) {
  event.preventDefault();
  
  const totalUsers = hotelData.countTotals();
  console.log('totalUsers: ', totalUsers);
  
  return user.password === "overlook2020" && user.validation(totalUsers);
};

function differentiateUsers(user) {
  user.username === "guest" ? createGuest(user.userID) : createManager(user.username);
  
}

const createManager = (username) => {
  //managerData = new ManagerData(hotel.usersData, hotel.bookingsData, hotel.roomsData,)
  manager = new Manager(username, hotelData);
  //renderOutlook.displaySection(`${user.username}-page`);
  updateDOM(manager);
};

const createGuest = (userID) => {
  const guestData = new GuestData(hotelData, userID);
  const userData = guestData.findGuest();
  guest = new Guest(userData, hotelData);
  customizeData(guest, guestData);
  //.findTotals(guest, guestData);
  
  console.log('guest: ', guest);
  updateDOM(guest);
};

function findTotals(user) {
  return (
    user.totalUsers = hotelData.totalUsers,
    user.totalRooms = hotelData.totalRooms
  );
};

function customizeData(user, data) {
  console.log('user: ', user);
  user.bookings = data.findGuestBookings();
  console.log('data: ', data);
  user.ammountSpent = data.calculateRoomTotals();
  console.log('user: ', user);
  return user
  //guest.availableRooms = data.findAvailableRooms(date)
}

function updateDOM(user) { 
  console.log('user.name: ',user.name);
  console.log("user: ", user);
  
  renderOutlook.displaySection(`${user.name}-page`)
  .customizeSection(user)
};

/*
function findUserData(property, value) {
  return hotelData.filterData(hotel.usersData, property, value);
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

*/













// HELPER FUNCTIONS

/*
**** IMPORT EXAMPLES ****
An example of how you tell webpack to use a CSS (SCSS) file:  
import './css/base.css';

An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
*/
