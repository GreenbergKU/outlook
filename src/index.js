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
    outlook.guests = data[0],
    outlook.bookings = data[1],
    outlook.rooms = data[2] 
  })
  .catch((error) => console.log(error.message));
}




// HELPER FUNCTIONS

/*
**** IMPORT EXAMPLES ****
An example of how you tell webpack to use a CSS (SCSS) file:  
import './css/base.css';

An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
*/
