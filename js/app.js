// Global variables
const sections = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');
const navbar = document.querySelector('.navbar__menu');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
let isScrolling; // Variable to track scrolling activity

// Helper Functions

/**
 * Get the distance from the top of an element to the top of the viewport.
 * @param {Element} element 
 * @returns {number} Distance in pixels
 */
const getOffset = (element) => Math.floor(element.getBoundingClientRect().top);

/**
 * Add active class to a section and its corresponding nav link.
 * @param {Element} section 
 */
const activateSection = (section) => {
  section.classList.add('your-active-class');
  const navLink = document.querySelector(`a[href="#${section.id}"]`);
  if (navLink) navLink.classList.add('active');
};

/**
 * Remove active class from all sections and nav links.
 */
const deactivateAllSections = () => {
  for (const section of sections) {
    section.classList.remove('your-active-class');
    const navLink = document.querySelector(`a[href="#${section.id}"]`);
    if (navLink) navLink.classList.remove('active');
  }
};

// Main Functions

/**
 * Build the dynamic navigation menu.
 */
const buildNav = () => {
  for (const section of sections) {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = section.getAttribute('data-nav');
    link.classList.add('menu__link');
    link.href = `#${section.id}`;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      section.scrollIntoView({ behavior: 'smooth' });
    });
    listItem.appendChild(link);
    navList.appendChild(listItem);
  }
};

/**
 * Highlight the active section and its corresponding nav link based on scroll position.
 */
const highlightActiveSection = () => {
  for (const section of sections) {
    if (getOffset(section) < 150 && getOffset(section) >= -150) {
      deactivateAllSections();
      activateSection(section);
      return; // Exit loop once an active section is found
    }
  }
};

/**
 * Show/hide the navbar based on scroll activity.
 */
const handleScroll = () => {
  navbar.style.display = 'block';
  clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    navbar.style.display = 'none';
  }, 7000); // Hide after 7 seconds of inactivity
};

/**
 * Show the scroll-to-top button when scrolling down.
 */
const toggleScrollToTopBtn = () => {
  scrollToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none'; 
};

// Event Listeners

document.addEventListener('DOMContentLoaded', buildNav);
window.addEventListener('scroll', () => {
  highlightActiveSection();
  toggleScrollToTopBtn();
  handleScroll(); 
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
