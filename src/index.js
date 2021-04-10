
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
//console.log('result: ', result);
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
  .then(data => hotelRepo = new HotelData(data))
  .then(activateForm());
  //return hotelRepo
};

function formatDate(date, style) {
  return style === 'sort' ? dayjs(date).format("YYYYMMDD")
    : style === 'words' ? dayjs(date).format("MMMM d, YYYY") 
    : dayjs(date).format("YYYY/MM/DD"); 
};

// ***** FOR TESTING PURPOSES ONLY *****

function makeCurrent(data) {
  data.map(dataObj => {
    let date = dayjs(dataObj.date);
    dataObj.date = formatDate(date.add(1, "year"));
    //console.log('dataObj.date @makeCurrent(data): ', dataObj.date);
  });
};

function simulateLogin() {
  getLogin();
}

// function addTestingData(dataGroup, dataSets) {
//   let group = dataGroup;
//   //dataSets.map(dataSet => dataGroup.push(dataSet));
//   dataGroup.push(...dataSets);
//     console.log("dataGroup === group: ", dataGroup === group);
// };

// ***** FOR TESTING PURPOSES ONLY *****
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

function activateForm() {
  const minDate = new dayjs().add(1,"day").format("YYYY-MM-DD");
  document.getElementById("date").min = minDate;
  document.getElementById('user-submit').addEventListener("click", getLogin);
  // resetRoomSearch();
};

function getLogin(e) {
  e.preventDefault();
  const inputs = getInputs();
  const validForm = validateForm(inputs);
  validForm ? differentiateUsers(inputs) : alert("wrong username or password");
  document.querySelector(".submit-user").removeEventListener("click", getLogin);
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
  user = user.username === "guest" ? createGuest("id", user.userID, user.date) : createManager(hotelRepo, user.date); 
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
  return user.type === "guest" ? customizeGuest(user) : customizeManager(user);
};

function createManager(hotelRepo, date) {
  return new Manager(hotelRepo, date);
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

function customizeGuest(user) {
  console.log('@ CUSTOMIZE GUEST(user):');
  console.log('user1: ', user);

  const USD = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  });
  //user.bookings = hotelRepo.findBookings("userID", user.id);
  user.bookings = findGuestBookings(user);
  //findBookingDetails(user.bookings);
    console.log('user2: ', user);
    console.log("hotelRepo.roomsData: ", hotelRepo.roomsData)

  user.sortedBookings = sortBookingsByDate(user);
    console.log('user3: ', user);

  user.amountSpent = USD.format(findTotalAmount(user.bookings));
    console.log("user.amountSpent @customizeGuest: ", user.amountSpent);
  
  displayBookings(user);
  activateBookingBtns("booking-btn");

  activateRoomSearchBtns(user);
  activateRmDetailsBtns("booking-details-btn");
  activateFilter(user);

  //renderRoomDetails(user.sortedBookings);
  console.log('user @customizeGuest(user): ', user);
  return user;
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
const showSearchUser = (e) => showSearch(e, user);

function activateUserBtn(user) {
  console.log('@activateUserBtn: ', user); 
    //console.log('user @actUserBtn: ', user);
    //const userBtn = document.getElementById('userBtn');
  renderOutlook.updateSearchBtn(user.searchBtn);
  document.getElementById('userBtn').addEventListener("click", showSearchUser);
}; 

function showSearch(e, user) {
  console.log('e.target @showSearch: ', e.target);
  console.log('user @showSearch: ', user);
  const rmSearchBtns = document.getElementsByClassName("room-search-btn");  
  const targetName = e.target.name;
  const targetBtn = `${targetName}-btn`;
    console.log('targetBtn @activateUserBtn(): ', targetBtn);
    console.log('targetName @activateUserBtn(): ', targetName);
  renderOutlook.resetForm("room-search-form")
  renderOutlook.displaySearchForm(e.target);
  const filterBtn = document.getElementById("filter-btn");
  renderOutlook.displayBookingsBtnTxt(filterBtn);
  renderOutlook.toggleDisplay("login-name");
  // document.querySelector(".submit-user").removeEventListener("click", getLogin);
  // renderOutlook.updateSearchBtn(targetName, user.searchBtn.toUpperCase());
}  

function activateSearchBtn() {
  const searchBtn = document.querySelector(".submit-user");
    console.log('searchBtn @activateUserBtn(): ', searchBtn); 
  searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    findGuestAdmin();
  });
};

