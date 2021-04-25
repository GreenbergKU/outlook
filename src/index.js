
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

// import BookingsData from './class/data/BookingsData.js';
// import RoomsData from './class/data/RoomsData';

/*//// GLOBAL VARIABLES ////*/

let user, hotelRepo; 
//const hotel = {usersData: null, bookingsData: null, roomsData: null};
const hotel = {};
const renderOutlook = new RenderDOM();

const dayjs = require('dayjs');
//import dayjs from 'dayjs' // ES 2015
dayjs().format();


/*//// ALL FUNCTIONS /////*/

// EVENT LISTNERS
window.onload = () => {
  loadOutlook()
  .then(activateLogin());
}
// EVENT HANDLERS

// function loadOutlook() {
//   fetchData()
//   .then(data => data.bookings = makeCurrent(data.bookings))
//      // ***** FOR TESTING PURPOSES ONLY *****
//     //return data;
  
//   .then(data => {
//     hotelRepo = new HotelData(data)
//   })
//   .then( console.log('hotelRepo: ', hotelRepo)
//   )
//   .catch(err => console.log("err", err));
//   //console.log('hotelRepo: ', hotelRepo);
// };

function loadOutlook() {
  console.log('*@ loadOutlook(): *');
  const promise = fetchData()
  .then(data => {
    hotel.usersData = data.users;
    hotel.bookingsData = makeCurrent(data.bookings);
    hotel.roomsData = data.rooms;
    return hotel
  })
     // ***** FOR TESTING PURPOSES ONLY *****
    //return data;
  
  .then(hotel => {
    console.log('hotel: ', hotel);
    return hotelRepo = new HotelData(hotel);
  })
  .then( hotelRepo => console.log('hotelRepo: ', hotelRepo) )
  .catch(err => console.log("err", err));
  return promise;
  //console.log('hotelRepo: ', hotelRepo);
};


function formatDate(date, style) {
  return style === 'sort' ? dayjs(date).format("YYYYMMDD")
    : style === 'words' ? dayjs(date).format("MMMM D, YYYY") 
    : style === 'numbers' ? dayjs(date).format("MM/DD/YYYY")
    : dayjs(date).format("YYYY/MM/DD"); 
};

// ***** FOR TESTING PURPOSES ONLY *****
function makeCurrent(data) {
  console.log('*@ makeCurrent(): *');
  let date;
  return data.map(dataObj => {
    date = dayjs(dataObj.date);
    dataObj.date = formatDate(date.add(1, "year"));
      // console.log('dataObj.date @makeCurrent(data): ', dataObj.date);
    return dataObj;
  });
};
// ***** FOR TESTING PURPOSES ONLY *****

function activateLogin() {
  console.log('*@ activateLogin(): *');
  const minDate = new dayjs().add(1,"day").format("YYYY-MM-DD");
  document.getElementById("date").min = minDate;
  document.getElementById('user-submit').addEventListener("click", getLogin);
  console.log('hotelRepo @ activateLogin(): ', hotelRepo);
};

function getLogin(e) { 
  e.preventDefault();
  const form = document.getElementById("login");
  const userInputs = findInputs(form);
    console.log('userInputs: ', userInputs);
    // findInputs("login");
    // console.log('userInputs: ', userInputs);
    //console.log('Array.from(userInputs): ', Array.from(userInputs));
  const validInputs = validateInputs(userInputs); 
  console.log('validInputs: ', validInputs);
  
  validInputs ? (
    user = createUser(userInputs),
      // console.log('user: ', user),
    // ******
    user.isValid = validateUser(user),
    //user.isValid = validate(user.id, user.password),
      console.log('user.isValid: ', user.isValid)
  ) : alert("All Fields Are Required!");
  // console.log('user.isValid: ', user.isValid);
  user = checkValidity(user);
    // console.log('user: ', user);
  user ? (
      console.log('user @getLogin(e): ', user),
    addListeners(user),
    updateDOM(user)
    //document.getElementById("form-user").classList.remove("sign-in");
    //document.querySelector(".submit-user").removeEventListener("click", getLogin);
   ) : null;
};

function validateUser(user) {
  return hotelRepo.validateUser(user);
}

// function validate(id, password) {
//   return hotelRepo.userValidation(id, password);
// }

