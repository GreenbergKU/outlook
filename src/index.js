
  //// * INSTRUCTOR's CODE BELOW * /////////////////////////////////
  // This is the JavaScript entry file - your code begins here
  // Do not delete or rename this file ********
  ///////////////////////////////////////////////////////////////////


////// IMPORTS /////
// stylesheets

import './css/base.scss';
/*
import 'node-sass'
import './css/base.scss';
*/
//var nodeSass = require('node-sass');
//var result = nodeSass.renderSync({file: "./css/base.css"});
//// console.log('result: ', result);
//import 'fs.realpath';

// images
import './images/hotel-lobby-small.jpg';

import'./images/junior-king-1.jpg';
import './images/junior-king-1.jpg';
import './images/junior-king-2.jpg';
import './images/junior-queen-1.jpg';
import './images/junior-twin-2.jpg';
import './images/residential-full-1.jpg';
import './images/junior-twin-2.jpg';
import './images/residential-queen-1.jpg';
import './images/residential-queen-2.jpg';
import './images/residential-twin-1.jpg';
import './images/single-full-2.jpg';
import './images/single-king-1.jpg';
import './images/single-queen-1.jpg';
import './images/single-queen-2.jpg';
import './images/single-twin-2.jpg';
import './images/suite-full-2.jpg';
import './images/suite-queen-1.jpg';
import './images/suite-queen-2.jpg';
import './images/suite-twin-1.jpg';

// functions or files

import fetchData from './fetchData.js';
import addBooking from './addBooking.js';
import deleteBooking from './deleteBooking.js';

/* 
  import className from './classes/.js';
  import classNameData from './class/data/classNameData.js';
 */
import RenderDOM from './class/RenderDOM.js';
import User from './class/User.js';
import Guest from './class/Guest.js';
import Manager from './class/Manager.js';
import HotelData from './class/data/HotelData.js';

/*//// GLOBAL VARIABLES ////*/

let user, hotelRepo; 
const hotel = {};
const renderOutlook = new RenderDOM();

const dayjs = require('dayjs');
//import dayjs from 'dayjs' // ES 2015
dayjs().format();

/*//// ALL FUNCTIONS /////*/

// EVENT LISTNERS
window.onload = loadOutlook(addListeners);

// function loadPage() {
//   // loadOutlook(activateLogin);
//   loadOutlook(addListeners);
//   addListeners();
// }
// EVENT HANDLERS

function loadOutlook(toDo) {
  console.log('*@ loadOutlook(): *');
  const promise = fetchData()
  .then(data => {
    hotel.usersData = data.users;
    hotel.bookingsData = makeCurrent(data.bookings); //***TESTING PURPOSES***
    hotel.roomsData = data.rooms;
    return hotel
  })
  .then(hotel => {
    console.log('hotel: ', hotel);
    return hotelRepo = new HotelData(hotel);
  })
  .then(hotelRepo => console.log('hotelRepo: ', hotelRepo) )
  .then(hotelRepo => {
    //console.log('hotelRepo: ', hotelRepo);
    toDo();
    return hotelRepo
  })
  .catch(err => console.log("err", err));
  return promise;
  //console.log('hotelRepo: ', hotelRepo);
};

function formatDate(date, style) {
  return style === 'sort' ? dayjs(date).format("YYYYMMDD")
    : style === 'words' ? dayjs(date).format("MMMM D, YYYY") 
    : style === 'numbers' ? dayjs(date).format("MM/DD/YYYY")
    : style === 'min' ? dayjs(date).format("YYYY-MM-DD")
    : dayjs(date).format("YYYY/MM/DD"); 
};

function setDate() {
  let currDate = new dayjs();
  const minDate = formatDate(currDate.add(1, "day"), "min");
  document.getElementById("date").min = minDate;
  currDate = formatDate(currDate);
  //console.log('currDate: ', currDate);
  return currDate
}

// ***** FOR TESTING PURPOSES ONLY *****
function makeCurrent(data) {
  console.log('*@ makeCurrent(): *');
  let date;
  //const currDate = formatDate(new dayjs());
    // console.log('currDate: ', currDate);
  return data = data.map(dataObj => {
    date = dayjs(dataObj.date);
    //date["$y"] < 2021 ? console.log('date: ', date) : null; 
      // console.log('date["$y"]: ', date["$y"]);
      // console.log('date: ', date);
    dataObj.date = formatDate(date["$y"] <= 2020 ? dayjs(date).add(1, "year") : date);
      // console.log('dataObj.date: ', dataObj.date);
      // console.log('dataObj.date @makeCurrent(data): ', dataObj.date);
    return dataObj;
  });

};
// ***** FOR TESTING PURPOSES ONLY *****