function activateRoomSearchBtns(user) {
  const inputDate = document.getElementById("date");
  const roomSearchBtn = document.getElementById("submit-room-search");
  roomSearchBtn.disabled = true;
  
    console.log('roomSearchBtn @activateUserBtn(): ', roomSearchBtn);   
  inputDate.addEventListener("change", (e) => {
      console.log('e.target @actRmSearchBtns(datePicker): ', e.target); 
    const datePicked = dayjs(e.target.value);
    const validDate = () => formatDate(datePicked);
    datePicked.isValid ? findAvailableRooms(user, validDate(), roomSearchBtn) : null       
  });      
  roomSearchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayRooms();
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
  let bookingHTML, num, roomHTML;
  user.sortedBookings.map(bookingTypes => {
    //const bookingsList = document.getElementById(bookingTypes.name);
    const bookingType = bookingTypes.name;
      console.log('bookingType: ', bookingType);
    const bookingsList = document.getElementById(`${bookingType}-list`);
      console.log('bookingsList: ', bookingsList);
    bookingsList.innerHTML = "";
    const className = bookingType.slice(0, -1);
    console.log('bookingTypes.data: ', bookingTypes.data);
    num = 1
    bookingTypes.data.map(booking => {
      booking.count = num;
      booking.room = hotelRepo.findRoom("number", booking.roomNumber)[0];
      bookingHTML = renderOutlook.designBookingHTML(booking, className);
      roomHTML = renderOutlook.designRoomHTML(booking.room, className, booking.count);
      renderOutlook.renderBookingHTML(bookingsList, bookingHTML, roomHTML);
      num++
      // return booking
    });
    const hasData = checkForData(bookingTypes.data);
      console.log(bookingTypes.name, 'hasData ???: ', hasData, !hasData ? true:false);
    !hasData ? adjustForNoData(bookingType, user.name) : adjustForData(bookingTypes.data, bookingType);
    // return bookingTypes
  });
  //checkForData(user.sortedBookings, user.name);
  return user
};

function displayRooms() {
  console.log("@displayRooms: " );
  console.log('user.availableRooms.length @displayRooms: ', user.availableRooms.length);
  // if(!user.availableRooms) findAvailableRooms();
  renderOutlook.toggleDisplay("available-rooms");
};

function designRooms(userX, rooms, className) {
  console.log('@renderRoomDetails(): ');
  let index, roomHTML = '', roomList, roomBtn;
  roomList = document.getElementById(`${className}s-list`);
  roomList.innerHTML = "";
  const rmBtns = rooms.map(room => {
    index = rooms.findIndex(roomObj => roomObj === room);
      //console.log('index: ', index);
    roomHTML = renderOutlook.designRoomHTML(room, className, index);
    renderOutlook.renderRoomHTML(roomList, roomHTML);
    roomBtn = roomList.lastElementChild;
      // console.log('roomBtn @displayRooms: ', roomBtn); 
    return roomBtn      
  });
  customizeRoomBtns(userX, rmBtns);
  return user
};

function dataCheck(data, type, str) {
  const hasData = checkForData(data);
  !hasData ? adjustForNoData(type, str) : adjustForData(data, type);
}

function checkForData(data) {   //, type, name
  // data.map(type => {
  console.log("data.length @checkForData: ", data.length, data[0])
  return data.length ? true : false; 
};