function checkValidity(user) {
  if (user.isValid) {
      // console.log('user @:checkValidity ', user);
    return user.fullName ? findGuestAdmin(user.fullName)
    : differentiateUsers(user);
    // updateDOM(user);
    // document.getElementById("form-user").classList.remove("sign-in");
    // document.querySelector(".submit-user").removeEventListener("click", getLogin);
    //return user
  } else null 
};

function findInputs(form) {
  const inputs = {};
  //const form = document.getElementById(`${formID}`);
  const selector = `input[class ~= "${form.id}-input"]`
  //const selector = "input[class ~= " + `"${iClass}"]`
    console.log('selector: ', selector);
    //console.log('("input[class ~= " + `${iClass}]`: ', `input[class ~= ${iClass}]`);
  inputs.arr = Array.from(form.querySelectorAll(selector))
  .map(input => {
    return inputs[`${input.id}`] = {
      id: `${input.id}`,
      element: input,
      value: input.value,    
    };
  });
  //console.log('allInputs: ', allInputs);
  // console.log('inputs: ', inputs);
  // console.log("Array.from(inputs): ", Array.from(inputs));
  return inputs
  // console.log("inputs: ", inputs);
  // return Array.from(inputs)
};



// function getInputs() {
//   const nameInput = document.getElementById("name");
//   const passwordInput = document.getElementById("password");
//     // console.log("nameInput.value:", nameInput.value.toLowerCase());
//   return  {
//     nameInput: nameInput,
//     name: `${nameInput.value.toLowerCase()}`,
//     passwordInput: passwordInput, 
//     password: `${passwordInput.value}`
//   };
// };

// function validateForm(user) {
//   //const validInputs = validateInputs(formInputs);
//   //const validLogin = validateLogin(formInputs);
//   //const allUsers = hotelRepo.totalUsers;
//   return hotelRepo.validateLogin(user);
//   //return !!validInputs && !!validLogin;
// };

function validateInputs(inputs) {
  const isValid = inputs.arr.map(input => {
    // console.log("input.value: ", input.value);
    if(!input.value) console.log('input.invalid = true: ', input.invalid = true);
    //input.invalid = true;
      // console.log('input: ', input);
    return input;
  })     
  .find(input => input.invalid === true);
    // console.log('isValid: ', isValid);
    // console.log('isValid === undefined: ', isValid === undefined); 
  return isValid === undefined;  
};

function createUser(inputs) {
  // console.log('inputs: ', inputs, inputs.username, inputs.password);
  return new User(inputs.username.value, inputs.password.value).formatUser();
};

// function validateLogin(user) {
//   const allUsers = hotelRepo.totalUsers;
//   return user.validateUser(inputs, allUsers);
// };

function differentiateUsers() {
    // console.log('user@diff: ', user);
  const date = formatDate(new dayjs());
    // console.log('date: ', date);
  user = user.type === "guest" ? createGuest("id", user.id, user.date) : createManager(hotelRepo, user.date); 
  //console.log('user @differentiateUsers: ', user);
  // addListeners(user);
  // activateUserBtn(user); 
  return user
};

// function customizeUser(user) {  
//   return user.type === "guest" ? customizeGuest(user) : customizeManager(user);
// };

function createManager(hotelRepo, date) {
  const manager = new Manager(hotelRepo, date);
  return customizeManager(manager);
};

function customizeManager(manager) {

  const USD = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  });
  const percent = new Intl.NumberFormat('en-US' , {
    style: 'percent'
  });
  const bookedRooms = hotelRepo.findBookings("date", manager.date);
  manager.roomsAvailable =  hotelRepo.findAvailableRooms(bookedRooms);
  manager.availableRoomsNum = manager.roomsAvailable.length;
  manager.revenue = USD.format(findTotalAmount(bookedRooms));
  manager.roomsOccupied = percent.format(hotelRepo.calculatePercentage(bookedRooms.length, manager.totalRooms));
    // console.log('manager @customizeManager(manager): ', manager);

  //activateSearchBtn(manager);
  return manager
};

function createGuest(property, value, date) {
  const userData = hotelRepo.findGuestByProperty(property, value);
    // console.log('hotelRepo @createGuest: ', hotelRepo);
    // console.log('userData @createGuest: ', userData);
  const guest = new Guest(userData, date);
  
  return customizeGuest(guest);
};

