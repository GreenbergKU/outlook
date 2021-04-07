class RenderDOM {

  assignBtnToUser(user) {
      // console.log('user @btnDOM: ', user);
    const userBtnSec = document.querySelector(".user-btn-sec");
    userBtnSec.id = `${user.type}-btn-sec`;
      // console.log('userBtnSec.id : ', userBtnSec.id );
    const btnTxt = user.btnChildText.split("-").join(" ").toUpperCase();
    userBtnSec.firstElementChild.innerText = btnTxt;
    userBtnSec.firstElementChild.name = user.btnChildText;
    return this
  };

  displaySection(type, tagName) {
    // console.log('user@DOM dispSec(): ', user);
    const sections = document.getElementsByTagName(tagName);
    Array.from(sections).map((sec) => {
      return sec.id.includes(type) ? sec.classList.remove("hidden") : sec.classList.add("hidden")
    });
    document.getElementById("body").style.background = "silver";
    return this
  };

  displaySearchForm(target) {
      console.log('target: ', target);
      // console.log('target.parentNode;: ', target.parentNode);
    const parentDiv = target.parentNode;
      //console.log('parentDiv: ', parentDiv);
    const divID = target.name;
    document.querySelector(`.${divID}`).classList.remove('hidden');
      //console.log('document.getElementById(parentDiv.id): ', document.getElementById(parentDiv.id));
    document.getElementById(parentDiv.id).classList.add('hidden');
    
    return this;
  };

  updateSearchBtn(userSearch) {
      console.log('userSearch: ', userSearch);
    const searchBtn = document.querySelector(".submit-user");    
      console.log('searchBtn: ', searchBtn);
    searchBtn.value = userSearch.toUpperCase();
    userSearch = userSearch.split(" ").join("-");
    const btnText = `${userSearch}-btn`;
    searchBtn.id = btnText;
    searchBtn.classList.add("room-search-btn")
  };

  customizeSection(userInputs, user) {
      console.log('user@DOM.custSec: ', user);
      console.log("userInputs: ", userInputs);
      // console.log('parentNode.innerHTML: ', userInputs.nameInput.parentNode.innerHTML);
    const inputSec = userInputs.nameInput.parentNode;
      console.log('inputSec: ', inputSec);
    const inputType = user.labelInput === "date" ? "date" : "text";
      // console.log('inputType: ', inputType);
    const labelHTML = `
      <label for="name" id="name-label" class="login-label txt-label manager guest">${user.labelInput}</label>
    `;
    const nameHTML = `
      <input type=${inputType} id="name" class="txt-input" name=${user.type} placeholder="${user.placeHolder}" value="" required="">
    `;
    inputSec.innerHTML = `
      ${labelHTML}
      ${nameHTML}
    `;
    document.getElementById("user-page").name = user.btnChildText;
    user.id ? this.displayGuest(user) : this.displayManager(user);
    return this
  };

  displayManager(manager) {
    console.log(' *** @displayManager(manager) *** ');
    const managerKids = document.getElementById("manager-dashboard").children;
    let kidHTML = '';
    Array.from(managerKids).map(kid => {
      kidHTML = `
        <p id="${kid.id}-txt" class="mDash-txt">${manager[kid.id]}</p>
      `;
      kid.insertAdjacentHTML("beforeend", kidHTML);
      //console.log('kidHTML @displayManager: ', kidHTML);
    });
  };

  displayGuest(guest) {
    console.log(' *** displayGuest(guest) *** ');
      console.log('guest: ', guest);
      console.log('guest-heading.innerHTML: ', document.getElementById("guest-heading").innerHTML);
    document.getElementById("guest-heading").innerHTML += ` ${guest.name.toUpperCase()}!`;
      console.log('guest-heading.innerHTML: ', document.getElementById("guest-heading").innerHTML);
    //const bookings = document.getElementById("guest-bookings");
    const amtSpent = document.getElementById("amountSpent");
    const amtSpentHTML = `
      <p id="amtSpent-txt" class="gDash-txt">${guest.amountSpent}</p>
    `;
    amtSpent.insertAdjacentHTML("beforeend", amtSpentHTML);
    //this.displayBookings(guest.bookings, bookings);
    return this
  };

  displayGuestHeader() {
    document.getElementById("guest-heading").innerText = `Guest Info For: `;
    return this
  };

  displayBookingsBtnTxt(btn) {
      // console.log("@DOM.dsplyBksBtnTxt(btn)");
      // console.log('btn @DOM.dsplyBksBtnTxt(btn): ', btn);
    const btnVal = btn.value;
    const btnTxt = btn.name.split("-").join(" ");
      // console.log('btnTxt: ', btnTxt);
    btn.innerText = `${btnVal} ${btnTxt}`.toUpperCase();
    //btn.value = btnVal === "show" ? "hide" : "show";
      // console.log('btn.value: ', btn.value);
    return this
  };

  assignNoDataTxt(section, name) {
      console.log('section: ', section);
    const type = section.split("-").join(" ");
    document.getElementById(`no-${section}-text`).innerText = `There are no ${type} for ${name}.`
  }

  designBookingHTML(booking, className) { 
    const id = booking.id;
    const rmNum = booking.roomNumber;
    const num = booking.count
    return `
      <article id="booking-${num}" class="${className} booking" value="${id}" room=${rmNum}>
        <span id="${num}">
          <h6 id="bk-date">check-in date: ${booking.date}</h6>
          <h6 id="bk-confCode">confirmation code: ${booking.id}</h6>
        </span>
        <div id="room-details-${num}" class="room-details hidden">
        </div>
        <div id="rmBooking-btns-${num}" class="rmBooking-btns-wrapper">
          <button id="room-details-${num}-btn" value="show" class="booking-btn details-btn" name="room-details" num=${num}>room details</button>
          <button id="cancel-btn-${num}" value="CANCEL BOOKING" class="booking-btn hidden details-btn" number=${id}>CANCEL RESERVATION</button>
        </div>
      </article>
    `;
  }

  designRoomHTML(room, className, id, num) {
      console.log('room @renderRoomHTML: ', room);
      //console.log('booking.room: ', booking.room);
    const rmNum = room.number;
    return `
             
      <span id="roomType-wrapper">
        <p id="roomType-${rmNum}" class="${className}"><b>ROOM TYPE:</b></p>
        <p id="roomType-txt-${rmNum}" class="${className}-txt">${room.roomType.toUpperCase()}</p>
      </span>
      <span id="bedSize-wrapper">
        <p id="bedSize-${rmNum}" class="${className}"><b>BED SIZE:</b></p>
        <p id="bedSize-txt-${rmNum}" class="${className}-txt">${room.bedSize}</p>
      </span>
      <span id="numBeds-wrapper">
        <p id="numBeds-${rmNum}" class="${className}"><b>NUMBER OF BEDS:</b></p>
        <p id="numBeds-txt-${rmNum}" class="${className}-txt">${room.numBeds}</p>
      </span>
      <span id="costPerNight-wrapper">
        <p id="costPerNight-${rmNum}" class="${className}"><b>PRICE PER NIGHT:</b></p>
        <p id="costPerNight-txt-${rmNum}" class="${className}-txt">$${room.costPerNight} *</p>
        <p id="costPerNight-astrik" class="${className}-txt astrik">
          <i>service charges not included</i>
        </p>
      </span>
      <button id="rm${rmNum}-btn" class="rm-details-btn hidden" value="${rmNum}" name="${className}">
        ROOM
      </button> 
      
    `;
  };

  renderBookingHTML(bookingsList, bookingHTML, roomHTML) {
    bookingsList.insertAdjacentHTML("beforeend", bookingHTML);
    const details = bookingsList.lastElementChild.children[1];
    details.insertAdjacentHTML("beforeend", roomHTML);
  }

  renderRoomHTML(list, room, className) {
    list.insertAdjacentHTML("beforeend", room); 
  };

  availableRoomsAdjustments(type) {  // `name`, `no-${type}`
      console.log('@availableRoomsAdjustments(type): ', type);
    //document.getElementById(type).classList.remove("hidden");
    document.getElementById(`no-${type}`).classList.add("hidden");
  };

  toggleDisplay(...strIDs) {
    let element;
    strIDs.map(id => {
        console.log('id @DOM.toggle(): ', id);
      element = document.getElementById(id);
        //console.log('element @DOM.toggle(): ', element);
      element.classList.toggle("hidden");
    });
  };
  
  resetForm(formID) {
    //console.log('formID: ', formID);
    //const formID = document.getElementById("room-search-form")
    document.getElementById(formID).reset(); 
    //"input[type = checkbox]:checked"
  };
};

