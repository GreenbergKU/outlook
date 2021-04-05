/*
  //// * INSTRUCTOR's CODE BELOW * /////////////////////////////////
  // This is the JavaScript entry file - your code begins here
  // Do not delete or rename this file ********
  ///////////////////////////////////////////////////////////////////
*/

/*////// IMPORTS /////*/
// stylesheets

import './css/base.scss';
/*
import 'node-sass'
import './css/base.scss';
*/
//var nodeSass = require('node-sass');
//var result = nodeSass.renderSync({file: "./css/base.css"});
//console.log('result: ', result);
//import 'fs.realpath';

// images
import './images/hotel-lobby-small.jpg';

// functions or files
import testBookings from './testBookings.js'
import fetchData from './fetchData.js';
import addBooking from './addBooking.js';
import deleteBooking from './deleteBooking.js';
//import fetchedData from './fetchedData.js';

// classes
/* 
  import className from './classes/.js';
  import classNameData from './class/data/classNameData.js';
 */
import RenderDOM from './class/RenderDOM.js';
import User from './class/User.js';
import Guest from './class/Guest.js';
import Manager from './class/Manager.js';
import HotelData from './class/data/HotelData.js';

import BookingsData from './class/data/BookingsData.js';
import RoomsData from './class/data/RoomsData';

/*//// GLOBAL VARIABLES ////*/

let user, hotelRepo; 
const renderOutlook = new RenderDOM();

const dayjs = require('dayjs');
//import dayjs from 'dayjs' // ES 2015
dayjs().format();


/*//// ALL FUNCTIONS /////*/

// EVENT LISTNERS
window.onload = loadOutlook();

// EVENT HANDLERS

function loadOutlook() {
  fetchData()
  .then(data => {
    makeCurrent(data.bookings)
    return data;
  })
  .then(data => hotelRepo = new HotelData(data).addTotals())
  .then(activateForm());
};

function formatDate(date, style) {
  return style === 'sort' ? dayjs(date).format("YYYYMMDD")
    : style === 'words' ? dayjs(date).format("MMMM d, YYYY") 
    : dayjs(date).format("YYYY/MM/DD"); 
}

// ***** FOR TESTING PURPOSES ONLY *****
function makeCurrent(data) {
  data.map(dataObj => {
    let date = dayjs(dataObj.date);
    dataObj.date = formatDate(date.add(1, "year"));
    //console.log('dataObj.date @makeCurrent(data): ', dataObj.date);
  });
};

// function addTestingData(dataGroup, dataSets) {
//   let group = dataGroup;
//   //dataSets.map(dataSet => dataGroup.push(dataSet));
//   dataGroup.push(...dataSets);
//     console.log("dataGroup === group: ", dataGroup === group);
// };

// ***** FOR TESTING PURPOSES ONLY *****
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

function activateForm() {
  document.getElementById('user-submit').addEventListener("click", getLogin);
};

function getLogin(e) {
  e.preventDefault();
  const inputs = getInputs();
  const validForm = validateForm(inputs);
  validForm ? differentiateUsers(inputs) : alert("wrong username or password");
};

function getInputs() {
  const nameInput = document.getElementById("name");
  const passwordInput = document.getElementById("password");
    console.log("nameInput.value:", nameInput.value.toLowerCase());
  return  {
    nameInput: nameInput,
    name: `${nameInput.value.toLowerCase()}`,
    passwordInput: passwordInput, 
    password: `${passwordInput.value}`
  };
};

function validateForm(formInputs) {
  const validInputs = validateInputs(formInputs);
  const validLogin = validateLogin(formInputs);
  return validInputs && validLogin;
};

function validateInputs(formInputs) {
  !formInputs.name || !formInputs.password ?
    alert("a username and password are both required")
    : user = createUser(formInputs);
  return formInputs.name && formInputs.password;
};

function validateLogin() {
  const allUsers = hotelRepo.totalUsers;
  return user.validateUser(allUsers);
};

function differentiateUsers(userInputs) {
    console.log('user@diff: ', user);
  const date = formatDate(new dayjs());
    console.log('date: ', date);
  user = user.username === "guest" ? createGuest("id", user.userID, date) : createManager(date, hotelRepo); 
  activateUserBtn(user); 
  activateSearchBtn(user);
  customizeUser(user);
  updateDOM(userInputs);
};

