document.addEventListener('DOMContentLoaded', () => {

    // Set Copyright Year dynamically
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if(hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(hamburger) hamburger.classList.remove('active');
            if(navMenu) navMenu.classList.remove('active');
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Active Link Switching Based on URL ---
    const updateActiveLink = () => {
        const path = window.location.pathname;
        const links = document.querySelectorAll('.nav-menu a');
        
        // Remove active from all
        links.forEach(link => {
            // Ignore the contact button as it has its own styling unless we are on contact page
            if(!link.classList.contains('btn-primary-sm')) {
                link.classList.remove('active');
            }
        });
        
        let found = false;
        links.forEach(link => {
            const href = link.getAttribute('href');
            if(href && href !== '#' && path.includes(href)) {
                link.classList.add('active');
                
                // If it's contact, ensure btn gets active style (already hardcoded in html, but good fallback)
                if(href === 'contact.html') {
                    link.style.background = 'var(--text-main)';
                    link.style.color = '#fff';
                }
                
                found = true;
            }
        });

        // Default to home if nothing matches (like root / or generic page)
        if (!found && path.endsWith('/')) {
            const homeLink = document.querySelector('.nav-menu a[href="index.html"]');
            if (homeLink) homeLink.classList.add('active');
        }
    };
    
    updateActiveLink();

    // --- Intersection Observer for Scroll Animations ---
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Unobserve to animate only once
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // Form submission prevention (demo only)
    const form = document.getElementById('contactForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = `<i class="fa-solid fa-check"></i> Sent Successfully!`;
            btn.style.background = '#10b981'; // Green
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }
});