export default RenderDOM


  /*
    <button id="details-btn-20" name="btn-2" value="20" class="rm-details-btn hidden">ROOM DETAILS</button>
  */

  // renderBookingsHTML(user) {
  //   //console.log('bookings @renderBookingsHTML(user): ', bookings);
  //   console.log('user @renderBookingsHTML: ', user);
  //   let bookingHTML;
  //   user.sortedBookings.map(bookingTypes => {
  //     const bookingsList = document.getElementById(bookingTypes.name);
  //     const className = bookingTypes.name.slice(0, -1);
  //     let num = 1;
  //     bookingTypes.data.map(booking => {
  //       const rmNum = booking.roomNumber;
  //       const id = booking.id;
  //       bookingHTML = `
  //         <article id="booking-${id}" class="${className}" value=${rmNum} number="${num}">
  //           <ul id="bookingList"  
  //             <li>
  //               <h5 id="bk-date">CHECK-IN DATE: ${booking.date}</h5>
  //             </li>
  //             <li>
  //               <h6 id="bk-confCode">CONFIRMATION CODE: ${booking.id}</h6>
  //             </li>
  //           </ul>
  //           <div id="details-${id}" class="hidden">
  //             <h6 class="details-btn-txt"><b>ROOM DETAILS:</b></h6>
  //           </div>
  //           <div id="booking-btns-${num}">
  //             <button id="details-${num}" value="${rmNum}" class="rm-details-btn" name="room-details">ROOM DETAILS</button>
  //             <button id="cancel-btn-${num}" value="${rmNum}" class="rm-cancelation-btn hidden">CANCEL RESERVATION</button>
  //           </div>
  //         </article>
  //       `; 
  //       bookingsList.insertAdjacentHTML("beforeend", bookingHTML);
  //       const details = bookingsList.lastElementChild.children[1];
  //       const roomHTML = this.designRoomHTML(booking.rmDetails, className)
  //       details.insertAdjacentHTML("beforeend", roomHTML);
  //       num++;
  //     });
  //   });
  // };