function adjustForData(data, type) { 
    console.log('type @adjustForData: ', type);
    console.log('data @adjustForData: ', data);
  renderOutlook.toggleDisplay(`no-${type}`);
  type === "upcoming-bookings" ? 
  data.map(obj => renderOutlook.toggleDisplay(`cancel-btn-${obj.count}`) )
  : type === "available-rooms" ? renderOutlook.availableRoomsAdjustments(type)
  : null;
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

function customizeRoomBtns(userX, btns) {
    console.log('btns: ', btns);
  btns.map(roomBtn => {
    roomBtn.innerText = assignRoomBtnTxt(roomBtn.name); 
      //console.log('roomBtn: ', roomBtn);
    activateRoomBtn(userX, roomBtn); 
  });
};

function activateRoomBtn(userX, roomBtn) {
    //console.log('roomBtn @activateRoomBtn(btn): ', roomBtn);
  renderOutlook.toggleDisplay(roomBtn.id);
  roomBtn.addEventListener("click", (e) => {
    e.preventDefault();
    roomBtn.innerText === "CANCEL ROOM" ? cancelRoom(roomBtn)
    : roomBtn.innerText === "BOOK ROOM" ? bookRoom(roomBtn, userX)
    : null 
  });
};

function displayInfo(element, property) {
  console.log('element: ', element);
  console.log('element.num: ', element.num);
  console.log('property: ', property);
  const btnID = element.name === "room-details" ? element.id.split("-").splice(0, 3).join("-") : element[property];
  console.log('btnID: ', btnID);
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

function activateFilter(userX) {
    console.log('user @activateFilter: ', user);
    console.log('user.availableRooms: ', user.availableRooms);
  activateFilterBtns();
  // const checkboxes = document.querySelectorAll("input[type = checkbox]");
  // const filter = document.getElementById("filters");
  //   console.log('checkboxes: ', checkboxes);
  // filter.addEventListener("change", (e) => {
  //   e.preventDefault();
  //     console.log('e.target @activateFilter(): ', e.target);
  //     console.log('user.availableRooms @activateFilter(): ', user.availableRooms);
  //   const type = e.target.type;
  //   const typeChecks = Array.from(document.querySelectorAll(`input[name = ${type}]`));
  //   typeChecks.filter(check => check.id != e.target.id)
  //   .map(check => check.checked = false)
  //   // const roomTypes = Array.from(document.querySelectorAll("input[name = roomType]:checked"));
  //   // e.target.name === "roomType" ? e.target.id =  e.target.id.split("-").join(" ") 
  //   // : e.target.name === "bedSize" ? 
  //   filterAvailableRooms(userX, user.searchDate);
  // });

  const radios = document.querySelectorAll("input[type = radio]");
  const radioFilters = document.getElementById("radio-filters");
  radioFilters.addEventListener("change", (e) => {
    e.preventDefault();
      console.log('e.target @activateFilter(): ', e.target);
      console.log('user.availableRooms @activateFilter(): ', user.availableRooms);
    // const type = e.target.type;
    // const typeRadios = Array.from(document.querySelectorAll(`input[name = ${type}]`));
    // typeChecks.filter(check => check !== e.target)
    // .map(check => check.checked = false)
    // const roomTypes = Array.from(document.querySelectorAll("input[name = roomType]:checked"));
    // e.target.name === "roomType" ? e.target.id =  e.target.id.split("-").join(" ") 
    // : e.target.name === "bedSize" ? 
    filterAvailableRooms(userX, user.searchDate);
  });
};

function activateFilterBtns() {
  const filterBtn = document.getElementById("filter-btn");
  const resetBtn = document.getElementById("reset-filters");
  filterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayFilterSec(filterBtn, resetBtn);
  });
  resetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //resetRoomSearch();
    renderOutlook.resetForm("room-search-form");
    document.getElementById("submit-room-search").disabled = true;
    displayRooms();
  });    
};

function displayFilterSec() { 
  const filterBtn = document.getElementById("filter-btn");
  const resetBtn = document.getElementById("reset-filters");
    // btn = 
      // <button id="filter-btn" value="show" name="filter-options" class="room-search-btn">
      //   FILTER OPTIONS
      // </button>
    console.log('filterBtn @displayFilterSec(filterBtn): ', filterBtn);
  renderOutlook.toggleDisplay(filterBtn.name, resetBtn.id);
  document.getElementById("filter-btns").classList.toggle("btns-wrapper");
  filterBtn.value = swapBtnValue(filterBtn.value); 
  renderOutlook.displayBookingsBtnTxt(filterBtn);
};


// function addToFilterList(list, prop, value) {
//     console.log('@ addToFilterList: ');
//   list.push({property: prop, value: value})
//     console.log('list: ', list);
//   return list
// };
function findAvailableRooms(userX, date, btn) {
    console.log('@findAvailableRooms(user): ');
    console.log('user @findAvailableRooms(user): ', user);
    console.log('date @findAvailableRooms(user): ', date);
  user.searchDate = date;
  btn.disabled = false;
  const roomsBooked = hotelRepo.findBookings("date", date);
  const availableRooms = hotelRepo.findAvailableRooms(roomsBooked);
  user.availableRooms = availableRooms;
  filterAvailableRooms(userX, date);
  return user; 
};

