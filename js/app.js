/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const toTopButton = document.querySelector('#toTop');
const sections = document.querySelectorAll('section');
const navMenu = document.querySelector('#navbar__list');
const nav = document.querySelector('.navbar__menu');
let pageHeader = document.querySelector('.page__header');



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

let Sections = Array.from(sections);

toTopButton.classList.remove('active');

//hide te navbar when user not scrolling

let timer = null;

window.addEventListener('scroll', () => {
  if(timer !== null) {
    clearTimeout(timer); 
    pageHeader.classList.remove('hide');       
    }
  timer = setTimeout(() => {
    pageHeader.classList.add('hide');
    }, 2000);
});

/*
clerTimeout and setting the timer was inspired by user:Felix Kling from stack overflow in the thread:
https://stackoverflow.com/questions/4620906/how-do-i-know-when-ive-stopped-scrolling
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

const navLi = document.createElement('li');

for (const section of sections) {
  const navLi = document.createElement('li');
  navLi.innerHTML = `<a class="menu__link ${section.id}" href="#${section.id}">${section.dataset.nav}</a>`;
  navMenu.appendChild(navLi);
};

// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', ()=> {
  for (const section of Sections) {
    section.classList.remove("your-active-class");
    const sectionTopOffset = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= (sectionTopOffset - sectionHeight/2) && window.scrollY < sectionTopOffset + sectionHeight/2) {
      section.classList.add("your-active-class");
    }
    else {
      section.classList.remove("your-active-class");
    }
}

});

// Scroll to anchor ID using scrollTO event

const anchors = document.querySelectorAll('a[href^="#"]');
for (const anchor of anchors) {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
};

/*
scroll to anchors funcion was provided by user: illvart from stack overflow and it was used as it simpler than the function ihad in mind as i didnt know how to select the href attribute.
source: https://stackoverflow.com/questions/17733076/smooth-scroll-anchor-links-without-jquery
*/


// Scroll to top button

function showButton () {
  toTopButton.classList.remove('active');
  if (window.pageYOffset > 100) {
    toTopButton.classList.add('active');
  }
  else {
    toTopButton.classList.remove('active');
  }
};

// scroll to top when clicked function
function toTop () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

//highlight nav links when section is in viewport

let navLinks = document.querySelectorAll('a');
window.addEventListener('scroll', ()=> {
  let currentSec = "";
  for (const section of Sections) {
    const sectionTopOffset = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= (sectionTopOffset - sectionHeight/2)) {
      currentSec = section.id;
    };
  }
  for (const li of navLinks) {
    li.classList.remove('active');
    if (li.classList.contains(currentSec)) {
      li.classList.add('active');
    }
  }
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

window.addEventListener("scroll", showButton);
toTopButton.addEventListener("click", toTop);

// Build menu 

// Scroll to section on link click

// Set sections as active

