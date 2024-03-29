class RenderDOM {

  displaySection(type) {
    // // console.log('user@DOM dispSec(): ', user);
    document.querySelector("html").classList.add("silver");
    Array.from(document.getElementsByTagName("section")).map((sec) => {
      sec.id.includes(type) ? sec.classList.remove("hidden") : sec.classList.add("hidden")
    });
    return this;
  };

  displayUser(user) {
    document.getElementById("nav").classList.remove("hidden");
    this.resetForm("login");
    user.id ? this.displayGuest(user) : this.displayManager(user);
    return this;
  }

  displaySearchForm(target) {
      // console.log('target: ', target);
      // // console.log('target.parentNode;: ', target.parentNode);
    const parentDiv = target.parentNode;
      //// console.log('parentDiv: ', parentDiv);
    const divID = target.name;
    document.querySelector(`.${divID}`).classList.remove('hidden');
      //// console.log('document.getElementById(parentDiv.id): ', document.getElementById(parentDiv.id));
    document.getElementById(parentDiv.id).classList.add('hidden');
    return this;
  };

  displayManager(manager) {
    // console.log(' *** @displayManager(manager) *** ');
    const managerKids = document.getElementById("manager-dashboard").children;
    Array.from(managerKids).map(kid => {  
      kid.firstElementChild.innerText = manager[kid.id];
    });
  };

  displayGuest(user) {
    // console.log(' *** displayGuest(guest) *** ');
    const guest = user.guestAdmin ? user.guestAdmin : user;
    const headerTxt = user.guestAdmin ? `Guest Info For: ${guest.name.toUpperCase()}` : `WELCOME BACK ${guest.name.toUpperCase()}!`;
    document.getElementById("guest-heading").innerText = headerTxt;
    document.getElementById("amountSpent-txt").innerText = `${guest.amountSpent}`
    return this
  };

  displayBookingsBtnTxt(btn) {
    const btnVal = btn.value;
    const btnTxt = btn.name.split("-").join(" ");
    btn.innerText = `${btnVal} ${btnTxt}`.toUpperCase();
    return this
  };

  // const assignRoomBtnTxt = (name) => {
  //   return name === "upcoming-booking" ? "CANCEL ROOM" 
  //   : name === "available-room" ? "BOOK ROOM" 
  //   : null;
  // };

  assignNoDataTxt(section, name) {
    const type = section.split("-").join(" ");
    document.getElementById(`no-${section}-text`).innerText = `There are no ${type} for ${name}.`
  }

  designBookingHTML(booking, className, formatDate) { 
    const id = booking.id;
    const rmNum = booking.roomNumber;
    const num = booking.count;
    const btnClass = booking.btnClass;
    const date = formatDate(booking.date, 'numbers');
    return `
      <article id="booking-${num}" class="${className} booking" value="${id}" room=${rmNum}>
        <span id="booking${num}" class="details-wrapper">
          <h6 id="bk-date">check-in date: ${date}</h6>
          <h6 id="bk-confCode">confirmation code: ${id}</h6>
        </span>
        <div id="${className}-details-${num}" class="room-details hidden">
        </div>
        <div id="${className}-rmBooking${num}-btns" class="rmBooking-btns-wrapper ${btnClass}">
          <button id="${className}-details-${num}-btn" value="show" class="booking-details-btn toggle-btn" name="room-details" num=${num}>room details</button>
          <button id="cancel-btn-${num}" class="hidden booking-details-btn" number=${id} value="CANCEL BOOKING" date="${date}">CANCEL RESERVATION</button>
        </div>
      </article>
    `;
  };

  designRoomHTML(room, className, num) {
      // // console.log('room @renderRoomHTML: ', room);
    const imgType = room.roomType.split(" ")[0];
    const imgFile = `../images/${imgType}-${room.bedSize}-${room.numBeds}.jpg`
    const rmNum = room.number;
    return `
      <div class="rm-wrapper">
        <div class="rm-grid">
          <span id="img-wrapper-${num}" class="img-wrapper">
            <img src="${imgFile}" alt="hotel room stock photo" id="room${num}-img" class="room-img"/>
            <div id="${className}-btn-wrapper-${num}" class="btn-wrapper hidden">
              <button id="${className}-btn-${num}" class="hidden" name="${className}" value="${rmNum}">BOOK ROOM</button>
            </div>
          </span>
          <div class="details-wrapper">       
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
          </div>
        </div>                 
      </div>  
    `;
  };

  renderBookingHTML(bookingsList, bookingHTML, roomHTML) {
    bookingsList.insertAdjacentHTML("beforeend", bookingHTML);
    const details = bookingsList.lastElementChild.children[1];
    details.insertAdjacentHTML("beforeend", roomHTML);
  }

  renderRoomHTML(list, room) {
    list.insertAdjacentHTML("beforeend", room); 
  };

  displayAdjustments(type) {  // `name`, `no-${type}`
      // console.log('@availableRoomsAdjustments(type): ', type);
    document.getElementById(`no-${type}`).classList.add("hidden");
  };

  toggleDisplay(...strIDs) {
    let element;
    strIDs.map(id => {
        // console.log('id @DOM.toggle(): ', id);
      element = document.getElementById(id);
        //// console.log('element @DOM.toggle(): ', element);
      element.classList.toggle("hidden");
    });
  };

  showRooms(id, date) {
    document.getElementById(id).classList.remove("hidden");
    document.getElementById("available-rooms-header").innerText =`AVAILABLE ROOMS for ${date}`;
    document.getElementById("new-reservation").classList.add("new-reservation-grid");
  };
  
  resetForm(...formIDs) {
    // console.log('formIDs: ', formIDs);
    //let form;

    formIDs.map(formID => {
      // console.log("formID: ", formID, typeof(formID))
      return document.getElementById(formID).reset();
    });
    //// console.log('formID: ', formID); 
    //document.getElementById("submit-room-search").disabled = true;
  };
};

