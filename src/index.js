
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
window.onload = loadOutlook(activateLogin);
  //.then(activateLogin());

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
  const currDate = new dayjs();
  const minDate = formatDate(currDate.add(1,"day"), "min");
  document.getElementById("date").min = minDate;
  return formatDate(currDate);
}

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
  // const minDate = new dayjs().add(1,"day").format("YYYY-MM-DD");
  // document.getElementById("date").min = minDate;
  document.getElementById('user-submit').addEventListener("click", getLogin);
  return user
};

function getLogin(e) { 
  e.preventDefault();
  const date = setDate();
  const form = document.getElementById("login");
  const userInputs = findInputs(form);
  const validInputs = validateInputs(userInputs); 
  validInputs ? (
    user = createUser(userInputs, date),
    user.isValid = validateUser(user)
  ) : alert("All Fields Are Required!");
  user = user ? checkValidity(user) : null;
  console.log(user ? true:false);
  if (user) {
    addListeners(user);
    updateDOM();
    return user
  };     
};

function validateUser(user) {//*global switch>User
  //return hotelRepo.validateUser(user);
  return user.validation(user, hotelRepo);
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
  const isValid = inputs.arr.map(input => {
    
    if(!input.value) console.log('input.invalid = true: ', input.invalid = true);
    return input;
  })     
  .find(input => input.invalid === true);
    console.log('isValid: ', isValid === undefined);
  return isValid === undefined;  
};

function createUser(inputs, date) { //*local
   console.log('inputs: ', inputs, inputs.username, inputs.password);
   const nameInput = inputs.arr.find(input => input.id.toLowerCase().includes("name"));
   console.log('nameInput: ', nameInput);
  return inputs.password ? new User(date, nameInput.value, inputs.password.value).formatUser() : new User(date, nameInput.value).formatUser();
};

function checkValidity(user) {//*global
  console.log('user: ', user);
  if (user.isValid) {
    return !user.password ? findGuestAdmin(user) : differentiateUsers()
  }
};

function differentiateUsers() {//*global
  // const date = formatDate(new dayjs());
  user = user.type === "guest" ? createGuest(user, "id") : createManager(hotelRepo, user.date); 
  return user
};

function findGuestAdmin(user) {//*global
  user.name = user.username;
  console.log('user.name: ', user.name);
  return createGuest(user, "name"); // user.fullName, user.date
};

function createGuest(user, property) {//*global
  const userData = hotelRepo.findDataByProperty("usersData", property, user[property])[0];
    console.log('userData @createGuest: ', userData);
  const guest = new Guest(userData, user.date);
    console.log('guest @createGuest: ', guest);
  return customizeGuest(guest);
};

function customizeGuest(guest) {//*local switch>Guest
  const USD = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  });
  const bookings = findBookings("userID", guest.id);
  guest.bookings = guest.sortChronically(bookings, formatDate);
  guest.sortedBookings = guest.sortByDate(guest.bookings, formatDate);
  guest.amountSpent = USD.format(hotelRepo.calculateAmountTotals(guest.bookings));
  displayBookings(guest);
  //console.log('bookingsBtns: ', bookingsBtns);
  //activateRmDetailsBtns("booking-details-btn", guest);
  //  console.log("guest @customizeGuest", guest);
  return guest;
};

function createManager(hotelRepo, date) {//*global
  const manager = new Manager(hotelRepo, date);
  return customizeManager(manager);
};

function customizeManager(manager) {//*local switch>Guest
  const USD = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  });
  const percent = new Intl.NumberFormat('en-US' , {
    style: 'percent'
  });
  const bookedRooms = findBookings("date", manager.date); 
  manager.roomsAvailable = hotelRepo.findAvailableRooms(bookedRooms);
  manager.availableRoomsNum = manager.roomsAvailable.length;
  manager.revenue = USD.format(hotelRepo.calculateAmountTotals(bookedRooms));
  manager.roomsOccupied = percent.format(hotelRepo.calculatePercentage(bookedRooms.length, manager.totalRooms));
  return manager
};

function addListeners(user) {//*global
    console.log('user.type @addListeners(): ', user.type);
  activateLogOut();
  activateDisplySearchForm(user);
  if (user.type === "manager") {
    activateManagerSearch(user);
  } else {
    activateBookingBtns("booking-btn");
    activateRmDetailsBtns("booking-details-btn", user);
    activateFilter(user);
    activateGuestSearchForm(user);
  };
}

function activateLogOut() {
  document.getElementById("logout-btn").addEventListener("click", function logout(e) {
    e.preventDefault();
    refreshSite("logout");
    let inputs = findInputs(document.getElementById("login"));
    inputs.username.placeholder = inputs.username.placeholder;
    
  })
  
}

