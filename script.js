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

console.log("Welcome to Navneet Tiwari's Portfolio!");