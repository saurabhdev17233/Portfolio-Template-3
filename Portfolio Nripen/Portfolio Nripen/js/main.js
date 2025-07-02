document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // Update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Intersection Observer for scroll animations
    const animateOnScroll = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateOnScroll.forEach(element => {
        observer.observe(element);
    });

    // Add 'animate-on-scroll' class to relevant elements in index.html
    // This needs to be done in index.html, not here.

    // Contact form submission (basic alert for now)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Client-side blog search filter
    const blogSearchInput = document.getElementById('blog-search');
    const blogCards = document.querySelectorAll('.blog-card');

    if (blogSearchInput && blogCards.length > 0) {
        blogSearchInput.addEventListener('keyup', function () {
            const searchTerm = this.value.toLowerCase();
            blogCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Skill bar animation (triggered by Intersection Observer)
    const skillBars = document.querySelectorAll('.skill-bar');

    const skillObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const percentage = skillBar.dataset.percentage;
                skillBar.style.width = percentage;
                skillBar.style.transition = 'width 1.5s ease-out';
                observer.unobserve(skillBar);
            }
        });
    }, skillObserverOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Typewriter effect for home section
    const typewriterText = document.getElementById('typewriter-text');
    if (typewriterText) {
        const text = typewriterText.textContent;
        typewriterText.textContent = ''; // Clear content initially
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typewriterText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 70); // Typing speed
            } else {
                // Optional: remove blinking cursor after typing
                typewriterText.style.borderRight = 'none';
            }
        }
        typeWriter();
    }

    // Add a simple parallax effect to the home section background (if applicable)
    // This would typically involve CSS background-attachment: fixed or JS for more control
    // For a simple effect, ensure the home section has a background image and add:
    // background-attachment: fixed; in CSS for #home
});