function activateDisplySearchForm(user) {//*local
  const showSearchUser = (e) => showSearch(e);
  document.getElementById(`${user.type}-btn`).addEventListener("click", showSearchUser);
  
  function showSearch(e) {
      console.log('e.target @showSearch: ', e.target);
      //console.log('user @showSearch: ', user);
    renderOutlook.resetForm("room-search-form");
    renderOutlook.displaySearchForm(e.target);
    const filterBtn = document.getElementById("filter-btn");
    renderOutlook.displayBookingsBtnTxt(filterBtn);
    //renderOutlook.toggleDisplay("login-name");
  };
}; 

function activateManagerSearch() {//*local
  let searchName = {};
  const managerSearchBtn = document.getElementById("find-guest-btn");
  managerSearchBtn.addEventListener("click", function handleSearchBtn(e) {
    e.preventDefault();
    searchName.date = setDate();
    const form = document.getElementById("user-search");
    const userInputs = findInputs(form);
      console.log('userInputs: ', userInputs);
    const validInputs = validateInputs(userInputs); 
      console.log('validInputs: ', validInputs);
    validInputs ? (
      searchName = createUser(userInputs, date),
      //searchName.fullName = userInputs.fullName.value,
      // searchName.name = userInputs.fullName.value,
        console.log('searchName: ', searchName),
      // ******
      searchName.isValid = validateUser(searchName),
      //searchName.isValid = validate(searchName.id, searchName.password),
        console.log('searchName.isValid: ', searchName.isValid)
      ) : alert("full name is required!");
    user.guestAdmin = checkValidity(searchName);
    console.log('user.guestAdmin: ', user.guestAdmin);
    if (user.guestAdmin) {
      //user.guestAdmin = guestAdmin;
      addListeners(user.guestAdmin);
      //displayGuestAdmin(user.guestAdmin);
      updateDOM();
      return user
    } else null;
  });
  return user
};

function activateFilter(userX) {//*local
  // console.log('user @activateFilter: ', user);
  // console.log('user.availableRooms: ', user.availableRooms);
  // activateFilterBtns(userX);
  // function activateFilterBtns(userX) {//*local
  const filterBtn = document.getElementById("filter-btn");
  const resetBtn = document.getElementById("reset-filters");
  const roomSearchBtn = document.getElementById("submit-room-search");
  const radioFilters = document.getElementById("radio-filters");

  filterBtn.addEventListener("click", function displayFilters(e) {
    e.preventDefault();
    renderOutlook.toggleDisplay(filterBtn.name, resetBtn.id);
    document.getElementById("filter-btns").classList.toggle("btns-wrapper");
    
    const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));
    filterBtns.map(btn => btn.classList.toggle("dark-red"));

    filterBtn.value = swapBtnValue(filterBtn.value); 
    renderOutlook.displayBookingsBtnTxt(filterBtn);
  });

  resetBtn.addEventListener("click", function resetFilters(e) {
    e.preventDefault();
    clearRadios();
    findAvailableRooms(userX, userX.searchDate, roomSearchBtn);
  });

  radioFilters.addEventListener("change", function hangleChange(e) {
    e.preventDefault();
    userX.searchDate ? filterAvailableRooms(userX) : null;
  });
};

function clearRadios() {//*global
  const checked = document.querySelectorAll("input[type = radio]:checked");
  Array.from(checked).map(radio => radio.checked = false);
};

