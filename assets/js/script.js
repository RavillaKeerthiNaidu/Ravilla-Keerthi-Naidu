// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Load saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light-mode';
document.body.classList.add(savedTheme);
updateThemeIcon(savedTheme);

// Listen for theme toggle
themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const theme = isDarkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark-mode') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.experience-card, .education-card, .project-card, .skill-category, .stat').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Navbar active state on scroll
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-dark)';
        }
    });
});

// Scroll to top button
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Create scroll to top button
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.classList.add('scroll-to-top');
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-lg);
    `;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', scrollToTop);
    document.body.appendChild(button);
};

createScrollToTopButton();

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
        hero.style.backgroundPosition = `center ${window.scrollY * 0.5}px`;
    }
});

// Add typing animation to hero subtitle
const animateText = (element, text, speed = 50) => {
    let index = 0;
    element.textContent = '';
    
    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Animate hero subtitle on load
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    animateText(subtitle, originalText);
});

// Skills filtering (optional)
const createSkillsFilter = () => {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const tags = category.querySelectorAll('.skill-tag');
        tags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tags.forEach(t => {
                    if (t !== tag) {
                        t.style.opacity = '0.5';
                    }
                });
            });
            
            tag.addEventListener('mouseleave', () => {
                tags.forEach(t => {
                    t.style.opacity = '1';
                });
            });
        });
    });
};

createSkillsFilter();

// Project card click animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact form (if needed in future)
const initializeContactForm = () => {
    // Placeholder for future contact form functionality
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.background = 'var(--primary-color)';
            card.style.color = 'white';
            const icon = card.querySelector('i');
            icon.style.color = 'white';
            const p = card.querySelector('p');
            if (p) p.style.color = 'white';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--bg-white)';
            card.style.color = 'var(--text-dark)';
            const icon = card.querySelector('i');
            icon.style.color = 'var(--primary-color)';
            const p = card.querySelector('p');
            if (p) p.style.color = 'var(--text-light)';
        });
    });
};

initializeContactForm();

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = element.textContent;
        }
    };
    
    updateCounter();
};

// Observe stats for counter animation
const stats = document.querySelectorAll('.stat h3');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const number = parseInt(text);
            if (!isNaN(number)) {
                animateCounter(entry.target, number);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// Responsive navbar toggle (for mobile)
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-dark);
        `;
        
        // Show menu button on mobile
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
        }
    }
};

createMobileMenu();

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Prevent memory leaks
window.addEventListener('unload', () => {
    observer.disconnect();
    statsObserver.disconnect();
});

console.log('Resume portfolio loaded successfully!');