function activateLogin() {
  console.log('*@ activateLogin(): *'); 
  const loginForm = document.getElementById("login");
  const invalidMessage = "All Fields Are Required!";
  // const minDate = new dayjs().add(1,"day").format("YYYY-MM-DD");
  // document.getElementById("date").min = minDate;
  document.getElementById('user-submit').addEventListener("click", function handleLogin(e) {
    e.preventDefault();
    user = validateForm(loginForm, invalidMessage);
    //console.log('validateForm(loginForm, invalidMessage): ', validateForm(loginForm, invalidMessage));
    console.log('user @handleLogin: ', user);
    if (user) updateDOM();
    //return user
  });
};  

function validateForm(form, message) {
  let formUser;
  const userInputs = findInputs(form);
  const validInputs = validateInputs(userInputs); 
    console.log('validInputs: ', validInputs);
  !!validInputs ? (
    formUser = createUser(userInputs),
    console.log('formUser: ', formUser),
    //user.isValid = user.validation(user, hotelRepo),
    formUser = checkValidity(formUser)
    //formUser = true
  ) : alert(message);
  console.log("formUser", formUser)
  return formUser     
}

function checkValidity(formUser) {//*global
  let validUser;
  //formUser.isValid = formUser.validation(formUser, hotelRepo);
  formUser.isValid = formUser.validation(hotelRepo);
  console.log('formUser: ', formUser);
    //console.log('formUser.isValid: ', formUser.isValid);
    //console.log('!!formUser: ', !!formUser.isValid);
  formUser.isValid === true ?
    validUser = !formUser.password ? findGuestAdmin(formUser) : differentiateUsers(formUser) 
  : alert(formUser.isValid);
  return validUser
};

function findInputs(form) {//*global
  const inputs = {};
  const selector = `input[class ~= "${form.id}-input"]`
    console.log('selector: ', selector);
  inputs.arr = Array.from(form.querySelectorAll(selector))
  .map(input => {
    return inputs[`${input.id}`] = {
      id: `${input.id}`,
      element: input,
      value: input.value,    
    };
  });
  return inputs;
};

function validateInputs(inputs) {//*global
  console.log('inputs.arr.map(input => !input.value): ', inputs.arr.find(input => !input.value));
  return inputs.arr.find(input => !input.value) === undefined;
};

function createUser(inputs) { //*local
   console.log('inputs: ', inputs, inputs.username, inputs.password);
  const nameInput = inputs.arr.find(input => input.id.toLowerCase().includes("name"));
   console.log('nameInput: ', nameInput);
  return inputs.password ? new User(nameInput.value, inputs.password.value).formatUser() : new User(nameInput.value).formatUser();
};


function differentiateUsers(formUser) {//*global
  const date = setDate();
  return user = formUser.type === "guest" ? createGuest(formUser, "id", date) : createManager(formUser, date); 
    //console.log('user: ', user); 
};

function findGuestAdmin(userGuest) {//*global
    console.log('userGuest @findGuestAdmin: ', userGuest);
    console.log('user @findGuestAdmin: ', user);
  userGuest.name = userGuest.username;
  return createGuest(userGuest, "name", user.date); // user.fullName, user.date
};

function createManager(user, date) {//*global
  return new Manager(user.username, user.password, date).calculations(hotelRepo, formatDate);
};


function createGuest(user, property, date) {//*global
  console.log('user: ', user); //{ id: 1, name: "Leatha Ullrich" }
  const userData = hotelRepo.findDataByProperty("usersData", property, user[property])[0];
    console.log('userData @createGuest: ', userData);
  const guest = new Guest(user.username, user.password, userData, date).calculations(hotelRepo, formatDate);
    console.log('guest @createGuest: ', guest);
  displayBookings(guest);
  return guest;
};