function customizeGuest(guest) {
    //console.log('@ CUSTOMIZE GUEST(guest):');
    // console.log('guest1: ', guest);

  const USD = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  });
  guest.bookings = findGuestBookings(guest);
    // console.log('guest2: ', guest);
    // console.log("hotelRepo.roomsData: ", hotelRepo.roomsData)

  guest.sortedBookings = sortBookingsByDate(guest);
    // console.log('guest3: ', guest);

  guest.amountSpent = USD.format(findTotalAmount(guest.bookings));
    // console.log("guest.amountSpent @customizeGuest: ", guest.amountSpent);
    // console.log('guest @ CUSTOMIZE GUEST(guest): ', guest);

  displayBookings(guest);

  //activateBookingBtns("booking-btn");
  //activateRmDetailsBtns("booking-details-btn", guest);
  //activateRoomSearchBtns(guest);
  //activateFilter(guest);
  
  return guest;
};

//const showSearchUser = (e) => showSearch(e, user);
function addListeners(user) {
    console.log('user.type @addListeners(): ', user.type);
  activateUserBtn(user);
  if (user.type === "manager") {
      // console.log('user @addListeners(manager): ', user);
    activateUserSearchBtn(user);
  } else {
      // console.log('user @addListeners(!manager): ', user);
    activateBookingBtns("booking-btn");
    activateRmDetailsBtns("booking-details-btn", user);
    activateFilter(user);
    activateRoomSearchBtns(user);
  };
}

function activateUserBtn(user) {
    //console.log('@activateUserBtn: ', user.subType);   
  // const btnTxt = user.type === "guest" ? "find rooms" : "find guest";  
  // renderOutlook.updateSearchBtn(btnTxt);
  const showSearchUser = (e) => showSearch(e);
  document.getElementById(`${user.type}-btn`).addEventListener("click", showSearchUser);
}; 

function showSearch(e) {
    console.log('e.target @showSearch: ', e.target);
    //console.log('user @showSearch: ', user);
  renderOutlook.resetForm("room-search-form");
  renderOutlook.displaySearchForm(e.target);
  const filterBtn = document.getElementById("filter-btn");
  renderOutlook.displayBookingsBtnTxt(filterBtn);
  //renderOutlook.toggleDisplay("login-name");
};  

function activateUserSearchBtn() {
  const searchName = {};
  const userSearchBtn = document.getElementById("find-guest-btn");
  userSearchBtn.addEventListener("click", function handleSearchBtn(e) {
    e.preventDefault();
    const form = document.getElementById("user-search");
    const userInputs = findInputs(form);
      console.log('userInputs: ', userInputs);
    const validInputs = validateInputs(userInputs); 
      console.log('validInputs: ', validInputs);
    validInputs ? (
      searchName.fullName = userInputs.fullName.value,
        console.log('searchName: ', searchName),
      // ******
      searchName.isValid = validateUser(searchName),
      //searchName.isValid = validate(searchName.id, searchName.password),
        console.log('searchName.isValid: ', searchName.isValid)
      ) : alert("full name is required!");
    user.guestAdmin = checkValidity(searchName);
    user.guestAdmin ? (
      addListeners(user.guestAdmin),
      displayGuestAdmin(user.guestAdmin)
    ) : null;
  });
  return user
};

  /* console.log('user.subType @activateUserBtn(): ', user.subType); 
    const nameInput = document.getElementById("name");
    const findGuestInput = (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("name").value;
      console.log('nameInput: ', nameInput);
      return findGuestAdmin(nameInput);
    };
  */

function findGuestAdmin(name) {
  // console.log('@ findGuestAdmin(btn): ');
  //e.preventDefault();
  //const nameInput = document.getElementById("name");
  return createGuest("name", name, user.date);
  //user.guestAdmin = customizeUser(guest);
  //activateUserBtn(guestAdmin);
  //displayGuestAdmin(guestAdmin);
    // console.log('document.getElementById("new-reservation-btn"): ', document.getElementById("new-reservation-btn"));
  //return guestAdmin
}; 

function displayGuestAdmin(user) {
  renderOutlook
  //.assignBtnToUser(user)
  .displayGuest(user)
  .displayGuestHeader(user)
  .toggleDisplay("guest-page", "user-search", "guest-heading-sec", "guest-bookings", "guest-btn-sec");
  return user;  
};