function createUser(inputs) {
  console.log('hotelRepo: ', hotelRepo);
  return new User(inputs.name, inputs.password).formatUser();
};

function customizeUser(user) {  
  return user.type === "guest" ? customizeGuest(user, formatDate) : customizeManager(user);
};

function createManager(date, hotelRepo) {
  return new Manager(date, hotelRepo);
};

function customizeManager() {

  const USD = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  });
  const percent = new Intl.NumberFormat('en-US' , {
    style: 'percent'
  });
  const bookedRooms = hotelRepo.findBookings("date", user.date);
  user.roomsAvailable =  hotelRepo.findAvailableRooms(bookedRooms);
  user.availableRoomsNum = user.roomsAvailable.length;
  user.revenue = USD.format(findTotalAmount(bookedRooms));
  user.roomsOccupied = percent.format(hotelRepo.calculatePercentage(bookedRooms.length, user.totalRooms));
  //renderRoomDetails()
  console.log('user @customizeManager(user): ', user);
  
  return user
};
  /*
    available rooms: #
    revenue: $
    rooms occupied: %
  */

function createGuest(property, value, date) {
  const userData = hotelRepo.findGuestByProperty(property, value);
  return new Guest(userData, date);
};

function customizeGuest(user, formatDate) {
  console.log('@ CUSTOMIZE GUEST(user):');
  console.log('user1: ', user);

  const USD = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  });
  //user.bookings = hotelRepo.findBookings("userID", user.id);
  user.bookings = findGuestBookings(user, formatDate);
  //findBookingDetails(user.bookings);
    console.log('user2: ', user);
    console.log("hotelRepo.roomsData: ", hotelRepo.roomsData)

  user.sortedBookings = sortBookingsByDate(user);
    console.log('user3: ', user);

  user.amountSpent = USD.format(findTotalAmount(user.bookings));
    console.log("user.amountSpent @customizeGuest: ", user.amountSpent);
  
  displayBookings(user);
  activateBookingBtns("booking-btn");

  activateRoomSearchBtn(user);
  activateRmDetailsBtns("booking-details-btn");
  activateFilter(user)

  //renderRoomDetails(user.sortedBookings);
  console.log('user @customizeGuest(user): ', user);
  return user
};

/*
// Let's use use good old function sytax
function event_handler(event, arg) {
  console.log(event, arg);
}

// Assign the listener callback to a variable
var doClick = (event) => event_handler(event, 'An argument'); 

el.addEventListener('click', doClick);

// Do some work...

// Then later in the code, clean up
el.removeEventListener('click', doClick);
*/

function activateUserBtn(user) {
  console.log('@activateUserBtn: ', user); 
    //console.log('user @actUserBtn: ', user);
  const userBtn = document.getElementById('userBtn');
  renderOutlook.updateSearchBtn(user.searchBtn);
  userBtn.addEventListener("click", showSearchUser);
}; 

const showSearchUser = (event) => showSearch(event, user);

function showSearch(event, user) {
  console.log('event.target @showSearch: ', event.target);
  console.log('user @showSearch: ', user);
  const rmSearchBtns = document.getElementsByClassName("room-search-btn");  
  const targetName = event.target.name;
  const targetBtn = `${targetName}-btn`;
    console.log('targetBtn @activateUserBtn(): ', targetBtn);
    console.log('targetName @activateUserBtn(): ', targetName);
  renderOutlook.displaySearchForm(event.target);
  renderOutlook.toggleDisplay("login-name");
  document.querySelector(".submit-user").removeEventListener("click", getLogin);
  // renderOutlook.updateSearchBtn(targetName, user.searchBtn.toUpperCase());
}  

function activateSearchBtn(user) {
  const searchBtn = document.querySelector(".submit-user");
    console.log('searchBtn @activateUserBtn(): ', searchBtn); 
  searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.target.value.includes('ROOMS') ? findAvailableRooms(user) : findGuestAdmin();
  });
};

function activateRoomSearchBtn(user) {
  const roomSearchBtn = document.getElementById("room-search");
    console.log('roomSearchBtn @activateUserBtn(): ', roomSearchBtn); 
  roomSearchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    findAvailableRooms(user);
  });
};