function activateBookingBtns(btnID) {//*local
    // console.log('btnID @activateBookingBtns(btnID): ', btnID);
  const btns = document.getElementsByClassName(btnID);
  assignBtnsInnerText(btns);
  Array.from(btns).map(btn => {
    btn.addEventListener("click", function handleToggleBtn(e) {
        // console.log('e.target @activateBookingBtns(btnID): ', e.target);
        // console.log('e.target.nextElementSibling: ', e.target.nextElementSibling ? true : false);
      const siblingElement = e.target.nextElementSibling ? e.target.nextElementSibling : e.target.previousElementSibling;
        // console.log('siblingElement: ', siblingElement);
      if (siblingElement.value === 'hide') {
        displayInfo(siblingElement, "name")
      };
      displayInfo(e.target, "name");
    });
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

function activateGuestSearchForm(user) {//*local
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

function updateDOM() {//*local refactor!
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

function findBookings(property, value) {//*global
  let bookings = hotelRepo.findDataByProperty("bookingsData", property, value)
  .map(booking => {
    booking.room = findRoom(booking.roomNumber);
    return booking
  });
  console.log('bookings @findBookings: ', bookings);
  return bookings
};

const findRoom = (roomNum) => {//*global
  return hotelRepo.findDataByProperty("roomsData", "number", roomNum)[0]
};

function displayBookings(user) {//*global
  let bookingHTML, num, roomHTML;
  const getBtnClass = (type) => type === "upcoming-bookings" ? "btns-wrapper" : "btn-wrapper";
  return user.sortedBookings.map(bookingTypes => {
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
    dataCheck(bookingTypes.data, bookingType, user.name);
  });
};

function displayRooms(e) {//*global
  // console.log("@displayRooms: " );
  // console.log('user.availableRooms.length @displayRooms: ', user.availableRooms.length);
  e.preventDefault();
  const date = formatDate(user.searchDate, "numbers")
  renderOutlook.showRooms("available-rooms", date);
};

function designRooms(userX, rooms, className) {//*global
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

function customizeRoomBtns(btns) {//*global
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
      console.log('e.target.attributes: ', e.target.attributes);
      console.log('e.target.attributes["date"]: ', e.target.attributes["date"]);
      console.log('e.target.attributes.date: ', e.target.attributes.date);
    targetText.includes("CANCEL") ? cancelBooking(e.target, userX) : 
    targetText.includes("BOOK") ?  bookRoom(e.target, userX) :
    displayInfo(e.target, "id"); 
  };  
  Array.from(btns).map(btn => {
    btn.addEventListener("click", handleRmDetailsBtn); 
  });
}; 

function activateRoomBtns(userX, btns) {
  //// console.log('roomBtn @activateRoomBtn(btn): ', roomBtn);
  btns.map(roomBtn  => {
    renderOutlook.toggleDisplay(roomBtn.id);
    roomBtn.addEventListener("click", function handleRoomBtn(e) {
      e.preventDefault();
      roomBtn.innerText.includes("CANCEL") ? cancelBooking(roomBtn, userX)
      : roomBtn.innerText.includes("BOOK") ? bookRoom(roomBtn, userX)
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

function findAvailableRooms(userX, date, btn) {
    // console.log('@findAvailableRooms(user): ');
  userX.searchDate = date;
  btn.disabled = false;
  const roomsBooked = findBookings("date", date);
  userX.availableRooms = hotelRepo.findAvailableRooms(roomsBooked);
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
  //designRooms(userX, filteredRooms, "available-room")
  const rmBtns = designRooms(userX, filteredRooms, "available-room");
  customizeRoomBtns(rmBtns);
  activateRoomBtns(userX, rmBtns); 
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
  const userPage = document.getElementById("user-page");
  let types = [];
  types.push(!logout ? user.guestAdmin ? ("manager", "guest") : "guest" : "body");
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
  renderOutlook.resetForm("room-search-form"); 
  
  const filterBtns = document.querySelectorAll(".filter-btn");
  Array.from(filterBtns).map(btn => btn.classList.remove("dark-red"));
  filterBtns[0].parentNode.classList.remove("btns-wrapper");
  
  document.getElementById("submit-room-search").disabled = true;
  document.getElementById("new-reservation").classList.remove("new-reservation-grid");
};

function updateData() { 
  const updatedUser = differentiateUsers(); //creates new guest/managher
  user.guestAdmin ? updatedUser.guestAdmin = findGuestAdmin(userX) : null;
  return updatedUser
};




// HELPER FUNCTIONS

/*
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

// function validate(id, password) {
//   return hotelRepo.userValidation(id, password);
// }

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

// function validateLogin(user) {
//   const allUsers = hotelRepo.totalUsers;
//   return user.validateUser(inputs, allUsers);
// };

// function displayGuestAdmin(user) {//*global
//   renderOutlook
//   .displayGuest(user)
//   .displayGuestHeader(user)
//   .toggleDisplay("guest-page", "user-search", "guest-heading-sec", "guest-bookings", "guest-btn-sec");
//   return user;  
// };

// function findBookingsByDate(user) {
//   hotelRepo.findDataByProperty("bookingsData", "userID", guest.id);
//   return guest.sortChronically(bookings, formatDate);
// };

// const guestBookings = () => {
//   const bookings = hotelRepo.findDataByProperty("bookingsData", "userID", guest.id)
//   .map(booking => booking.room = findRoom(booking.roomNumber));
//   return guest.sortChronically(bookings, formatDate);
// };

// function activateFilter(userX) {
  // const radios = document.querySelectorAll("input[type = radio]");
  // const displayFilters = (e) => {
  //   e.preventDefault();
  //   displayFilterSec();
// };
// function displayFilterSec() { 
  //   // const filterBtn = document.getElementById("filter-btn");
  //   // const resetBtn = document.getElementById("reset-filters");  
  //     // console.log('filterBtn @displayFilterSec(filterBtn): ', filterBtn);
  //   renderOutlook.toggleDisplay(filterBtn.name, resetBtn.id);
  //   document.getElementById("filter-btns").classList.toggle("btns-wrapper");
  //   //document.getElementById("filter-btns").classList.toggle("dark-red");
  //   const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));
  //   filterBtns.map(btn => btn.classList.toggle("dark-red"));
  //   filterBtn.value = swapBtnValue(filterBtn.value); 
  //   renderOutlook.displayBookingsBtnTxt(filterBtn);
// };

// const resetFilters = (e) => {
  //   e.preventDefault();
  //   const roomSearchBtn = document.getElementById("submit-room-search");
  //     clearRadios();
  //     findAvailableRooms(userX, userX.searchDate, roomSearchBtn);
  //   };
// }

// function refreshDOM(userX) {
//   console.log('user: ', user);
//   console.log('userX: ', userX);
// }
*/