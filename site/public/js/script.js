// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    initializeSearchBox();
    initializeSlider();
    initializeNavbar();
    initializeNewsletter();
    initializeEventButtons();
}

// Search Box Functionality
function initializeSearchBox() {
    const searchBox = document.getElementById('searchBox');
    if (!searchBox) return; // Exit if element doesn't exist
    
    const searchInput = searchBox.querySelector('.search-input');
    if (!searchInput) return; // Exit if search input doesn't exist
    
    searchBox.addEventListener('click', function() {
        searchBox.classList.add('active');
        searchInput.focus();
    });
    
    // Close search box when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchBox.contains(e.target)) {
            searchBox.classList.remove('active');
        }
    });
    
    // Handle search input
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

// Slider Functionality
function initializeSlider() {
    const sliderContainer = document.getElementById('sliderContainer');
    const slides = document.querySelectorAll('.slide');
    const sliderNav = document.getElementById('sliderNav');
    
    if (!sliderContainer || !slides.length || !sliderNav) return; // Exit if elements don't exist
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Create navigation dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('nav-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        sliderNav.appendChild(dot);
    }
    
    const navDots = document.querySelectorAll('.nav-dot');
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        const translateX = -slideIndex * 100;
        sliderContainer.style.transform = `translateX(${translateX}%)`;
        
        // Update active dot
        navDots.forEach(dot => dot.classList.remove('active'));
        if (navDots[slideIndex]) {
            navDots[slideIndex].classList.add('active');
        }
        
        // Trigger slide content animation
        animateSlideContent(slideIndex);
    }
    
    // Auto-slide functionality
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }
    
    // Start auto-sliding
    let slideInterval = setInterval(nextSlide, 2000);
    
    // Pause auto-slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        heroSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 2000);
        });
    }
    
    // Initialize first slide animation
    setTimeout(() => animateSlideContent(0), 100);
}

// Animate slide content
function animateSlideContent(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    if (!slides[slideIndex]) return;
    
    const currentSlideElement = slides[slideIndex];
    const slideContent = currentSlideElement.querySelector('.slide-content');
    if (!slideContent) return;
    
    const h1 = slideContent.querySelector('h1');
    const p = slideContent.querySelector('p');
    const button = slideContent.querySelector('.cta-button');
    
    // Reset animations
    [h1, p, button].forEach(el => {
        if (el) {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
        }
    });
    
    // Apply animations with delay
    setTimeout(() => {
        if (h1) h1.style.animation = 'slideUp 1s ease forwards';
        if (p) p.style.animation = 'slideUp 1s ease 0.3s forwards';
        if (button) button.style.animation = 'slideUp 1s ease 0.6s forwards';
    }, 50);
}

// Event Buttons Functionality
function initializeEventButtons() {
    const joinButtons = document.querySelectorAll('.join-btn');
    
    joinButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const eventCard = this.closest('.event-card');
            const eventTitleElement = eventCard ? eventCard.querySelector('.event-title') : null;
            const eventTitle = eventTitleElement ? eventTitleElement.textContent : 'Unknown Event';
            handleEventJoin(eventTitle);
        });
    });
}

// Handle event join functionality
function handleEventJoin(eventTitle) {
    // Create a ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
        z-index: 9999;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
        showNotification(`Thank you for your interest in "${eventTitle}"! Registration form would open here.`, 'success');
    }, 600);
}

// Add ripple effect CSS
if (!document.getElementById('ripple-style')) {
    const rippleStyle = document.createElement('style');
    rippleStyle.id = 'ripple-style';

    rippleStyle.textContent = `
        @keyframes rippleEffect {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(20);
                opacity: 0;
            }
        }
    `;

    document.head.appendChild(rippleStyle);
}

// Navbar scroll effect
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

// Newsletter functionality
function initializeNewsletter() {
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (!newsletterBtn || !newsletterInput) return; // Exit if elements don't exist
    
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

// Notification system
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

// CTA Button interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button')) {
        const buttonText = e.target.textContent;
        handleCTAClick(buttonText);
    }
});

function handleCTAClick(action) {
    const actions = {
        'Get Involved': 'volunteer registration',
        'Learn More': 'information page',
        'Support Now': 'donation portal',
        'Volunteer': 'volunteer application',
        'Join Campaign': 'campaign registration',
        'Donate': 'donation form',
        'Mentor': 'mentorship program'
    };
    
    const destination = actions[action] || 'main page';
    showNotification(`Redirecting to ${destination}...`, 'info');
}

// Add floating action button for quick access
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
    
    fab.addEventListener('mouseenter', () => {
        fab.style.transform = 'scale(1.1)';
        fab.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.4)';
    });
    
    fab.addEventListener('mouseleave', () => {
        fab.style.transform = 'scale(1)';
        fab.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.3)';
    });
    
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