/*
  <button id="filter-btn" next="filter-section" onclick="event.preventDefault()">
    SEARCH OPTIONS
  </button>
*/

function findGuestBookings(user) {
  // console.log('hotelRepo.findBookings("userID", userID): ', hotelRepo.findBookings("userID", userID));
  const userBookings = hotelRepo.findBookings("userID", user.id);
  return user.sortChronically(userBookings, formatDate);
};

function sortBookingsByDate(user) {
    console.log('user @sortBookingsByDate: ', user);
    console.log('user.bookings @sortBookingsByDate: ', user.bookings);
 return user.sortByDate(user.bookings, formatDate);
};

function findTotalAmount(data) {
  console.log('data: ', data);  
  return hotelRepo.calculateAmountTotals(data);
};

function displayBookings(user) {
  let bookingHTML, room, roomHTML;
  user.sortedBookings.map(bookingTypes => {
    //const bookingsList = document.getElementById(bookingTypes.name);
    const bookingType = bookingTypes.name;
      console.log('bookingType: ', bookingType);
    const bookingsList = document.getElementById(`${bookingType}-list`);
      console.log('bookingsList: ', bookingsList);
    bookingsList.innerHTML = "";
    const className = bookingType.slice(0, -1);
    console.log('bookingTypes.data: ', bookingTypes.data);

    bookingTypes.data.map(booking => {
      room = hotelRepo.findRoom("number", booking.roomNumber)[0];
      bookingHTML = renderOutlook.designBookingHTML(booking, className);
      roomHTML = renderOutlook.designRoomHTML(room, className, booking.id)
      renderOutlook.renderBookingHTML(bookingsList, bookingHTML, roomHTML)
    });
    const hasData = checkForData(bookingTypes.data);
    !hasData ? adjustForNoData(bookingType, user.name) : adjustForData(bookingTypes.data, bookingType);
  });
  //checkForData(user.sortedBookings, user.name);
};

function displayRooms(rooms, className) {
  designRooms(rooms, className);
  showRooms(`${className}s`);
};

function designRooms(rooms, className) {
  console.log('rooms @renderRoomDetails(): ', rooms);
  let index, roomHTML = '', roomList, roomBtn;
  roomList = document.getElementById(`${className}s-list`);
  roomList.innerHTML = "";
  const rmBtns = rooms.map(room => {
    index = rooms.findIndex(roomObj => roomObj === room);
      console.log('index: ', index);
    roomHTML = renderOutlook.designRoomHTML(room, className, index);
    renderOutlook.renderRoomHTML(roomList, roomHTML);
    roomBtn = roomList.lastElementChild.lastElementChild;
      console.log('roomBtn @displayRooms: ', roomBtn); 
    return roomBtn      
  });
  customizeRoomBtns(rmBtns);
  return user
};

function showRooms(id) {
  console.log("@showRooms(id); " );
  renderOutlook.toggleDisplay(id);
}

function dataCheck(data, type, str) {
  const hasData = checkForData(data);
  !hasData ? adjustForNoData(type, str) : adjustForData(data, type);
}

function checkForData(data) {   //, type, name
  // data.map(type => {
  return data.length ? true : false; 
};

function adjustForData(data, type) { 
  type === "upcoming-bookings" ? 
  data.map(obj => renderOutlook.toggleDisplay(`cancel-btn-${obj.id}`, `no-${type}`) )
  : type === "available-rooms" ? renderOutlook.availableRoomsAdjustments(type)
  : renderOutlook.toggleDisplay(`no-${type}`);
};

function adjustForNoData(type, str) {
  // str = user.name (bookings) || datePicked (availRooms)
  renderOutlook.assignNoDataTxt(type, str);
};

/*
  const hasData = checkForData(data);
  !hasData ? renderOutlook.assignNoDataTxt(type, name) 
*/

