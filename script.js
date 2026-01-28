// ===========================
// CUSTOM CURSOR
// ===========================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
});

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursorOutline.style.left = `${cursorX}px`;
    cursorOutline.style.top = `${cursorY}px`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Enlarge cursor on hover
const hoverElements = document.querySelectorAll('a, button, .project-card, .stat-card, .company-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.width = '16px';
        cursorDot.style.height = '16px';
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
    });
});

// ===========================
// NAVIGATION
// ===========================
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===========================
// SMOOTH SCROLL
// ===========================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// GLITCH EFFECT
// ===========================
const glitchTitle = document.querySelector('.glitch');

if (glitchTitle) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchTitle.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00fff5,
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff006e
            `;
            
            setTimeout(() => {
                glitchTitle.style.textShadow = 'none';
            }, 100);
        }
    }, 100);
}

// ===========================
// INTERSECTION OBSERVER
// ===========================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .stat-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// COUNTER ANIMATION
// ===========================
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
};

// Animate counters when in viewport
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animateCounter(entry.target);
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// ===========================
// PARALLAX EFFECT
// ===========================
const parallaxElements = document.querySelectorAll('.gradient-orb');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
});

// ===========================
// TYPING EFFECT (Optional)
// ===========================
const subtitleLines = document.querySelectorAll('.subtitle-line');

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// window.addEventListener('load', () => {
//     setTimeout(() => {
//         subtitleLines.forEach((line, index) => {
//             const text = line.textContent;
//             setTimeout(() => typeWriter(line, text, 80), index * 1000);
//         });
//     }, 1000);
// });

// ===========================
// FLOATING BADGES ANIMATION
// ===========================
const floatingBadges = document.querySelectorAll('.floating-badge');

floatingBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.5}s`;
});

// ===========================
// PROJECT CARD 3D EFFECT
// ===========================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===========================
// FORM HANDLING
// ===========================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        console.log('Form submitted:', formData);
        
        // Send email using EmailJS FIRST
        emailjs.send("service_s1vcnwr", "template_hx9x09u", formData)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                // ONLY show success message AFTER email is sent
                alert('Message sent successfully! I will get back to you soon.');
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            })
            .catch((error) => {
                console.error('FAILED...', error);
                alert('Failed to send message. Please try again.');
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// ===========================
// SCROLL ANIMATIONS
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Animate elements on scroll
    document.querySelectorAll('.about-text, .about-stats').forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});

// ===========================
// TIMELINE ANIMATION
// ===========================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
});

// ===========================
// IMAGE LOADING
// ===========================
const images = document.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    }
});

// ===========================
// PREVENT FLASH ON LOAD
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===========================
// EASTER EGG - KONAMI CODE
// ===========================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 5000);
    
    console.log('🎉 Easter egg activated! You found the secret!');
}

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ===========================
// CONSOLE MESSAGE
// ===========================
console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #00fff5;');
console.log('%cLooking at the code? Feel free to reach out if you want to collaborate!', 'font-size: 14px; color: #b8c1ec;');
console.log('%c🚀 Built with passion by Michael', 'font-size: 14px; color: #ff006e;');

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    highlightNavLink();
}, 10));

// ===========================
// PRELOAD CRITICAL IMAGES
// ===========================
function preloadImages() {
    const images = [
        'YOUR_IMAGE_URL_HERE.jpg',
        'COMPANY_1_LOGO.png',
        'COMPANY_2_LOGO.png',
        'COMPANY_3_LOGO.png',
        'PROJECT_1_IMAGE.jpg',
        'PROJECT_2_IMAGE.jpg',
        'PROJECT_3_IMAGE.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

window.addEventListener('load', preloadImages);

// ===========================
// PRINT FRIENDLY
// ===========================
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});