function displayBookings(guestUser) {//*global
  let bookingHTML, num, roomHTML;
  const getBtnClass = (type) => type === "upcoming-bookings" ? "btns-wrapper" : "btn-wrapper";
  
  const btns = document.getElementsByClassName("booking-btn");
  assignBtnsInnerText(btns);
  
  guestUser.sortedBookings.map(bookingTypes => {
    const bookingType = bookingTypes.name;
    const bookingsList = document.getElementById(`${bookingType}-list`);
    bookingsList.innerHTML = "";
    const className = bookingType.slice(0, -1);
    num = 1;
    const btnClass = getBtnClass(bookingType);
    bookingTypes.data.map(booking => {
      booking.count = num;
      booking.btnClass = btnClass;
      bookingHTML = renderOutlook.designBookingHTML(booking, className, formatDate);
      roomHTML = renderOutlook.designRoomHTML(booking.room, className, booking.count);
      renderOutlook.renderBookingHTML(bookingsList, bookingHTML, roomHTML);
      num++;
    });
    dataCheck(bookingTypes.data, bookingType, guestUser.name);
  });
  activateRmDetailsBtns("booking-details-btn", guestUser);
};

function addListeners() {//*global  
  console.log('** @addListeners() **');
  /////////////////////////
  activateLogin();
  activateLogOut();
  activateDisplySearchForm();
  
  activateManagerSearch();
  activateGuestSearchForm();
  activateBookingBtns("booking-btn");
  activateFilter();
  //////////////////////////
};

// function addListeners(user) {//*global
//     console.log('user.type @addListeners(): ', user.type);
//   activateLogOut();
//   activateDisplySearchForm(user);
//   if (user.type === "manager") {
//     activateManagerSearch();
//   } else {
//     activateBookingBtns("booking-btn");
//     // activateRmDetailsBtns("booking-details-btn", user);
//     activateFilter(user);
//     activateGuestSearchForm(user);
//     //handleResetFilters = handleResetFilters.bind(user);
//   };
// }

function activateLogOut() {//*local => addListeners()
  document.getElementById("logout-btn").addEventListener("click", function logout(e) {
    e.preventDefault();
    refreshSite("logout");
    //let inputs = findInputs(document.getElementById("login"));
    //inputs.username.placeholder = inputs.username.placeholder;
  });
};

function activateDisplySearchForm() {//*local => addListeners()
// function activateDisplySearchForm(user) {//*local
  const userBtns = Array.from(document.getElementsByClassName("user-btn"));
  //const showSearchUser = (e) => showSearch(e);
  userBtns.map(btn => btn.addEventListener("click", showSearch));
}; 

function showSearch(e) { //*local => activateDisplySearchForm()
    console.log('e.target @showSearch: ', e.target);
    //console.log('user @showSearch: ', user);
  renderOutlook.resetForm("room-search-form");
  renderOutlook.displaySearchForm(e.target);
  const filterBtn = document.getElementById("filter-btn");
  renderOutlook.displayBookingsBtnTxt(filterBtn);
  //renderOutlook.toggleDisplay("login-name");
};

function activateManagerSearch() {//*local => addListeners()
  //let searchName;
  ////{ id: 1, name: "Leatha Ullrich" }
  const userSearchForm = document.getElementById("user-search");
  const managerSearchBtn = document.getElementById("find-guest-btn");
  const invalidMessage = "A Full Name (first and last) Is Required!";

  managerSearchBtn.addEventListener("click", function handleSearchBtn(e) {
    e.preventDefault();
      console.log('user @handleSearchBtn: ', user);
    user.guestAdmin = validateForm(userSearchForm, user.guestAdmin, invalidMessage);
    if (user.guestAdmin) updateDOM();
    return user;
  });
};

function activateGuestSearchForm() { // *local => addListeners()
  const inputDate = document.getElementById("date");
  const roomSearchBtn = document.getElementById("submit-room-search");
  roomSearchBtn.disabled = true;  
    // console.log('roomSearchBtn @activateUserBtn(): ', roomSearchBtn);   
  const handleChangeDate = (e) => datePickerChange(e);
  
  function datePickerChange(e) {
    const guest = !user.id ? user.guestAdmin : user;
     console.log('user @actRmSearchBtns(datePicker): ', user); 
    const datePicked = dayjs(e.target.value);
    const validDate = formatDate(datePicked);
    datePicked.isValid ? findAvailableRooms(guest, validDate, roomSearchBtn) : null;    
  };
  inputDate.addEventListener("change", handleChangeDate);
  roomSearchBtn.addEventListener("click", displayRooms);
};