//   renderRoomsHTML(data) {
//       console.log('user @renderRoomsHTML: ', user);
//     let rmNum, room, className, roomHTML;
//     data.map(type => {
//       className = type.name.slice(0, -1);
//         console.log('className @renderRoomsHTML: ', className);
//       type.data.map(booking => {
//           console.log('booking @renderRoomsHTML: ', booking);
//         room = booking.rmDetails;
//         roomID = room.id;
//           console.log('room @renderRoomsHTML: ', room);
//         rmNum = room.number;
//         //parent = target.name; 
//         roomHTML = "";
//         roomHTML = `
//           <ul id="room-${rmNum}" class="${className}s">       
//             <li id="roomType-wrapper">
//               <p id="roomType-${rmNum}" class="${className}">ROOM TYPE:</p>
//               <p id="roomType-txt-${rmNum}" class="${className}-txt">${room.roomType.toUpperCase()}</p>
//             </li>
//             <li id="bedSize-wrapper">
//               <p id="bedSize-${rmNum}" class="${className}">BED SIZE:</p>
//               <p id="bedSize-txt-${rmNum}" class="${className}-txt">${room.bedSize}</p>
//             </li>
//             <li id="numBeds-wrapper">
//               <p id="numBeds-${rmNum}" class="${className}">NUMBER OF BEDS:</p>
//               <p id="numBeds-txt-${rmNum}" class="${className}-txt">${room.numBeds}</p>
//             </li>
//             <li id="costPerNight-wrapper">
//               <p id="costPerNight-${rmNum}" class="${className}">PRICE PER NIGHT:</p>
//               <p id="costPerNight-txt-${rmNum}" class="${className}-txt">$${room.costPerNight} *</p>
//               <p id="costPerNight-astrik" class="${className}-txt astrik">
//                 <i>service charges not included</i>
//               </p>
//             </li>
//             <button id="hide-rmDetails-${rmNum}" value=${rmNum}>
//               HIDE
//             </button> 
//           </ul>
//         `;
        
