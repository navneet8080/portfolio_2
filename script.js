// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            console.error(`Target element not found for ${this.getAttribute('href')}`);
        }
    });
});

// Theme Toggle with Persistence
const themeToggleSmall = document.getElementById('theme-toggle-small');
const themeToggleLarge = document.getElementById('theme-toggle-large');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('navbar').classList.add('navbar-dark', 'bg-dark');
    document.getElementById('navbar').classList.remove('navbar-light', 'bg-light');
    themeToggleSmall.textContent = '☀️';
    themeToggleLarge.textContent = '☀️';
} else {
    document.body.classList.add('light-mode');
    document.getElementById('navbar').classList.add('navbar-light', 'bg-light');
    document.getElementById('navbar').classList.remove('navbar-dark', 'bg-dark');
    themeToggleSmall.textContent = '🌙';
    themeToggleLarge.textContent = '🌙';
}

const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    themeToggleSmall.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    themeToggleLarge.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    themeToggleSmall.setAttribute('aria-label', newTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggleLarge.setAttribute('aria-label', newTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    
    const navbar = document.getElementById('navbar');
    if (newTheme === 'dark') {
        navbar.classList.add('navbar-dark', 'bg-dark');
        navbar.classList.remove('navbar-light', 'bg-light');
    } else {
        navbar.classList.add('navbar-light', 'bg-light');
        navbar.classList.remove('navbar-dark', 'bg-dark');
    }
};

themeToggleSmall.addEventListener('click', toggleTheme);
themeToggleLarge.addEventListener('click', toggleTheme);

// Close Navbar Menu When Clicking Outside
document.addEventListener('click', (e) => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
        navbarCollapse.classList.remove('show');
    }
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#navbarNav .nav-link');
function activateNavLink() {
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', activateNavLink);

// Animate On Scroll (AOS) initialization
if (typeof AOS !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        AOS.init({
            duration: 800,
            once: true
        });
    });
}

// --- Scroll-triggered horizontal nav ---
// Create the scroll-nav dynamically if not present
if (!document.querySelector('.scroll-nav')) {
    const scrollNav = document.createElement('nav');
    scrollNav.className = 'scroll-nav';
    scrollNav.innerHTML = `
        <ul class="scroll-nav-list">
            <li><a class="scroll-nav-link" href="#about">About</a></li>
            <li><a class="scroll-nav-link" href="#skills">Skills</a></li>
            <li><a class="scroll-nav-link" href="#projects">Projects</a></li>
            <li><a class="scroll-nav-link" href="#certifications">Certifications</a></li>
            <li><a class="scroll-nav-link" href="#contact">Contact</a></li>
        </ul>
    `;
    document.body.appendChild(scrollNav);
}

const mainNavbar = document.querySelector('.navbar');
const scrollNav = document.querySelector('.scroll-nav');
const skillsSection = document.getElementById('landing');

function toggleScrollNav() {
    const skillsBottom = skillsSection.getBoundingClientRect().bottom + window.scrollY;
    if (window.scrollY >= skillsBottom) {
        mainNavbar.style.display = 'none';
        scrollNav.style.display = 'block';
    } else {
        mainNavbar.style.display = '';
        scrollNav.style.display = 'none';
    }
}
window.addEventListener('scroll', toggleScrollNav);

// Highlight active link in scroll-nav
function activateScrollNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.scroll-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', activateScrollNavLink);

// Smooth scroll for scroll-nav links
scrollNav.addEventListener('click', function(e) {
    if (e.target.classList.contains('scroll-nav-link')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});