function activateFilter() {//*local => addListeners()
// function activateFilter(userX) {//*local
  // console.log('user @activateFilter: ', user);
  // console.log('user.availableRooms: ', user.availableRooms);
  // activateFilterBtns(userX);
  // function activateFilterBtns(userX) {//*local
  const filterBtn = document.getElementById("filter-btn");
  const resetBtn = document.getElementById("reset-filters");
  const radioFilters = document.getElementById("radio-filters");

  filterBtn.addEventListener("click", handleDisplayFilters);
  
  resetBtn.addEventListener("click", handleResetFilters);

  // radioFilters.addEventListener("change", function handleChange(e) {
  //   e.preventDefault();
  //   userX.searchDate ? filterAvailableRooms(userX) : null;
  // });

  radioFilters.addEventListener("change", handleRadioChange); 
  // {
  //   e.preventDefault();
  //   userX.searchDate ? filterAvailableRooms(userX) : null;
  // };
};

  // function displayFilters(filterBtn) {
  //   renderOutlook.toggleDisplay(filterBtn.name, resetBtn.id);
  //   document.getElementById("filter-btns").classList.toggle("btns-wrapper");
    
  //   const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));
  //   filterBtns.map(btn => btn.classList.toggle("dark-red"));

  //   filterBtn.value = swapBtnValue(filterBtn.value); 
  //   renderOutlook.displayBookingsBtnTxt(filterBtn);
  // };

function handleDisplayFilters(e) { //*local => activateFilter()
  e.preventDefault();
  // return displayFilters();
  const filterBtn = document.getElementById("filter-btn");
  const resetBtn = document.getElementById("reset-filters");
  
  renderOutlook.toggleDisplay(filterBtn.name, resetBtn.id);
  document.getElementById("filter-btns").classList.toggle("btns-wrapper");
  
  const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));
  filterBtns.map(btn => btn.classList.toggle("dark-red"));

  filterBtn.value = swapBtnValue(filterBtn.value); 
  renderOutlook.displayBookingsBtnTxt(filterBtn);
};

// const handleResetFilters = (e) => resetFilters.bind(userX)(e);

function handleResetFilters(e) { //*local => activateFilter()
  const guest = !user.id ? user.guestAdmin : user;    
    console.log("guest: ", guest);
  const roomSearchBtn = document.getElementById("submit-room-search");
  e.preventDefault();
  clearRadios();
  findAvailableRooms(guest, guest.searchDate, roomSearchBtn);
};

/////////////////////////////
function handleRadioChange(e) { //*local => activateFilter()
  e.preventDefault();
  const guest = !user.id ? user.guestAdmin : user;
    console.log('guest: ', guest);
  guest.searchDate ? filterAvailableRooms(guest) : null;
};
/////////////////////////////

function findAvailableRooms(userGuest, date, btn) {
  
    // console.log('userGuest: ', userGuest);
    console.log('userGuest @findAvailableRooms(): ', userGuest);
  userGuest.searchDate = date;
  btn.disabled = false;
  const roomsBooked = hotelRepo.findBookings("date", date, formatDate);
  userGuest.availableRooms = hotelRepo.findAvailableRooms(roomsBooked);
  filterAvailableRooms(userGuest);
  return userGuest; 
};

function filterAvailableRooms(userGuest) {
    console.log('userGuest @filterAvailableRooms: ', userGuest);
    console.log('userGuest.type @filterAvailableRooms: ', userGuest.type);
    console.log('user.availableRooms @filterAvailableRooms: ', user.availableRooms);
    console.log('userGuest.searchDate @filterAvailableRooms: ', userGuest.searchDate);
  let filteredRooms = userGuest.availableRooms;
  const roomOptions = ["roomType", "bedSize", "numBeds"];
  let checked;
  let checkedOptions = [];
  roomOptions.forEach(option => {
    checked = document.querySelector(`input[name = ${option}]:checked`);
    checked ? checkedOptions.push(checked) : null;
      console.log('checkedOptions.length: ', checkedOptions.length);
  });
  checkedOptions.length ? filteredRooms = filterRooms(filteredRooms, checkedOptions) : null;
  //designRooms(userGuest, filteredRooms, "available-room")
  const rmBtns = designRooms(filteredRooms, "available-room");
  customizeRoomBtns(rmBtns);
  activateRoomBtns(userGuest, rmBtns); 
  const wordsDate = formatDate(userGuest.searchDate, "words");
    // console.log('wordsDate: ', wordsDate);
  dataCheck(filteredRooms, "available-rooms", wordsDate);
  return userGuest;
};