function filterAvailableRooms(userX, date) {
    console.log('@filterAvailableRooms: ');
    console.log('user @filterAvailableRooms: ', user);
    console.log('user.availableRooms @filterAvailableRooms: ', user.availableRooms);
    //console.log('value: ', value);
    //console.log('prop: ', prop);
    //console.log('datePicked: ', datePicked);  
    // const checks = Array.from(document.querySelectorAll("input[type = checkbox]:checked"));

    // console.log('checks @filterAvailableRooms: ', checks);
    // console.log('roomTypes @filterAvailableRooms: ', roomTypes);
    // console.log('bedSizes @filterAvailableRooms: ', bedSizes);
    // console.log('numBeds @filterAvailableRooms: ', numBeds);
  let filteredRooms = user.availableRooms;

  //////// roomTypes, bedSizes, numBeds
  const roomOptions = ["roomType", "bedSize", "checkbox"];
  let types;
  roomOptions.forEach(option => {
    types = Array.from(document.querySelectorAll(`input[name = ${option}]:checked`));
    types.length ? filteredRooms = filterRooms(filteredRooms, types) : null;
  });
  console.log('filteredRooms @filterAvailableRooms: ', filteredRooms);

  // notSuite = document.querySelectorAll("input[type = checkbox]:checked:not(#suite)")
  //console.log("notSuite: ", notSuite);
  //const checked = document.querySelectorAll("input[type = checkbox]:checked");

  
  // const roomTypes = Array.from(document.querySelectorAll("input[name = roomType]:checked"));
  // roomTypes.length ? filteredRooms = filterRooms(filteredRooms, roomTypes) : null;
  // const bedSizes = Array.from(document.querySelectorAll("input[name = bedSize]:checked"));
  // bedSizes.length ? filteredRooms = filterRooms(filteredRooms, bedSizes) : null;
  // numBeds.length ? filteredRooms = filterRooms(filteredRooms, numBeds) : null;
const numBeds = Array.from(document.querySelectorAll("input[name = numBeds]:checked"));
  // filteredRooms = checks ? checks.map(check => filteredRooms = user.filterData(filteredRooms, check.name, check.id)) : user.availableRooms;
    
    //console.log('checks @filterAvailableRooms: ',  checks ? console.log('true "checks": ', checks) : console.log('checks == !checks: ', checks === !checks));
    //console.log('checks.length @filterAvailableRooms: ',  checks.length ? console.log('true "checks": ', checks) : console.log('checks.length == !checks.length: ', checks == !checks));
  designRooms(userX, filteredRooms, "available-room");
  //displayRooms();
  const wordsDate = formatDate(date, "words");
    console.log('wordsDate: ', wordsDate);
  dataCheck(filteredRooms, "available-rooms", wordsDate);
  return user;
};

const filterRooms = (rooms, types) => {
  console.log('@ filterRooms: ');
  // if (roomChecks === roomTypes) {
  //  roomChecks.map(check => checkID = check.id.split("-").join(" "));
  // };
  // if (roomChecks === bedSizes) {
  //   roomChecks.map(check => checkID = check.id);
  // };
  // if (roomChecks === numBeds) {
  //   roomChecks.map(check => checkID = Number(check.id));
  // };
  types.map(check => {
    const checkID = findCheckID(check);
    rooms = rooms.filter(room => room[check.name] === checkID);
  });
  return rooms;
};

function findCheckID(check) {
  if (check.name === "roomType") {
    return check.id.split("-").join(" ");
   };
   if (check.name === "bedSize") {
     return check.id;
   };
   if (check.name === "numBed") {
     return Number(check.id);
   };
};

// const filterRooms = (rooms, roomChecks) => {
//   console.log('@ filterRooms: ');
//   // if (roomChecks === roomTypes) {
//   //  roomChecks.map(check => checkID = check.id.split("-").join(" "));
//   // };
//   // if (roomChecks === bedSizes) {
//   //   roomChecks.map(check => checkID = check.id);
//   // };
//   // if (roomChecks === numBeds) {
//   //   roomChecks.map(check => checkID = Number(check.id));
//   // };
//   roomChecks.map(check => {
//     const checkID = findCheckID(check);
//     rooms = rooms.filter(room => room[check.name] === checkID);
//   });
//   return rooms;
// };