function activateBookingBtns(btnID) {
    console.log('btnID @activateBookingBtns(btnID): ', btnID);
  const btns = document.getElementsByClassName(btnID);
  assignBtnsInnerText(btns);
  Array.from(btns).map(btn => {
    btn.addEventListener("click", (e => {
        console.log('e.target @activateBookingBtns(btnID): ', e.target);
        console.log('e.target.nextElementSibling: ', e.target.nextElementSibling ? true : false);
      const siblingElement = e.target.nextElementSibling ? e.target.nextElementSibling : e.target.previousElementSibling;
        console.log('siblingElement: ', siblingElement);
      if (siblingElement.value === 'hide') {
        displayInfo(siblingElement, "name")
      };
      displayInfo(btn, "name");
    }));
  });
};

function assignRoomBtnTxt(name) {
  return name === "upcoming-booking" ? "CANCEL ROOM" 
  : name === "available-room" ? "BOOK ROOM"
  : name === "past-booking" ? "LEAVE FEEDBACK" 
  : null;
};

function customizeRoomBtns(btns) {
    console.log('btns: ', btns);
  btns.map(roomBtn => {
    roomBtn.innerText = assignRoomBtnTxt(roomBtn.name); 
      console.log('roomBtn: ', roomBtn);
    activateRoomBtn(roomBtn); 
  });
};

function activateRoomBtn(roomBtn) {
    console.log('roomBtn @activateRoomBtn(btn): ', roomBtn);
  roomBtn.addEventListener("click", (e => {
    e.preventDefault();
    roomBtn.innerText === "CANCEL ROOM" ? cancelRoom(roomBtn)
    : roomBtn.innerText === "BOOK ROOM" ? bookRoom(roomBtn)
    : null 
  })); 
  renderOutlook.toggleDisplay(roomBtn.id);
};

function displayInfo(element, property) {
  const btnID = element.name === "room-details" ? element[property].split("-").slice(0, 2).join("-") : element[property];
  element.value = swapBtnValue(element.value); 
  renderOutlook.displayBookingsBtnTxt(element);
  renderOutlook.toggleDisplay(btnID);
};

function swapBtnValue(value) {
 return value === "show" ? "hide" : "show";
};

function assignBtnsInnerText(btns) {
  Array.from(btns).map(btn => renderOutlook.displayBookingsBtnTxt(btn));
};

function activateRmDetailsBtns(btnName) {
    console.log('btnName @activateRmDetailsBtns(btnName): ', btnName);
  const btns = document.getElementsByClassName(btnName); 
  assignBtnsInnerText(btns);
  Array.from(btns).map(btn => {
    btn.addEventListener("click", (e) => {
        console.log('e.target: ', e.target);
      const targetText = e.target.innerText;
      const targetName = e.target.name;
      targetText.includes("CANCEL") ? cancelBooking(e.target) : 
      targetText.includes("BOOK") ?  addBooking(e.target) :
      displayInfo(btn, "id"); 
    });   
  });
};  

function activateFilter(user) {
    console.log('user @activateFilter: ', user);
    console.log('user.availableRooms: ', user.availableRooms);
  activateFilterBtn();
  let filterList = [];
  const checkboxes = document.querySelectorAll("input[type = checkbox]");
  const filter = document.getElementById("filters");
    console.log('checkboxes: ', checkboxes);
  filter.addEventListener("change", (e) => {
      console.log('e.target: ', e.target);
    const checkProp = e.target.name;
    const checkVal = e.target.id.split("-").join(" ");
    const type = e.target.type;
    const checked = e.target.checked;
    const id = e.target.id != "suite";
    id && checked && type === "checkbox" ? user.availableRooms ? filterAvailableRooms(checkProp, checkVal) : addToFilterList(filterList, checkProp, checkVal) : null;
      console.log('user.availableRooms: ', user.availableRooms);
    dataCheck(user.availableRooms, "available-rooms", user.searchDate);
  });
};

function activateFilterBtn() {
  document.getElementById("filter-btn").addEventListener("click", (e) => {
    e.preventDefault();
    displayFilterSec(e.target);
  });    
};

function displayFilterSec(btn) {
    console.log('btn @displayFilterSec(btn): ', btn);
  renderOutlook.toggleDisplay(btn.name);
  btn.value = swapBtnValue(btn.value); 
  renderOutlook.displayBookingsBtnTxt(btn); 
};

function filterAvailableRooms(prop, value) {
    console.log('@filterAvailableRooms: ');
    console.log('value: ', value);
    console.log('prop: ', prop);
    console.log('user.availableRooms: ', user.availableRooms);
  user.availableRooms = user.filterData(user.availableRooms, prop, value);
  designRooms(user.availableRooms, "available-room");
  return user
};