export default RenderDOM;

/*

  // displayGuestHeader(guest) {
  //   document.getElementById("guest-heading").innerHTML = `Guest Info For: ${guest.name.toUpperCase()}`;
  //   return this
  // };

  // assignBtnToUser(user), updateSearchBtn(type),
  // assignBtnToUser(user) {
  //     // console.log('user @btnDOM: ', user);
  //   const userBtnSec = document.querySelector(".user-btn-sec");
  //   userBtnSec.id = `${user.type}-btn-sec`;
  //   const btnName = user.type === "guest" ? "new-reservation" : "guest-search";
  //     // console.log('userBtnSec.id : ', userBtnSec.id );
  //   const btnTxt = btnName.split("-").join(" ").toUpperCase();
  //   userBtnSec.firstElementChild.innerText = btnTxt;
  //   userBtnSec.firstElementChild.name = btnName;
  //   return this
  // };

  // updateSearchBtn(type) {
  //     // console.log('@DOM updateSearch type: ', type);
  //   let search = type === "guest" ? "find rooms" : "find guest";
  //     // console.log('@DOM updateSearch search: ', search);
  //   // renderOutlook.updateSearchBtn(btnTxt);

  //   const searchBtn = document.querySelector(".submit-user");    
  //     // console.log('searchBtn: ', searchBtn);
  //   searchBtn.value = search.toUpperCase();
  //   search = search.split(" ").join("-");
  //   const btnText = `${search}-btn`;
  //   searchBtn.id = btnText;
  //   searchBtn.classList.add("room-search-btn")
  //   return this
  // };

  // customizeSection(user) {
  //    console.log('user@DOM.custSec: ', user.type);
     //console.log("userInputs: ", userInputs);
      // // console.log('parentNode.innerHTML: ', userInputs.nameInput.parentNode.innerHTML);
    // const inputSec = document.getElementById("login-username");
    // // userInputs.nameInput.parentNode;
    //  console.log('inputSec @DOM customizeSection():  ', inputSec);
    // const inputType = user.type === "guest" ? "date" : "text";
    //   // // console.log('inputType: ', inputType);
    // const labelHTML = `
    //   <label for="name" id="name-label" class="login-label txt-label manager guest">${user.labelInput}</label>
    // `;
    // const nameHTML = `
    //   <input type=${inputType} id="name" class="txt-input" name=${user.type} placeholder="${user.placeHolder}" value="" required="">
    // `;
    // inputSec.innerHTML = `
    //   ${labelHTML}
    //   ${nameHTML}
    // `;
    //document.getElementById("user-page").name = user.btnChildText;
    
  //};
  
  //  <button id="details-btn-20" name="btn-2" value="20" class="rm-details-btn hidden">ROOM DETAILS</button>

  // renderBookingsHTML(guest) {
  //   //// console.log('bookings @renderBookingsHTML(user): ', bookings);
  //   // console.log('user @renderBookingsHTML: ', user);
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
//       // console.log('user @renderRoomsHTML: ', user);
//     let rmNum, room, className, roomHTML;
//     data.map(type => {
//       className = type.name.slice(0, -1);
//         // console.log('className @renderRoomsHTML: ', className);
//       type.data.map(booking => {
//           // console.log('booking @renderRoomsHTML: ', booking);
//         room = booking.rmDetails;
//         roomID = room.id;
//           // console.log('room @renderRoomsHTML: ', room);
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
  //   // console.log('html: ', html);
  //   // console.log('rooms: ', rooms);
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
  //     // console.log('btn.value (b4): ', btn.value);
  //   return btn.value = btn.value === "true" ? "false" : "true";
  // };


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
    // console.log('user: ', user);
    // console.log('nameInput: ', nameInput);
    //// console.log(' name.parentNode.innerText: ',  name.parentNode.innerText);
    //name.parentNode.innerText = 
  };

*/