//         // const children = document.getElementById(`${className}s`).children;
//         // const index = children.findIndex(booking => booking.id === room.id);
//         // children[index].children[1].insertAdjacentHTML("beforeend", roomHTML);
//         // document.getElementById(`${className}s`).insertAdjacentHTML("beforeend", roomHTML);
//       });
//     });
//   };
// };




  //  <div id="bookingList-btns">
  //   <button id="details-btn-${room.roomNumber}" name="details-btn-${num}" value="${room.roomNumber}" class="rm-details-btn">ROOM DETAILS</button>
  //   <button id="cancel-btn-${room.roomNumber}" name="cancel-btn-${num}" value="${room.roomNumber}" class="rm-cancelation-btn">CANCEL RESERVATION</button>
  // </div>

  // designRoomHTML(rooms, html, className) {
  //   console.log('html: ', html);
  //   console.log('rooms: ', rooms);
  //   let roomHTML = "";
  //   rooms.map(room => {
  //     roomHTML = `
  //       <div id="rm-${room.number}" class="avail-room">
  //         <div id="div-roomType">ROOM TYPE:
  //           <p id="p-roomType">${room.roomType}</p>
  //         </div>
  //         <div id="div-hasBidet">HAS BIDET: 
  //           <p id="p-hasBidet">${room.bidet}</p>
  //         </div>
  //         <div id="div-bedSize">BED SIZE:
  //           <p id="p-bedSize">${room.bedSize}</p>
  //         </div>
  //         <div id="div-numBeds">NUMBER OF BEDS:
  //           <p id="p-numBeds">${room.numBeds}</p>
  //         </div>
  //         <div id="div-costPerNight">PRICE PER NIGHT:
  //           <p id="p-costPerNight">$${room.costPerNight}</p>
  //         </div id="avail">
  //         <button id="btn-${room.number}">BOOK ROOM</button>
  //       </div>
  //     `;
  //     html.insertAdjacentHTML("beforeend", roomHTML);
  //   });
  //   document.getElementById("available-rooms").classList.remove("hidden");
  // }

  

  // toggleBookings(btn) {
  //   document.getElementById("past-bookings").classList.toggle("hidden");
  //     console.log('btn.value (b4): ', btn.value);
  //   return btn.value = btn.value === "true" ? "false" : "true";
  // };
/*
  <div id="details-17" class="hidden">ROOM DETAILS</div> 
  
  <button id="bookingBtn-25" name="btn-17" value="17" class="rm-details-btn">ROOM DETAILS</button>

  roomDetails: Object { 
    number: 17, 
    * roomType: "junior suite", 
    bidet: false, 
    * bedSize: "twin", 
    * numBeds: 2, 
    * costPerNight: 328.15 
  };
    
  // index.js:119

  customizeInputs(user, nameInput) {
    console.log('user: ', user);
    console.log('nameInput: ', nameInput);
    //console.log(' name.parentNode.innerText: ',  name.parentNode.innerText);
    //name.parentNode.innerText = 
  };

*/