function customizeRoomBtns(btns) {// *global => within filterAvailableRooms()
  // console.log('btns: ', btns)
  const assignRoomBtnTxt = (name) => {
    return name === "upcoming-booking" ? "CANCEL ROOM" 
    : name === "available-room" ? "BOOK ROOM" 
    : null;
  };

  btns.map(roomBtn => {
    roomBtn.innerText = assignRoomBtnTxt(roomBtn.name);
      //// console.log('roomBtn: ', roomBtn);
    // activateRoomBtn(userX, roomBtn); 
  });
};

function activateRoomBtns(userGuest, btns) { // *global => within filterAvailableRooms()
  //// console.log('roomBtn @activateRoomBtn(btn): ', roomBtn);
  btns.map(roomBtn  => {
    renderOutlook.toggleDisplay(roomBtn.id);
    
    roomBtn.addEventListener("click", function handleRoomBtn(e) {
      e.preventDefault();
      roomBtn.innerText.includes("CANCEL") ? cancelBooking(roomBtn, userGuest)
      : roomBtn.innerText.includes("BOOK") ? bookRoom(roomBtn, userGuest)
      : null 
    });
  });
    // const handleRoomBtn = (e) => {
    //   e.preventDefault();
    //   roomBtn.innerText.includes("CANCEL") ? cancelBooking(roomBtn, userX)
    //   : roomBtn.innerText.includes("BOOK") ? bookRoom(roomBtn, userX)
    //   : null 
    // };
};

const filterRooms = (rooms, allChecks) => {
  let totNum = rooms.length; // ***FOR TESTING PURPOSES ONLY!***
  allChecks.map(check => {
      console.log("check.name: ", check.name);
      console.log("check.value: ", check.value);
    rooms = rooms.filter(room => {
        console.log("room[check.name]: ", room[check.name]);
      return room[check.name] == check.value;
    });
  });
    console.log("total: ", totNum, "filtered: ", rooms.length)
  return rooms;
};

function clearRadios() {//*global
  const checked = document.querySelectorAll("input[type = radio]:checked");
  Array.from(checked).map(radio => radio.checked = false);
};

function activateBookingBtns(btnClass) {//*local
    // console.log('btnClass @activateBookingBtns(btnClass): ', btnClass);
  const btns = document.getElementsByClassName(btnClass);
  console.log('btns: ', btns);

  assignBtnsInnerText(btns);
  Array.from(btns).map(btn => {
    btn.addEventListener("click", function handleToggleBtn(e) {
        // console.log('e.target @activateBookingBtns(btnClass): ', e.target);
        // console.log('e.target.nextElementSibling: ', e.target.nextElementSibling ? true : false);
      const siblingElement = e.target.nextElementSibling ? e.target.nextElementSibling : e.target.previousElementSibling;
        // console.log('siblingElement: ', siblingElement);
      if (siblingElement.value === 'hide') {
        displayInfo(siblingElement, "name");
      };
      displayInfo(e.target, "name");
    });
  });  
};

function assignBtnsInnerText(btns) {
  Array.from(btns).map(btn => renderOutlook.displayBookingsBtnTxt(btn));
};

function activateRmDetailsBtns(btnName, userX) {
    console.log('btnName @actRmDetailsBtns(btnName): ', btnName);
  const btns = document.getElementsByClassName(btnName); 
  assignBtnsInnerText(btns);
  const handleRmDetailsBtn = (e) => displayRmDetails(e, userX); 
  const displayRmDetails = (e, userX) => {
      console.log('userX: ', userX);
      // console.log('USER-X @displayRmDetails:: ', userX);
      // console.log('USER @displayRmDetails: ', user);
      // console.log('e.target @displayRmDetails: ', e.target);
    const targetText = e.target.innerText;
    const targetName = e.target.name;
      // console.log('e.target.attributes: ', e.target.attributes);
      // console.log('e.target.attributes["date"]: ', e.target.attributes["date"]);
      // console.log('e.target.attributes.date: ', e.target.attributes.date);
    targetText.includes("CANCEL") ? cancelBooking(e.target, userX) : 
    targetText.includes("BOOK") ?  bookRoom(e.target, userX) :
    displayInfo(e.target, "id"); 
  };  
  Array.from(btns).map(btn => {
    btn.addEventListener("click", handleRmDetailsBtn); 
  });
}; 