function addToFilterList(list, prop, value) {
    console.log('@ addToFilterList: ');
  list.push({property: prop, value: value})
    console.log('list: ', list);
  return list
};

function resetForm(formID) {
  console.log('formID: ', formID);
  const checked = document.querySelectorAll("input[type = checkbox]:checked");  
};

function findAvailableRooms() {
    console.log('user @ findAvailableRooms(user): ', user);
    console.log('@ findAvailableRooms(user): ');
  let datePicked = document.getElementById("date").value;
    console.log('datePicked: ', datePicked);
  datePicked = datePicked.split("-").join("/");
    console.log('datePicked: ', datePicked);
  user.searchDate = datePicked;
  const roomsBooked = hotelRepo.findBookings("date", datePicked);
    //console.log('roomsBooked @findAvailableRooms(user): ', roomsBooked);
  const availableRooms = hotelRepo.findAvailableRooms(roomsBooked);
    // console.log("availableRooms @findAvailableRooms(user): ", availableRooms); 
  user.availableRooms = availableRooms;
    console.log('user @findAvailableRooms(user): ', user);
    console.log('user.availableRooms @findAvailableRooms(user): ', user.availableRooms);
  designRooms(user.availableRooms, "available-room");
  dataCheck(user.availableRooms, "available-rooms", datePicked); 
  return user 
};

function bookRoom(btn) {
  console.log('btn @bookRoom(): ', btn); 
};

function cancelBooking(btn) {
  console.log('btn @cancelBooking(btn): ', btn);
  const cancelMessage = "Are you sure you want to cancel this reservation (cannot be undone)?"
  confirm(cancelMessage) ? deleteBooking(btn.id) : null;
};

function findGuestAdmin() {
  console.log('@ findGuestAdmin(btn): ');
  // Leatha Ullrich
  //btn.classList.add("hidden");
  const nameInput = document.getElementById("name");
  const date = user.date;
  const guest = createGuest("name", nameInput.value, date);
  user.guestAdmin = customizeUser(guest);
  activateUserBtn(user.guestAdmin);
  displayGuestAdmin(user.guestAdmin);
  console.log('document.getElementById("new-reservation-btn"): ', document.getElementById("new-reservation-btn"));
  return user
}; 

function displayGuestAdmin(user) {
  //const guest = user.guestAdmin;
  renderOutlook
  .assignBtnToUser(user)
  .displayGuestHeader(user)
  .displayGuest(user)
  .toggleDisplay("guest-page", "user-page", "guest-heading-sec", "guest-bookings", "guest-btn-sec");  
};

function updateDOM(userInputs) { 
  renderOutlook
  .assignBtnToUser(user)
  .displaySection(user.type, "section")
  .customizeSection(userInputs, user);
};

// HELPER FUNCTIONS