function activateRoomSearchBtns(user) {
  const inputDate = document.getElementById("date");
  const roomSearchBtn = document.getElementById("submit-room-search");
  roomSearchBtn.disabled = true;  
    // console.log('roomSearchBtn @activateUserBtn(): ', roomSearchBtn);   
  
  const handleChangeDate = (e) => datePickerChange(e, user);
  inputDate.addEventListener("change", handleChangeDate);
  
  
  function datePickerChange(e, user) {
     console.log('user @actRmSearchBtns(datePicker): ', user); 
    const datePicked = dayjs(e.target.value);
    const validDate = formatDate(datePicked);
    datePicked.isValid ? findAvailableRooms(user, validDate, roomSearchBtn) : null;    
  };
  
  roomSearchBtn.addEventListener("click", displayRooms);
};
  // (e) => {
  //     // console.log('e.target @actRmSearchBtns(datePicker): ', e.target); 
  //   const datePicked = dayjs(e.target.value);
  //   const validDate = () => formatDate(datePicked);
  //   datePicked.isValid ? findAvailableRooms(user, validDate(), roomSearchBtn) : null       
  // });
    // (e) => {
  //   e.preventDefault();
  //   displayRooms();
  // });


function findGuestBookings(user) {
    // console.log('hotelRepo.findBookings("userID", userID): ', hotelRepo.findBookings("userID", userID));
  const userBookings = hotelRepo.findBookings("userID", user.id);
  return user.sortChronically(userBookings, formatDate);
};

function sortBookingsByDate(user) {
    // console.log('user @sortBookingsByDate: ', user);
    // console.log('user.bookings @sortBookingsByDate: ', user.bookings);
 return user.sortByDate(user.bookings, formatDate);
};

function findTotalAmount(data) {
    // console.log('data: ', data);  
  return hotelRepo.calculateAmountTotals(data);
};

function displayBookings(user) {
  let bookingHTML, num, roomHTML;
  const getBtnClass = (type) => type === "upcoming-bookings" ? "btns-wrapper" : "btn-wrapper";
  user.sortedBookings.map(bookingTypes => {
    const bookingType = bookingTypes.name;
      
    const bookingsList = document.getElementById(`${bookingType}-list`);
      // console.log('bookingsList: ', bookingsList);
    bookingsList.innerHTML = "";
    const className = bookingType.slice(0, -1);
    // console.log('bookingTypes.data: ', bookingTypes.data);
    num = 1;
    const btnClass = getBtnClass(bookingType);
      // console.log('bookingType: ', bookingType);
      // console.log('btnClass: ', btnClass);

    bookingTypes.data.map(booking => {
      booking.count = num;
      booking.room = hotelRepo.findRoom("number", parseInt(booking.roomNumber))[0];
      bookingHTML = renderOutlook.designBookingHTML(booking, className, formatDate);
      roomHTML = renderOutlook.designRoomHTML(booking.room, className, booking.count);
      renderOutlook.renderBookingHTML(bookingsList, bookingHTML, roomHTML);
      document.getElementById(`${className}-rmBooking${num}-btns`).classList.add(btnClass);
      num++;
    });
    
    // const hasData = checkForData(bookingTypes.data);
    // !hasData ? adjustForNoData(bookingType, user.name) : adjustForData(bookingTypes.data, bookingType);
    dataCheck(bookingTypes.data, bookingType, user.name)
  });
  return user
};

function displayRooms(e) {
  // console.log("@displayRooms: " );
  // console.log('user.availableRooms.length @displayRooms: ', user.availableRooms.length);
  e.preventDefault();
  const date = formatDate(user.searchDate, "numbers")
  renderOutlook.showRooms("available-rooms", date);
};

function designRooms(userX, rooms, className) {
  // console.log('@renderRoomDetails(): ');
  let index, roomHTML = '', roomList, btn; //, roomBtn, btnRoom;
  roomList = document.getElementById(`${className}s-list`);
  roomList.innerHTML = "";
  const rmBtns = rooms.map(room => {
    index = rooms.findIndex(roomObj => roomObj === room) + 1;
      //// console.log('index: ', index);
    roomHTML = renderOutlook.designRoomHTML(room, className, index);
    renderOutlook.renderRoomHTML(roomList, roomHTML);
    btn = roomList.lastElementChild.querySelector('button');
    renderOutlook.toggleDisplay(btn.parentNode.id);
    return btn     
  });
  customizeRoomBtns(userX, rmBtns);
  return user
};