/*
  function filterAvailableRooms(userX, date) {
      console.log('@filterAvailableRooms: ');
      console.log('user @filterAvailableRooms: ', user);
      console.log('user.availableRooms @filterAvailableRooms: ', user.availableRooms);
      //console.log('value: ', value);
      //console.log('prop: ', prop);
      //console.log('datePicked: ', datePicked);
    const checks = Array.from(document.querySelectorAll("input[type = checkbox]:checked"));
    const roomTypes = Array.from(document.querySelectorAll("input[name = roomType]:checked"));
    const bedSizes = Array.from(document.querySelectorAll("input[name = bedSize]:checked"));
    const numBeds = Array.from(document.querySelectorAll("input[name = numBeds]:checked"));
      console.log('checks @filterAvailableRooms: ', checks);
      console.log('roomTypes @filterAvailableRooms: ', roomTypes);
      console.log('bedSizes @filterAvailableRooms: ', bedSizes);
      console.log('numBeds @filterAvailableRooms: ', numBeds);
    let filteredRooms = user.availableRooms;
      // notSuite = document.querySelectorAll("input[type = checkbox]:checked:not(#suite)")
      //console.log("notSuite: ", notSuite);
      //const checked = document.querySelectorAll("input[type = checkbox]:checked");
    
    //roomTypes, bedSizes, numBeds
    const filterRooms = (roomChecks) => {  
      let rooms, checkID;
        console.log('@ filterRooms: ');
      if (roomChecks === roomTypes) {
      roomChecks.map(check => checkID = check.id.split("-").join(" "));
      };
      if (roomChecks === bedSizes) {
        roomChecks.map(check => checkID = check.id);
      };
      if (roomChecks === numBeds) {
        roomChecks.map(check => checkID = Number(check.id));
      };

      roomChecks.map(check => {
        rooms = rooms.filter(room => room[check.name] === checkID);  
      filteredRooms = filteredRooms.filter(room => room[check.name] === checkID);
  });
  return rooms
};

    roomTypes.length ? filteredRooms = filterRooms(filteredRooms, roomTypes) : null;
    bedSizes.length ? filteredRooms = filterRooms(filteredRooms, bedSizes) : null;
    numBeds.length ? filteredRooms = filterRooms(filteredRooms, numBeds) : null;
    // filteredRooms = checks ? checks.map(check => filteredRooms = user.filterData(filteredRooms, check.name, check.id)) : user.availableRooms;
      console.log('filteredRooms @filterAvailableRooms: ', filteredRooms);
      //console.log('checks @filterAvailableRooms: ',  checks ? console.log('true "checks": ', checks) : console.log('checks == !checks: ', checks === !checks));
      //console.log('checks.length @filterAvailableRooms: ',  checks.length ? console.log('true "checks": ', checks) : console.log('checks.length == !checks.length: ', checks == !checks));
    designRooms(userX, filteredRooms, "available-room");
    //displayRooms();
    const wordsDate = formatDate(date, "words");
      console.log('wordsDate: ', wordsDate);
    dataCheck(filteredRooms, "available-rooms", wordsDate);
    return user;
  };
*/
function bookRoom(btn, userX) {
  console.log('btn @bookRoom(): ', btn);
  console.log('userX: ', userX);
  console.log('user: ', user);
  const newBooking = { 
    userID: userX.id,
    date: user.searchDate,
    roomNumber: btn.value,
    roomServiceCharges: [],
  };
  console.log('newBooking: ', newBooking);  
  resetRoomSearch();
};

function cancelBooking(btn) {
  console.log('btn @cancelBooking(btn): ', btn);
  resetRoomSearch();
  const cancelMessage = "Are you sure you want to cancel this reservation (cannot be undone)?"
  confirm(cancelMessage) ? deleteBooking(btn.id) : null;
};

function resetRoomSearch() {
  const hideAll = document.getElementById("room-search-form").querySelectorAll(".initial-state");
    console.log('hideAll: ', hideAll);
  displayFilterSec();
  Array.from(hideAll).map(hide => hide.classList.add("hidden"));
  renderOutlook.resetForm("room-search-form"); 
  document.getElementById("submit-room-search").disabled = true;
  document.getElementById("filter-btns").style = {display: "grid"};
  //clearCheckboxes();
};

// function initialState(id) {

// }

function clearCheckboxes() {
  //console.log('formID: ', formID);
  //const formID = document.getElementById("room-search-form")
  document.getElementById("room-search-form").reset(); 
  //"input[type = checkbox]:checked"
};

function findGuestAdmin() {
  console.log('@ findGuestAdmin(btn): ');
  // Leatha Ullrich
  // btn.classList.add("hidden");
  const nameInput = document.getElementById("name");
  // const date = user.date;
  const guest = createGuest("name", nameInput.value, user.date);
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
