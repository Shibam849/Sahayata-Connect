// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeRegisterPage();
});

// Initialize all register page functionality
function initializeRegisterPage() {
    initializeFormValidation();
    initializePasswordToggle();
    initializeSocialRegister();
    initializeNavbar();
}

// Form validation and submission
function initializeFormValidation() {
    const registerForm = document.getElementById('registerForm');

    if (!registerForm) {
    return;
}

    const inputs = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        interests: document.getElementById('interests'),
        experience: document.getElementById('experience'),
        terms: document.getElementById('terms')
    };

    Object.keys(inputs).forEach(key => {
        if (inputs[key]) {
            inputs[key].addEventListener('blur', () => validateField(key));
            inputs[key].addEventListener('input', () => clearError(key + 'Error'));
        }
    });

    if (inputs.confirmPassword) {
        inputs.confirmPassword.addEventListener('input', () => {
            validatePasswordMatch();
        });
    }

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateAllFields()) {
            handleRegistration();
        }
    });
}

// Validate individual field
function validateField(fieldName) {
    const validators = {
        firstName: validateFirstName,
        lastName: validateLastName,
        email: validateEmail,
        phone: validatePhone,
        password: validatePassword,
        confirmPassword: validatePasswordMatch,
        interests: validateInterests,
        experience: validateExperience,
        terms: validateTerms
    };
    
    return validators[fieldName] ? validators[fieldName]() : true;
}

// Individual field validators
function validateFirstName() {
    const firstName = document.getElementById('firstName').value.trim();
    
    if (!firstName) {
        showError('firstNameError', 'First name is required');
        return false;
    }
    
    if (firstName.length < 2) {
        showError('firstNameError', 'First name must be at least 2 characters');
        return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(firstName)) {
        showError('firstNameError', 'First name can only contain letters');
        return false;
    }
    
    clearError('firstNameError');
    return true;
}

function validateLastName() {
    const lastName = document.getElementById('lastName').value.trim();
    
    if (!lastName) {
        showError('lastNameError', 'Last name is required');
        return false;
    }
    
    if (lastName.length < 2) {
        showError('lastNameError', 'Last name must be at least 2 characters');
        return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(lastName)) {
        showError('lastNameError', 'Last name can only contain letters');
        return false;
    }
    
    clearError('lastNameError');
    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    
    if (!email) {
        showError('emailError', 'Email address is required');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        return false;
    }
    
    clearError('emailError');
    return true;
}

function validatePhone() {
    const phone = document.getElementById('phone').value.trim();
    
    if (!phone) {
        showError('phoneError', 'Phone number is required');
        return false;
    }
    
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
        showError('phoneError', 'Please enter a valid phone number');
        return false;
    }
    
    clearError('phoneError');
    return true;
}

function validatePassword() {
    const password = document.getElementById('password').value;
    
    if (!password) {
        showError('passwordError', 'Password is required');
        return false;
    }
    
    if (password.length < 8) {
        showError('passwordError', 'Password must be at least 8 characters long');
        return false;
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        showError('passwordError', 'Password must contain at least one uppercase letter, one lowercase letter, and one number');
        return false;
    }
    
    clearError('passwordError');
    return true;
}

function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!confirmPassword) {
        showError('confirmPasswordError', 'Please confirm your password');
        return false;
    }
    
    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        return false;
    }
    
    clearError('confirmPasswordError');
    return true;
}

function validateInterests() {
    const interests = document.getElementById('interests').value;
    
    if (!interests) {
        showError('interestsError', 'Please select an area of interest');
        return false;
    }
    
    clearError('interestsError');
    return true;
}

function validateExperience() {
    const experience = document.getElementById('experience').value;
    
    if (!experience) {
        showError('experienceError', 'Please select your experience level');
        return false;
    }
    
    clearError('experienceError');
    return true;
}

function validateTerms() {
    const terms = document.getElementById('terms').checked;
    
    if (!terms) {
        showError('termsError', 'You must agree to the Terms of Service and Privacy Policy');
        return false;
    }
    
    clearError('termsError');
    return true;
}

// Validate all fields
function validateAllFields() {
    const fields = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword', 'interests', 'experience', 'terms'];
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Show error message
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Clear error message
function clearError(errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// Handle registration process
function handleRegistration() {
    const registerBtn = document.getElementById('registerBtn');
    const formData = getFormData();
    
    // Show loading state
    registerBtn.classList.add('loading');
    registerBtn.disabled = true;
    
    // Simulate registration API call
    setTimeout(() => {
        // Mock successful registration
        console.log('Registration data:', formData);
        
        registerBtn.classList.remove('loading');
        registerBtn.disabled = false;
        
        // Show success modal
        showSuccessModal();
    }, 3000);
}

// Get form data
function getFormData() {
    return {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        password: document.getElementById('password').value,
        interests: document.getElementById('interests').value,
        experience: document.getElementById('experience').value,
        newsletter: document.getElementById('newsletter').checked,
        timestamp: new Date().toISOString()
    };
}

// Password toggle functionality
function initializePasswordToggle() {
    const passwordToggle = document.getElementById('passwordToggle');
    const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            togglePasswordVisibility(passwordInput, this);
        });
    }

    if (confirmPasswordToggle && confirmPasswordInput) {
        confirmPasswordToggle.addEventListener('click', function() {
            togglePasswordVisibility(confirmPasswordInput, this);
        });
    }
}

function togglePasswordVisibility(input, button) {
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    
    const icon = button.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
}

