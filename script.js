document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. MOBILE DRAWER NAVIGATION
    // ==========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = () => {
        menuToggle.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    };

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', toggleMenu);
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });

        // Close menu on outside clicks
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('open') && 
                !mobileMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                toggleMenu();
            }
        });
    }

    // ==========================================================================
    // 2. THEME MANAGER (Light/Dark Mode)
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeColorMeta = document.getElementById('theme-color-meta');
    
    const getSavedTheme = () => localStorage.getItem('theme');
    // Dark is the default — premium engineering aesthetic
    const getDefaultTheme = () => 'dark';

    const setTheme = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            if (themeColorMeta) themeColorMeta.setAttribute('content', '#f8fafc');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            if (themeColorMeta) themeColorMeta.setAttribute('content', '#070a13');
            localStorage.setItem('theme', 'dark');
        }
    };

    // Init Theme — dark by default
    setTheme(getSavedTheme() || getDefaultTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
            setTheme(nextTheme);
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!getSavedTheme()) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ==========================================================================
    // 3. DASHBOARD TAB CONTROLLER
    // ==========================================================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    const switchTab = (targetId) => {
        const targetPanel = document.getElementById(targetId);
        if (!targetPanel) return;

        // Reset active state for all buttons and panels
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        
        tabPanels.forEach(panel => {
            panel.classList.remove('active');
            panel.setAttribute('aria-hidden', 'true');
        });

        // Set active states on matching elements
        const matchingBtn = document.querySelector(`.tab-btn[data-target="${targetId}"]`);
        if (matchingBtn) {
            matchingBtn.classList.add('active');
            matchingBtn.setAttribute('aria-selected', 'true');
        }
        
        targetPanel.classList.add('active');
        targetPanel.setAttribute('aria-hidden', 'false');
    };

    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = btn.getAttribute('data-target');
            switchTab(targetId);
        });
    });

    // ==========================================================================
    // 4. CROSS-NAVIGATION MAPPER (Link Navbar to Dashboard Tabs)
    // ==========================================================================
    const dashboardSection = document.getElementById('dashboard-section');
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

    allAnchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#' || href === '') return;

            // Check if link maps to a specific dashboard tab redirect
            let tabTarget = null;
            if (href === '#expertise') tabTarget = 'skills-panel';
            if (href === '#experience' || href === '#projects') tabTarget = 'career-panel';
            if (href === '#publications') tabTarget = 'research-panel';
            if (href === '#certifications') tabTarget = 'skills-panel';

            if (tabTarget) {
                e.preventDefault();
                switchTab(tabTarget);
                
                if (dashboardSection) {
                    const offsetTop = dashboardSection.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Track active navigation classes manually
                document.querySelectorAll('.nav-link').forEach(navL => navL.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // 5. INTERSECTION OBSERVER FOR GLOBAL SCROLL ACTIVE STATES
    // ==========================================================================
    const observerSections = document.querySelectorAll('section[id], div[id="dashboard-section"]');
    const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');
    const drawerNavLinks = document.querySelectorAll('.mobile-nav-list .mobile-nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Helper to update active links
                const updateLinkStates = (links, activeHref) => {
                    links.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === activeHref) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                };

                if (id === 'hero') {
                    desktopNavLinks.forEach(l => l.classList.remove('active'));
                    drawerNavLinks.forEach(l => l.classList.remove('active'));
                } else if (id === 'dashboard-section') {
                    // Look at which tab is active and highlight corresponding link
                    const activePanel = document.querySelector('.tab-panel.active');
                    if (activePanel) {
                        const panelId = activePanel.getAttribute('id');
                        let navHref = '#experience';
                        if (panelId === 'skills-panel') navHref = '#expertise';
                        if (panelId === 'research-panel') navHref = '#publications';
                        
                        updateLinkStates(desktopNavLinks, navHref);
                        updateLinkStates(drawerNavLinks, navHref);
                    }
                } else {
                    updateLinkStates(desktopNavLinks, `#${id}`);
                    updateLinkStates(drawerNavLinks, `#${id}`);
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observerSections.forEach(sec => observer.observe(sec));

    // ==========================================================================
    // 6. CONTACT FORM LOADER INDICATOR
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting Brief...';
                submitBtn.style.opacity = '0.8';
            }
        });
    }

    // Logo Click returns to top smoothly
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            desktopNavLinks.forEach(link => link.classList.remove('active'));
            drawerNavLinks.forEach(link => link.classList.remove('active'));
        });
    }
});