function dataCheck(data, type, str) {
  const hasData = checkForData(data);
  !hasData ? adjustForNoData(type, str) : adjustForData(data, type);
}

function checkForData(data) {   //, type, name
    // console.log("data.length @checkForData: ", data.length, data[0])
  return data.length ? true : false; 
};

function adjustForData(data, type) { 
    // console.log('type @adjustForData: ', type);
    // console.log('data @adjustForData: ', data);
  renderOutlook.toggleDisplay(`no-${type}`);
  type === "upcoming-bookings" ? 
  data.map(obj => renderOutlook.toggleDisplay(`cancel-btn-${obj.count}`) )
  : type === "available-rooms" ? renderOutlook.displayAdjustments(type)
  : null;
};

function adjustForNoData(type, str) {
  renderOutlook.assignNoDataTxt(type, str);
};

function activateBookingBtns(btnID) {
    // console.log('btnID @activateBookingBtns(btnID): ', btnID);
  const btns = document.getElementsByClassName(btnID);
  assignBtnsInnerText(btns);

  Array.from(btns).map(btn => {
    btn.addEventListener("click", handleToggleBtn);
  });  
    // (e) => {
    //     // console.log('e.target @activateBookingBtns(btnID): ', e.target);
    //     // console.log('e.target.nextElementSibling: ', e.target.nextElementSibling ? true : false);
    //   const siblingElement = e.target.nextElementSibling ? e.target.nextElementSibling : e.target.previousElementSibling;
    //     // console.log('siblingElement: ', siblingElement);
    //   if (siblingElement.value === 'hide') {
    //     displayInfo(siblingElement, "name")
    //   };
    //   displayInfo(btn, "name");
    // });
};

const handleToggleBtn = (e) => {
    // console.log('e.target @activateBookingBtns(btnID): ', e.target);
    // console.log('e.target.nextElementSibling: ', e.target.nextElementSibling ? true : false);
  const siblingElement = e.target.nextElementSibling ? e.target.nextElementSibling : e.target.previousElementSibling;
    // console.log('siblingElement: ', siblingElement);
  if (siblingElement.value === 'hide') {
    displayInfo(siblingElement, "name")
  };
  displayInfo(e.target, "name");
};

function assignRoomBtnTxt(name) {
  return name === "upcoming-booking" ? "CANCEL ROOM" 
  : name === "available-room" ? "BOOK ROOM" 
  : null;
};

function customizeRoomBtns(userX, btns) {
    // console.log('btns: ', btns);
  btns.map(roomBtn => {
    roomBtn.innerText = assignRoomBtnTxt(roomBtn.name); 
      //// console.log('roomBtn: ', roomBtn);
    activateRoomBtn(userX, roomBtn); 
  });
};

function activateRoomBtn(userX, roomBtn) {
    //// console.log('roomBtn @activateRoomBtn(btn): ', roomBtn);
  renderOutlook.toggleDisplay(roomBtn.id);
  
  
  const handleRoomBtn = (e) => {
    e.preventDefault();
    roomBtn.innerText === "CANCEL ROOM" ? cancelRoom(roomBtn, userX)
    : roomBtn.innerText === "BOOK ROOM" ? bookRoom(roomBtn, userX)
    : null 
  };
  
  roomBtn.addEventListener("click", handleRoomBtn);
};

