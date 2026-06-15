// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeAboutPage();
});

// Initialize all about page functionality
function initializeAboutPage() {
    initializeSearchBox();
    initializeProgressBars();
    initializeNavbar();
    initializeNewsletter();
    initializeScrollAnimations();
}

// Search Box Functionality (Same as home)
function initializeSearchBox() {
    const searchBox = document.getElementById('searchBox');

    if (!searchBox) return;

    const searchInput = searchBox.querySelector('.search-input');

    if (!searchInput) return;

    searchBox.addEventListener('click', function() {
        searchBox.classList.add('active');
        searchInput.focus();
    });

    document.addEventListener('click', function(e) {
        if (!searchBox.contains(e.target)) {
            searchBox.classList.remove('active');
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                performSearch(searchTerm);
            }
        }
    });
}

// Search functionality
function performSearch(searchTerm) {
    console.log('Searching for:', searchTerm);
    showNotification(`Searching for: "${searchTerm}"`, 'info');
}

// Progress Bars Animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // Intersection Observer for progress bars
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progressValue = progressBar.getAttribute('data-progress');
                
                setTimeout(() => {
                    progressBar.style.width = progressValue + '%';
                }, 500);
                
                // Animate the numbers counting up
                animateCounter(progressBar, progressValue);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Animate counter numbers
function animateCounter(progressBar, targetValue) {
    const progressItem = progressBar.closest('.progress-item');
    const valueElement = progressItem.querySelector('.progress-value');
    
    if (!valueElement) return;
    
    let startValue = 0;
    const increment = targetValue / 50; // 50 steps
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= targetValue) {
            startValue = targetValue;
            clearInterval(timer);
        }
        valueElement.textContent = Math.floor(startValue) + '%';
    }, stepTime);
}

// Navbar scroll effect (Same as home)
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            navbar.style.backdropFilter = 'none';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Newsletter functionality (Same as home)
function initializeNewsletter() {
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', function() {
            const email = newsletterInput.value.trim();
            if (validateEmail(email)) {
                handleNewsletterSignup(email);
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
        
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterBtn.click();
            }
        });
    }
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle newsletter signup
function handleNewsletterSignup(email) {
    const newsletterBtn = document.querySelector('.newsletter-btn');
    if (!newsletterBtn) return;
    
    // Show loading state
    const originalText = newsletterBtn.textContent;
    newsletterBtn.textContent = 'Subscribing...';
    newsletterBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        newsletterBtn.textContent = originalText;
        newsletterBtn.disabled = false;
        const newsletterInput = document.querySelector('.newsletter-input');
        if (newsletterInput) newsletterInput.value = '';
        showNotification('Thank you for subscribing to our newsletter!', 'success');
    }, 1500);
}

// Scroll Animations for various elements
function initializeScrollAnimations() {
    // Stats animation
    const stats = document.querySelectorAll('.stat h3');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const finalValue = statElement.textContent;
                const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
                const suffix = finalValue.replace(/[0-9.]/g, '');
                
                animateStatCounter(statElement, numericValue, suffix);
                statsObserver.unobserve(statElement);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Team member hover effects
    initializeTeamHoverEffects();
    
    // CTA buttons hover effects
    initializeCTAEffects();
}

// Animate statistics counters
function animateStatCounter(element, targetValue, suffix) {
    let startValue = 0;
    const increment = targetValue / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= targetValue) {
            startValue = targetValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(startValue);
        if (targetValue >= 1000) {
            displayValue = (displayValue / 1000).toFixed(displayValue % 1000 === 0 ? 0 : 1);
        }
        
        element.textContent = displayValue + suffix;
    }, stepTime);
}

// Team member interactions
function initializeTeamHoverEffects() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Social media links
        const socialLinks = member.querySelectorAll('.member-social a');
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.querySelector('i').classList.contains('fa-linkedin') ? 'LinkedIn' : 
                               this.querySelector('i').classList.contains('fa-twitter') ? 'Twitter' : 'Social Media';
                showNotification(`Opening ${platform} profile...`, 'info');
            });
        });
    });
}

// CTA Button effects
function initializeCTAEffects() {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('div');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Handle button action
            const buttonText = this.textContent;
            if (buttonText.includes('Volunteer')) {
                showNotification('Redirecting to volunteer registration...', 'success');
                setTimeout(() => {
                    window.location.href = 'register.html';
                }, 1000);
            } else if (buttonText.includes('Donation')) {
                showNotification('Redirecting to donation portal...', 'info');
            }
        });
    });
}

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Notification system (Same as home)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Parallax effect for hero background
function initializeParallax() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (!heroBackground) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    });
}

// Initialize parallax on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeParallax, 100);
});

// Add floating action button for scroll to top
function createFloatingActionButton() {
    const fab = document.createElement('div');
    fab.innerHTML = '<i class="fas fa-chevron-up"></i>';
    fab.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
        z-index: 1000;
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
    `;
    
    fab.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(fab);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            fab.style.opacity = '1';
            fab.style.visibility = 'visible';
        } else {
            fab.style.opacity = '0';
            fab.style.visibility = 'hidden';
        }
    });
}

// Initialize floating action button
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(createFloatingActionButton, 1000);
});