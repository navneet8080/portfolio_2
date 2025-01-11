// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Example of additional interactivity (if needed later)
console.log("Welcome to Navneet Tiwari's Portfolio!");


console.log("Welcome to Navneet Tiwari's Portfolio!11111111111111111111111111");