// const handleToggleBtn = (e) => {
//   // console.log('e.target @activateBookingBtns(btnID): ', e.target);
//   // console.log('e.target.nextElementSibling: ', e.target.nextElementSibling ? true : false);
//   const siblingElement = e.target.nextElementSibling ? e.target.nextElementSibling : e.target.previousElementSibling;
//     // console.log('siblingElement: ', siblingElement);
//   if (siblingElement.value === 'hide') {
//     displayInfo(siblingElement, "name")
//   };
//   displayInfo(e.target, "name");
// };

function displayInfo(element, property) {//*global
  const btnID = element.name === "room-details" ? element.id.split("-").splice(0, 4).join("-") : element[property];
  // console.log('btnID: ', btnID);
  element.value = swapBtnValue(element.value); 
  renderOutlook.displayBookingsBtnTxt(element);
  renderOutlook.toggleDisplay(btnID);
};

function updateDOM() {//*local refactor!
    console.log('user @updateDOM: ', user);
  renderOutlook
  //.assignBtnToUser(user)
  .displaySection(user.type)
  .displayUser(user)
  if (user.guestAdmin) {  
    renderOutlook
    .displayGuest(user)
    .toggleDisplay("guest-page", "guest-heading-sec", "guest-bookings", "guest-btn-sec", "manager-btn-sec");
  };
  //.updateSearchBtn(user.type)
  //.customizeSection(user);
};

function displayRooms(e) {//*global
  // console.log("@displayRooms: " );
  // console.log('user.availableRooms.length @displayRooms: ', user.availableRooms.length);
  e.preventDefault();
  const date = formatDate(user.searchDate, "numbers")
  renderOutlook.showRooms("available-rooms", date);
};

function designRooms(rooms, className) {//*global
  // console.log('@renderRoomDetails(): ');
  let index, roomHTML = '', roomList, btn; //, roomBtn, btnRoom;
  roomList = document.getElementById(`${className}s-list`);
  roomList.innerHTML = "";
  // const rmBtns = rooms.map(room => {
  //   index = rooms.findIndex(roomObj => roomObj === room) + 1;
  //     //// console.log('index: ', index);
  //   roomHTML = renderOutlook.designRoomHTML(room, className, index);
  //   renderOutlook.renderRoomHTML(roomList, roomHTML);
  //   btn = roomList.lastElementChild.querySelector('button');
  //   renderOutlook.toggleDisplay(btn.parentNode.id);
  //   return btn     
  // });
  return rooms.map(room => {
    index = rooms.findIndex(roomObj => roomObj === room) + 1;
      //// console.log('index: ', index);
    roomHTML = renderOutlook.designRoomHTML(room, className, index);
    renderOutlook.renderRoomHTML(roomList, roomHTML);
    btn = roomList.lastElementChild.querySelector('button');
    renderOutlook.toggleDisplay(btn.parentNode.id);
    return btn     
  });
  //customizeRoomBtns(userX, rmBtns);
  //return user
};

function dataCheck(data, type, str) {//*global
  return data.length ? adjustForData(data, type) : adjustForNoData(type, str);
  //!hasData ? adjustForNoData(type, str) : adjustForData(data, type);
};

// function checkForData(data) {   //, type, name
//     // console.log("data.length @checkForData: ", data.length, data[0])
//   return data.length ? true : false; 
// };

function adjustForData(data, type) {//*local 
    console.log('type @adjustForData: ', type);
    // console.log('data @adjustForData: ', data);
  renderOutlook.toggleDisplay(`no-${type}`);
  type === "upcoming-bookings" ? 
  data.map(obj => renderOutlook.toggleDisplay(`cancel-btn-${obj.count}`) )
  : type === "available-rooms" ? renderOutlook.displayAdjustments(type)
  : null;
  return true;
};

function adjustForNoData(type, str) {//*local 
  renderOutlook.assignNoDataTxt(type, str);
  return false;
};

