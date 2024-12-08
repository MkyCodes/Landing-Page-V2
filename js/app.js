/**
 * Define Global Variables
 */
const navMenu = document.getElementById('main-nav-list'); // Navigation list element
const pageSections = document.querySelectorAll('section'); // All section elements

/**
 * End Global Variables
 * Start Helper Functions
 */

/**
 * Creates the navigation items dynamically based on sections.
 * Adds them to the navbar.
 */
const generateNavMenu = () => {
    if (!navMenu) return; // Prevents errors if navMenu is null

    let navHTML = '';
    pageSections.forEach(section => {
        const sectionId = section.id;
        const sectionLabel = section.dataset.nav;

        navHTML += `<li><a class="nav-link" href="#${sectionId}">${sectionLabel}</a></li>`;
    });
    navMenu.innerHTML = navHTML;
};

/**
 * Calculates the offset for each section to determine visibility.
 */
const getSectionOffset = (section) => {
    return Math.floor(section.getBoundingClientRect().top);
};

/**
 * Removes the active class and styling from a section.
 */
const deactivateSection = (section) => {
    section.classList.remove('active-section');
    section.style.cssText = "background-color: rgba(255,255,255,.1);";
};

/**
 * Adds the active class and styling to a section.
 */
const activateSection = (condition, section) => {
    if (condition) {
        section.classList.add('active-section');
        section.style.cssText = "background-color: rgba(255,255,0,.3);";
    }
};

/**
 * Controls the activation of sections when in the viewport.
 */
const monitorSectionActivation = () => {
    pageSections.forEach(section => {
        const sectionOffset = getSectionOffset(section);
        const isInViewport = sectionOffset < 150 && sectionOffset >= -150;

        deactivateSection(section);
        activateSection(isInViewport, section);
    });
};

/**
 * Scroll to the respective section when a nav link is clicked.
 */
const enableSmoothScrolling = () => {
    const navLinks = document.querySelectorAll('.nav-links a'); // Change .navbar__menu to .nav-links
    
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').slice(1); // Remove '#' from href
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
};

/**
 * Begin Events
 */

// Make sure DOM is ready before executing the functions
document.addEventListener('DOMContentLoaded', function() {
    generateNavMenu();
    enableSmoothScrolling();
    window.addEventListener('scroll', monitorSectionActivation);
});