/*
      
  // function renderGuestBookings(user) {
  //     console.log('user @renderGuestBookings(): ', user);
  //   renderOutlook.renderBookingsHTML(user);
  //   checkForData(user.sortedBookings, user.name);
  // };

  // function doSearch(event, user) {
  //   console.log('user @activateUserBtn() & @doSearch: ', user);
  //   //console.log('btn @doSearch: ', btn);
    
  //     //console.log('e.target.value: ', e.target.value);
  //   return event.target.value.includes('ROOMS') ? findAvailableRooms(user) : findGuestAdmin(searchBtn);
  //     //document.getElementById("userBtn").removeEventListener("click", showSearchUser);
  // }; 
  // const doSearchUser = (event) => doSearch(event, user);
  // const activateSearchBtn = (searchBtn) => searchBtn.addEventListener("click", doSearchUser);
  // activateSearchBtn(searchBtn);
  //   console.log('searchBtn.id: ', searchBtn.id);
  //   console.log('document.getElementById(searchBtn.id): ', document.getElementById(searchBtn.id));
  


  //onsole.log('userBtn @activateUserBtn(): ', userBtn);


    // const searchBtn = document.getElementById(targetBtn);
    //       console.log('searchBtn: ', searchBtn); 
    //     activateSearchBtn(searchBtn);
    //       console.log('searchBtn.id: ', searchBtn.id);
    //       console.log('document.getElementById(searchBtn.id): ', document.getElementById(searchBtn.id));
    //     document.getElementById(searchBtn.id).removeEventListener("click", getLogin);

    //const activateSearchBtn = (btn, user) => btn.addEventListener("click", doSearchUser);
      //console.log('user @actSearchbtn: ', user);
      //console.log('btn @actSearchbtn: ', btn);
      


    //const doSearchUser = (event) => doSearch(event, user);

  // function doSearch(event, user) {
  //   console.log('user @activateUserBtn() & @doSearch: ', user);
  //   //console.log('btn @doSearch: ', btn);
  //   event.preventDefault();
  //     //console.log('e.target.value: ', e.target.value);
  //   return event.target.value.includes('ROOMS') ? findAvailableRooms() : findGuestAdmin();
  //     //document.getElementById("userBtn").removeEventListener("click", showSearchUser);
  // };

  // function displayRooms(rooms, className) {
  //   console.log('rooms @renderRoomDetails(): ', rooms);
  //   let index, roomHTML = '', roomList, roomBtn;
  //   roomList = document.getElementById(`${className}s-list`);
  //   roomList.innerHTML = "";
  //   const rmBtns = rooms.map(room => {
  //     index = rooms.findIndex(roomObj => roomObj === room);
  //       console.log('index: ', index);
  //     roomHTML = renderOutlook.designRoomHTML(room, className, index);
  //     renderOutlook.renderRoomHTML(roomList, roomHTML);
  //     roomBtn = roomList.lastElementChild.lastElementChild;
  //       console.log('roomBtn @displayRooms: ', roomBtn); 
  //     return roomBtn      
  //   });
  //   renderOutlook.toggleDisplay(`${className}s`);
  //   customizeRoomBtns(rmBtns);
  // };

  // !data.length ? renderOutlook.assignNoDataTxt(type, name) 
  //   : type === "upcoming-bookings" ? 
  //   data.map(obj => renderOutlook.toggleDisplay(`cancel-btn-${obj.id}`, `no-${type}`) )
  //   : type === "available-rooms" ? renderOutlook.toggleDisplay(`name`, `no-${type}`)
  //   : renderOutlook.toggleDisplay(`no-${type}`);
    
  
  // data.map(type => {
  //     console.log('type.name: ', type.name);
  //   !type.data.length ? renderOutlook.assignNoDataTxt(type.name, name) 
  //     : type.name === "upcoming-bookings" ? 
  //     type.data.map(obj => renderOutlook.toggleDisplay(`cancel-btn-${obj.id}`, `no-${type.name}`) )
  //     : renderOutlook.toggleDisplay(`no-${type.name}`);
  // });

  // function dataPresentAdjustment() {

  // } 

  // function cancelRoom(btn) {
  //     console.log('btn @cancelRoom(): ', btn); 
  // };

  // function leaveFeedback(btn) {
  //     console.log('btn @leaveFeedback(): ', btn);
  // };


// function activateCheckboxes(boxes) {
//   let filters = [];
//   Array.from(boxes).map(box => {
//     box.addEventListener('change', (e) => {
//       console.log('e.target: ', e.target);
//       user.filters.push({property: e.target.name, value: e.target.id});   
//     });
//   }); 
//   //const checkboxes = document.getElementsByTagName("input[type = checkbox]")  
// };

// function checkForFilters() {
//   const checkboxes = document.getElementsByTagName("input[type = checkbox]")
// };

// function applyFilterToSearch(filters) {
//   document.getElementsBy
// };

// function toggleRmDetails(btn) {
//     console.log('btn @toggleRmDetails(btn): ', btn);
//     console.log('btn.bkid @toggleRmDetails(btn): ', btn["bkid"]);
    
//   const btnID = btn.id.split("-").slice(0, 2).join("-");
//   btn.value = swapBtnValue(btn.value);
//   renderOutlook.displayBookingsBtnTxt(btn);
//   renderOutlook.toggleDisplay(btnID);
// }


  // function findBookingDetails(bookings) {
  //     console.log('user @findBookingDetails: ', user);
  //   let roomDetails = [];
    
  //   bookings.map(booking => {
  //       console.log('booking @findBookingDetails: ', booking);
  //     booking.rmDetails = hotelRepo.findRoom("number", booking.roomNumber)[0];
  //     rmDetails = hotelRepo.findRoom("number", booking.roomNumber)[0];

  //       //console.log('roomDetails @findBookingDetails: ', roomDetails);
  //     booking.rmDetails.bookingID = booking.id;
  //       //console.log('booking @findRmDetails(): ', booking);
  //       console.log('booking.rmDetails @findBookingDetails: ', booking.rmDetails);
  //       console.log('hotelRepo.findRoom("number", booking.roomNumber)[0]: ', hotelRepo.findRoom("number", booking.roomNumber)[0]);
  //   });
  //   //console.log('bookings.length: ', bookings.length);
  //   return bookings
  // };

  // function findBookingDetails(bookings) {
  //     console.log('user @findBookingDetails: ', user);
  //   let roomDetails = [];
    
  //   bookings.map(booking => {
  //       console.log('booking @findBookingDetails: ', booking);
  //     booking.rmDetails = hotelRepo.findRoom("number", booking.roomNumber)[0];
  //     rmDetails = hotelRepo.findRoom("number", booking.roomNumber)[0];

  //       //console.log('roomDetails @findBookingDetails: ', roomDetails);
  //     booking.rmDetails.bookingID = booking.id;
  //       //console.log('booking @findRmDetails(): ', booking);
  //       console.log('booking.rmDetails @findBookingDetails: ', booking.rmDetails);
  //       console.log('hotelRepo.findRoom("number", booking.roomNumber)[0]: ', hotelRepo.findRoom("number", booking.roomNumber)[0]);
  //   });
  //   //console.log('bookings.length: ', bookings.length);
  //   return bookings
  // };

  // function hideRoomDetails(rmNum) {
  //   renderOutlook.toggleDisplay(`room-${rmNum}`, `details-btn-${rmNum}`);
  // };

  // function showRoomDetails(btn) {
  //     console.log('target @showRoomDetails(t): ', btn);
  //   const rmNum = btn.value;
  //   renderOutlook.toggleDisplay(btn.name); //`cancel-btn-${rmNum}`
  // };

  // function assignBookingsRmDetails(user) {
  //   console.log('user.bookings @assignBookingsRmDetails: ', user.bookings);
  //   bookings.map(booking => {
  //     booking.rmDetails = hotelRepo.findRoom("number", booking.roomNumber)[0]
  //   });
  //   //console.log('bookings @createBookings(): ', bookings);
  //   //console.log('sortedBookings: ', sortedBookings);
  //   //findGuestBookingsDetails(sortedBookings);
  //   return ;  
  //     // console.log('user: ', user);
  //   //console.log('userBookings: ', userBookings);
  // }; 

  // function sortData(data) {
  //   let sortedData = user.sortByCurrDate(data, date);
  //   console.log('sortedData: ', sortedData);
  //   return sortedData;
  // }

  // function findAllBtns(className) {
  //   const allBtns = Array.from(document.getElementsByClassName(`.${className}`));
  //   console.log('document.getElementsByClassName(`.${className}`): ', document.getElementsByClassName(`.${className}`));
  //   console.log('allBtns: ', allBtns);
  //   return allBtns;
  // };

  // function addToDOM(type) {

  // }

      //console.log('user.bookings: ', user.bookings);
    // user.bookings = {
    //   "data": userBookings,
    //   "date": currDate,
    //   "past-bookings": [
    //     {
    //       "past-booking": booking,
    //     }
    //   ],
    //   "upcoming-bookings": [
    //     {
    //       "upcoming-booking": booking,
    //     }
    //   ]
    // }
    //console.log('user.bookings: ', user.bookings);

    // const bookingBtns = findAllBtns("booking-btn");
    // activateBookingBtns(bookingBtns);
    //const roomDiv = document.getElementById(`details-${rmNum}`);

    // const pastBookings = document.getElementById("past-bookings-btn");
    // const upcomingBookings = document.getElementById("upcoming-bookings-btn");

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

/***** IMPORT EXAMPLES ****
An example of how you tell webpack to use a CSS (SCSS) file:  
import './css/base.css';

An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
*/
