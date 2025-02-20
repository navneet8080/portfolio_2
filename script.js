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
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('navbar').classList.add('navbar-dark', 'bg-dark');
    document.getElementById('navbar').classList.remove('navbar-light', 'bg-light');
    themeToggle.textContent = '☀️';
} else {
    document.body.classList.add('light-mode');
    document.getElementById('navbar').classList.add('navbar-light', 'bg-light');
    document.getElementById('navbar').classList.remove('navbar-dark', 'bg-dark');
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', newTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    
    const navbar = document.getElementById('navbar');
    if (newTheme === 'dark') {
        navbar.classList.add('navbar-dark', 'bg-dark');
        navbar.classList.remove('navbar-light', 'bg-light');
    } else {
        navbar.classList.add('navbar-light', 'bg-light');
        navbar.classList.remove('navbar-dark', 'bg-dark');
    }
});

console.log("Welcome to Navneet Tiwari's Portfolio!");