function swapBtnValue(value) {
 return value === "show" ? "hide" : "show";
};

function bookRoom(btn, userX) {
     //console.log('btn @bookRoom(): ', btn);
    console.log('userX.type @bookRoom: ', userX.type);
    console.log('user.type @bookRoom: ', user.type);
  const newBooking = { 
    userID: Number(userX.id),
    date: userX.searchDate,
    roomNumber: Number(btn.value)
  };
    console.log('newBooking @bookRoom: ', newBooking);
  const refresh = () => refreshSite();
  addBooking(newBooking)
  .then(json => {
    confirm(`
      YOUR RESERVATION HAS BEEN CONFIRMED!
      
      BOOKING CONFIRMATION (for your records):
        
      Check-in Date: ${formatDate(json.date, "numbers")}
      Room Number: ${json.roomNumber}
      Confirmation Code: ${json.id}
    `) ? loadOutlook(refresh) : null;
  })
  .catch(err => console.log("err", err))
  return user
};

function cancelBooking(btn, userX) { 
    console.log('userX.type @cancelBooking: ', userX.type);
    console.log('user.type @cancelBooking: ', user.type);
    console.log('btn @cancelBooking(btn): ', btn);
  const booking = {};
  const bkID = btn.attributes.number.nodeValue;
  const bkDate = btn.attributes.date.nodeValue;
  booking.id = Number(bkID);
    console.log('booking @cancelBooking(): ', booking);
  const cancelMessage = `You are about to cancel your reservation for ${bkDate} which CANNOT BE UNDONE! Do you wish to continue?`
  const refresh = () => refreshSite();
  confirm(cancelMessage) ? (
    deleteBooking(booking)
    .then(json => {
      const confCode = json.message.split(" ")[1];
      console.log('json.message: ', json.message);
      confirm(`
        ${json.message}.
        Please keep a record of your confirmation code: 
        ${confCode}
      `) ? loadOutlook(refresh) : null;
    })
    .catch(err => console.log('err: ', err))
  ) : null;
  return user
};

function refreshSite(logout) {//*global
    console.log('user @refreshSite: ', user);
    console.log('user.guestAdmin: ', user.guestAdmin);
  const userPage = document.getElementById("user-page");
  let types = [];
  types.push(!logout ? (user.guestAdmin ? ("guest", "manager") : user.type) : "body");
  
  console.log('types: ', types);
  resetPage(types);
 !logout ? (
    user = updateData(),
    updateDOM()
  ) : (
    document.querySelector("html").classList.remove("silver"),
    Array.from(userPage.firstElementChild.children).map(sec => sec.classList.remove("hidden")),
    userPage.classList.remove("hidden")
  )
    console.log('user @refreshSite: ', user);
  return user
};

function resetPage(types) {//*local
    console.log('types @resetPage: ', types);

  types.map(type => {
    const page = document.getElementById(`${type}-page`);
      console.log('page @resetPage: ', page);
    
    const toggleBtns = Array.from(page.querySelectorAll(".toggle-btn"));
    toggleBtns.map(btn => btn.value === "hide" ? displayInfo(btn, "name") : null);
    
    const hideAll = Array.from(page.querySelectorAll(".initial-state"));
      console.log('hideAll: ', hideAll);
    hideAll.map(hide => hide.classList.add("hidden"));
    
    const noDataTexts = Array.from(page.querySelectorAll(".no-data-text"));
    noDataTexts.map(noData => noData.classList.remove("hidden"));
  });
  const allFormIDs = Array.from(document.getElementsByTagName("form"))
  .map(form => form.id);
  console.log('allFormIDs: ', allFormIDs);
  // renderOutlook.resetForm("room-search-form"); 
  renderOutlook.resetForm(...allFormIDs); 
  
  const filterBtns = document.querySelectorAll(".filter-btn");
  Array.from(filterBtns).map(btn => btn.classList.remove("dark-red"));
  filterBtns[0].parentNode.classList.remove("btns-wrapper");
  
  document.getElementById("submit-room-search").disabled = true;
  document.getElementById("new-reservation").classList.remove("new-reservation-grid");
};

function updateData() { 
  const updatedUser = differentiateUsers(user); //creates new guest/managher
  user.guestAdmin ? updatedUser.guestAdmin = findGuestAdmin(user.guestAdmin) : null;
  return updatedUser
};
