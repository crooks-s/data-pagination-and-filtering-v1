/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const studentsPerPage = 9;

// Create and insert student elements for the page
function showPage(list, page){
   startIndex = (page * studentsPerPage) - studentsPerPage;
   endIndex = page * studentsPerPage;

   // empty HTML content to prevent duplicated code
   studentList.innerHTML = '';

   // Iterates through the list array to generate html content
   for (let i=0; i<list.length; i++){
      if (i >= startIndex && i < endIndex){
         let html = `
         <li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
           <h3>${list[i].name.first + ' ' + list[i].name.last}</h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${list[i].registered.date}</span>
         </div>
       </li>       
         `;

         studentList.insertAdjacentHTML('beforeend', html);
      }
   }
}


// Create and insert elements needed for pagination buttons
function addPagination(list){
   const numBtns = Math.ceil(list.length / 9);
   linkList.innerHTML = '';

   for (let i=1; i<=numBtns; i++){
      let html = `
         <li>
            <button type='button'>${i}</button>
         </li>
      `;

      linkList.insertAdjacentHTML('beforeend', html);
   }

   // give 'active' class to first button
   document.querySelector('li button').className = 'active';

   // on 'click', active class transferred to clicked button
   linkList.addEventListener('click', (e) => {
      if(e.target.tagName === 'BUTTON'){
         document.querySelector('.active').className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);
      }
   })
}

// Search bar function
function addSearch(){
   const header = document.querySelector('.header');
   let searchHTML = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `;

   header.insertAdjacentHTML('beforeend', searchHTML);
   const input = document.querySelector('#search');

   // iterate through data names (first and last) to check if they include user input
   function filterData(userInput){
      const filteredArr = [];
      for (let i = 0; i<data.length; i++){
         const firstName = data[i].name.first.toLowerCase();
         const lastName = data[i].name.last.toLowerCase();
         const fullName = firstName + ' ' + lastName;

         if(fullName.includes(userInput)
         ){
            filteredArr.push(data[i]);
         }
      }
      return filteredArr;
   }
   
   // updates the page with newly filtered students
   function updateDisplay(filteredData){

      // erase previously populated code
      studentList.innerHTML = '';
      linkList.innerHTML = '';
      
      if(filteredData.length > 0){
         addPagination(filteredData);
         showPage(filteredData, 1);
      } else {
         document.querySelector('.student-list').innerHTML = '<h2>No results found.</h2>'
         document.querySelector('.link-list').innerHTML = '';
      }
   }

   // updates the page with newly filtered students
   input.addEventListener('keyup', () => {
      const userInput = input.value.toLowerCase();
      const filteredArr = filterData(userInput);
      updateDisplay(filteredArr);
   })
}

// Call functions
showPage(data, 1);
addPagination(data);
addSearch();