function displayInfo(element, property) {
  // console.log('element: ', element);
  // console.log('element.num: ', element.num);
  // console.log('property: ', property);
  const btnID = element.name === "room-details" ? element.id.split("-").splice(0, 4).join("-") : element[property];
  // console.log('btnID: ', btnID);
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

function activateRmDetailsBtns(btnName, userX) {
    console.log('btnName @actRmDetailsBtns(btnName): ', btnName);
  const btns = document.getElementsByClassName(btnName); 
    // console.log('btns: ', btns);
  assignBtnsInnerText(btns);

  const handleRmDetailsBtn = (e) => displayRmDetails(e, userX);
  
  const displayRmDetails = (e, userX) => {
      //console.log('userX: ', userX);
      console.log('USER-X @displayRmDetails:: ', userX);
      console.log('USER @displayRmDetails: ', user);
      console.log('e.target @displayRmDetails: ', e.target);
    const targetText = e.target.innerText;
    const targetName = e.target.name;
      // console.log('e.target.attributes[3].nodeValue: ', e.target.attributes[3].nodeValue);
    const id = e.target.attributes[3].nodeValue;
      console.log('id @displayRmDetails: ', id);
    targetText.includes("CANCEL") ? cancelBooking(id, userX) : 
    targetText.includes("BOOK") ?  bookRoom(e.target, userX) :
    displayInfo(e.target, "id"); 
  };  

  Array.from(btns).map(btn => {
    btn.addEventListener("click", handleRmDetailsBtn); 
  });
};  

function activateFilter(userX) {
    // console.log('user @activateFilter: ', user);
    // console.log('user.availableRooms: ', user.availableRooms);
  activateFilterBtns();
  const radios = document.querySelectorAll("input[type = radio]");
  const radioFilters = document.getElementById("radio-filters");
  radioFilters.addEventListener("change", (e) => {
    e.preventDefault();
      // console.log('e.target @activateFilter(): ', e.target);
      // console.log('user.availableRooms @activateFilter(): ', user.availableRooms);
    userX.searchDate ? filterAvailableRooms(userX) : null;
  });
};

function activateFilterBtns(userX) {
  const filterBtn = document.getElementById("filter-btn");
  const resetBtn = document.getElementById("reset-filters");
 
  const displayFilters = (e) => {
    e.preventDefault();
    displayFilterSec();
  };
  filterBtn.addEventListener("click", displayFilters);
  
  // (e) => {
  //   e.preventDefault();
  //   displayFilterSec(filterBtn, resetBtn);
  // });
  
  const resetFilters = (e) => {
    e.preventDefault();
    const roomSearchBtn = document.getElementById("submit-room-search");
    //resetRoomSearch("new-reservation");
    clearRadios();
    findAvailableRooms(user, user.searchDate, roomSearchBtn);
  };

  resetBtn.addEventListener("click", resetFilters);
  // (e) => {
  //   e.preventDefault();
  //   resetRoomSearch("new-reservation")
  // });   
};

function displayFilterSec() { 
  
  const filterBtn = document.getElementById("filter-btn");
  const resetBtn = document.getElementById("reset-filters");  
    // console.log('filterBtn @displayFilterSec(filterBtn): ', filterBtn);
  renderOutlook.toggleDisplay(filterBtn.name, resetBtn.id);
  
  document.getElementById("filter-btns").classList.toggle("btns-wrapper");
  //document.getElementById("filter-btns").classList.toggle("dark-red");
  
  const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));
  filterBtns.map(btn => btn.classList.toggle("dark-red"));
  
  filterBtn.value = swapBtnValue(filterBtn.value); 
  renderOutlook.displayBookingsBtnTxt(filterBtn);
};

function findAvailableRooms(userX, date, btn) {
    // console.log('@findAvailableRooms(user): ');
    // console.log('user @findAvailableRooms(user): ', user);
    // console.log('date @findAvailableRooms(user): ', date);
  userX.searchDate = date;
  btn.disabled = false;
  const roomsBooked = hotelRepo.findBookings("date", date);
  const availableRooms = hotelRepo.findAvailableRooms(roomsBooked);
  userX.availableRooms = availableRooms;
  filterAvailableRooms(userX);
  return userX; 
};

function filterAvailableRooms(userX) {
    console.log('@filterAvailableRooms: ');
    console.log('userX.type @filterAvailableRooms: ', userX.type);
    console.log('user.availableRooms @filterAvailableRooms: ', user.availableRooms);
    console.log('userX.searchDate @filterAvailableRooms: ', userX.searchDate);
  let filteredRooms = userX.availableRooms;
  const roomOptions = ["roomType", "bedSize", "numBeds"];
  let checked;
  let checkedOptions = [];
  roomOptions.forEach(option => {
    checked = document.querySelector(`input[name = ${option}]:checked`);
    checked ? checkedOptions.push(checked) : null;
      console.log('checkedOptions.length: ', checkedOptions.length);
  });
	checkedOptions.length ? filteredRooms = filterRooms(filteredRooms, checkedOptions) : null;
  
  designRooms(userX, filteredRooms, "available-room");
  const wordsDate = formatDate(userX.searchDate, "words");
    // console.log('wordsDate: ', wordsDate);
  dataCheck(filteredRooms, "available-rooms", wordsDate);
  return userX;
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

// function findCheckID(check) {
//   if (check.name === "roomType") {
//     return check.id.split("-").join(" ");
//    };
//    if (check.name === "bedSize") {
//      return check.id;
//    };
//    if (check.name === "numBed") {
//      return Number(check.id);
//    };
// };

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
  addBooking(newBooking, formatDate) //,  loadOutlook, updateData, userX)
  .then(loadOutlook())
  .then(refreshSite(user, userX))
  .catch(err => console.log('err: ', err));
  return user
};