// Social registration functionality
function initializeSocialRegister() {
    const googleBtn = document.getElementById('googleRegister');
    const facebookBtn = document.getElementById('facebookRegister');

    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';

            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            showNotification(
                'Google registration will be implemented soon!',
                'info'
            );
        });
    }

    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';

            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            showNotification(
                'Facebook registration will be implemented soon!',
                'info'
            );
        });
    }
}

// Success modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('show');
}

// Navbar functionality
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
        
        lastScrollY = currentScrollY;
    });
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
    }, 4000);
}

// Phone number formatting
const phoneInput = document.getElementById('phone');

if (phoneInput !== null) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 10) {
            value = value.slice(0, 10);
        }

        if (value.length >= 6) {
            value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
        } else if (value.length >= 3) {
            value = value.slice(0, 3) + '-' + value.slice(3);
        }

        e.target.value = value;
    });
}

// Auto-focus first name input
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const firstNameInput = document.getElementById('firstName');
        if (firstNameInput) {
            firstNameInput.focus();
        }
    }, 500);
});

// Password strength indicator
function addPasswordStrengthIndicator() {
    const passwordInput = document.getElementById('password');

    // FIX: stop if password field doesn't exist
    if (!passwordInput) {
        return;
    }

    const strengthIndicator = document.createElement('div');
    strengthIndicator.className = 'password-strength';

    strengthIndicator.innerHTML = `
        <div class="strength-bar">
            <div class="strength-fill" id="strengthFill"></div>
        </div>
        <span class="strength-text" id="strengthText">Password strength</span>
    `;

    const strengthStyle = document.createElement('style');

    strengthStyle.textContent = `
        .password-strength {
            margin-top: 8px;
        }
        .strength-bar {
            height: 4px;
            background: #e1e8ed;
            border-radius: 2px;
            overflow: hidden;
        }
        .strength-fill {
            height: 100%;
            width: 0%;
            transition: all 0.3s ease;
            border-radius: 2px;
        }
        .strength-text {
            font-size: 12px;
            margin-top: 4px;
            display: block;
        }
        .strength-weak { background: #e74c3c; }
        .strength-medium { background: #f39c12; }
        .strength-strong { background: #27ae60; }
    `;

    document.head.appendChild(strengthStyle);

    if (passwordInput.parentNode && passwordInput.parentNode.parentNode) {
        passwordInput.parentNode.parentNode.insertBefore(
            strengthIndicator,
            passwordInput.parentNode.nextSibling
        );
    }

    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        updateStrengthIndicator(strength);
    });
}

function updateStrengthIndicator(strength) {
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthFill || !strengthText) return;
    
    const strengthLevels = {
        0: { width: 0, class: '', text: 'Password strength' },
        1: { width: 20, class: 'strength-weak', text: 'Very weak' },
        2: { width: 40, class: 'strength-weak', text: 'Weak' },
        3: { width: 60, class: 'strength-medium', text: 'Medium' },
        4: { width: 80, class: 'strength-strong', text: 'Strong' },
        5: { width: 100, class: 'strength-strong', text: 'Very strong' }
    };
    
    const level = strengthLevels[strength] || strengthLevels[0];
    
    strengthFill.style.width = level.width + '%';
    strengthFill.className = 'strength-fill ' + level.class;
    strengthText.textContent = level.text;
}

// Initialize password strength indicator
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addPasswordStrengthIndicator, 100);
});

// Form auto-save (to prevent data loss)
let autoSaveData = {};

function initializeAutoSave() {
    const inputs = ['firstName', 'lastName', 'email', 'phone', 'interests', 'experience'];
    
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', () => {
                autoSaveData[inputId] = input.value;
                // In real app, save to localStorage or session storage
            });
        }
    });
}

// Initialize auto-save
document.addEventListener('DOMContentLoaded', initializeAutoSave);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to submit form when on last field
    if (e.key === 'Enter' && !e.shiftKey) {
        const activeElement = document.activeElement;
        if (activeElement.id === 'experience' || activeElement.id === 'terms') {
            e.preventDefault();
            document.getElementById('registerForm').dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape key to clear all errors
    if (e.key === 'Escape') {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => error.classList.remove('show'));
    }
});

// Form progress indicator
function createProgressIndicator() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'form-progress';
    progressContainer.innerHTML = `
        <div class="progress-steps">
            <div class="step active" data-step="1">1</div>
            <div class="step" data-step="2">2</div>
            <div class="step" data-step="3">3</div>
        </div>
        <div class="progress-labels">
            <span>Personal Info</span>
            <span>Preferences</span>
            <span>Complete</span>
        </div>
    `;
    
    // Add styles
    const progressStyle = document.createElement('style');
    progressStyle.textContent = `
        .form-progress {
            margin-bottom: 30px;
            text-align: center;
        }
        .progress-steps {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-bottom: 10px;
        }
        .step {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #e1e8ed;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            color: #666;
            transition: all 0.3s ease;
        }
        .step.active {
            background: #667eea;
            color: white;
        }
        .progress-labels {
            display: flex;
            justify-content: center;
            gap: 30px;
            font-size: 12px;
            color: #666;
        }
    `;
    document.head.appendChild(progressStyle);
    
   const registerHeader = document.querySelector('.register-header');

if (!registerHeader) {
    return;
}

registerHeader.appendChild(progressContainer);

// Update progress based on form completion
updateFormProgress();
    
}

function updateFormProgress() {
    // This would track form completion and update the progress indicator
    // Implementation would depend on your specific form structure
}

// Initialize progress indicator
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(createProgressIndicator, 200);
});