function cancelBooking(id, userX) {
    console.log('userX.type @cancelBooking: ', userX.type);
    console.log('user.type @cancelBooking: ', user.type);
    // console.log('btn @cancelBooking(btn): ', btn);
  const booking = {}
    // console.log('typeof(id): ', typeof(id));
  booking.id = Number(id);
     console.log('booking @cancelBooking(): ', booking);
  const bk = userX.filterData(userX.sortedBookings[0].data, "id", id)
    // console.log('bk @cancelBooking(): ', bk);
  const date = formatDate(bk.date, "numbers");
  const cancelMessage = `You are about to cancel your reservation for ${date} which CANNOT BE UNDONE! Do you wish to continue?`
  
  if (confirm(cancelMessage)) {
    deleteBooking(booking)
    // .then(loadOutlook())  
    .then(loadOutlook())
    .then(refreshSite(user, userX))
    .catch(err => console.log('err: ', err));
    console.log("user: ", user)
  };
  return user
};

function updateData(userX) {  
  //resetRoomSearch(`${user.type}-page`);
  const updatedUser = differentiateUsers(); //creates new guest/managher
  user.name != userX.name ? updatedUser.guestAdmin = findGuestAdmin(userX.name) : null;
  return updatedUser
};

function refreshSite(user, userX) {
  let types = [user.type]
  //resetPage(`${user.type}-page`);
  //differentiateUsers();
  if (user != userX) {
    types.push(userX.type);
    //findGuestAdmin(userX.name);
  };
  resetPage(types);
  return user = updateData(userX);
};

function resetPage(types) {
    console.log('types @resetPage: ', types);
  // const filterBtn = document.getElementById("filter-btn");
  // filterBtn.value === "hide" ? displayFilterSec() : null;
  types.map(type => {
    //const pageID = `${type}-page`;
      //console.log('pageID @resetPage: ', pageID);
    const page = document.getElementById(`${type}-page`);
      console.log('page @resetPage: ', page);
    //**reset(page)**; 
    const toggleBtns = Array.from(page.querySelectorAll(".toggle-btn"));
    toggleBtns.map(btn => btn.value === "hide" ? displayInfo(btn, "name") : null);
    //const page = document.getElementById(pageID); 
    const hideAll = Array.from(page.querySelectorAll(".initial-state"));
      // console.log('hideAll: ', hideAll);
    hideAll.map(hide => hide.classList.add("hidden"));
    const noDataTexts = Array.from(page.querySelectorAll(".no-data-text"));
    noDataTexts.map(noData => noData.classList.remove("hidden"));
    document.querySelector(`.${type}-btn-sec`).classList.remove("hidden");
    // renderOutlook.toggleDisplay("user-page");
  });
  //clearRadios();
  renderOutlook.resetForm("room-search-form"); 
  const filterBtns = document.querySelectorAll(".filter-btn");
  Array.from(filterBtns).map(btn => btn.classList.remove("dark-red"));
  filterBtns[0].parentNode.classList.remove("btns-wrapper");
  
  document.getElementById("submit-room-search").disabled = true;
  document.getElementById("new-reservation").classList.remove("new-reservation-grid");
  //document.getElementById("filter-btns").classList.remove("btns-wrapper");
};

function clearRadios() {
  //document.getElementById("room-search-form").reset(); 
  const checked = document.querySelectorAll("input[type = radio]:checked");
  Array.from(checked).map(radio => radio.checked = false);
};

// function refreshDOM(userX) {
//   console.log('user: ', user);
//   console.log('userX: ', userX);

// }

function updateDOM(user) { 
  renderOutlook
  //.assignBtnToUser(user)
  .displaySection(user.type)
  //.updateSearchBtn(user.type)
  .customizeSection(user);
};

// HELPER FUNCTIONS
