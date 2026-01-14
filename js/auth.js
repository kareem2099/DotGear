// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Login Form Handler
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Register Form Handler
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegistration();
        });

        // Password strength checker
        const passwordInput = document.getElementById('register-password');
        const confirmPasswordInput = document.getElementById('confirm-password');

        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });

        confirmPasswordInput.addEventListener('input', function() {
            checkPasswordMatch();
        });
    }

    // Add loading state to buttons
    const authButtons = document.querySelectorAll('.auth-btn');
    authButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.closest('form').checkValidity()) {
                showLoadingState(this);
            }
        });
    });
});

// Password toggle functionality
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Password strength checker
function checkPasswordStrength(password) {
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const strengthContainer = strengthBar.parentElement;

    // Remove previous classes
    strengthContainer.classList.remove('strength-weak', 'strength-medium', 'strength-strong');

    if (password.length === 0) {
        strengthText.textContent = 'قوة كلمة المرور: ضعيفة';
        return;
    }

    let score = 0;

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    // Determine strength
    if (score <= 2) {
        strengthContainer.classList.add('strength-weak');
        strengthText.textContent = 'قوة كلمة المرور: ضعيفة';
    } else if (score <= 4) {
        strengthContainer.classList.add('strength-medium');
        strengthText.textContent = 'قوة كلمة المرور: متوسطة';
    } else {
        strengthContainer.classList.add('strength-strong');
        strengthText.textContent = 'قوة كلمة المرور: قوية';
    }
}

// Check password match
function checkPasswordMatch() {
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const confirmInput = document.getElementById('confirm-password');

    if (confirmPassword && password !== confirmPassword) {
        confirmInput.style.borderColor = '#ff4757';
        confirmInput.style.boxShadow = '0 0 0 3px rgba(255,71,87,0.1)';
    } else if (confirmPassword && password === confirmPassword) {
        confirmInput.style.borderColor = '#2ed573';
        confirmInput.style.boxShadow = '0 0 0 3px rgba(46,213,115,0.1)';
    } else {
        confirmInput.style.borderColor = 'rgba(255,69,0,0.3)';
        confirmInput.style.boxShadow = 'none';
    }
}

// Show loading state
function showLoadingState(button) {
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');

    if (btnText && btnLoader) {
        btnText.style.opacity = '0';
        btnLoader.style.display = 'flex';

        // Simulate loading (remove this in production and replace with actual API call)
        setTimeout(() => {
            btnText.style.opacity = '1';
            btnLoader.style.display = 'none';
        }, 2000);
    }
}

// Handle login
function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    // Basic validation
    if (!email || !password) {
        showMessage('يرجى ملء جميع الحقول', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('يرجى إدخال بريد إلكتروني صحيح', 'error');
        return;
    }

    // Simulate login (replace with actual authentication)
    showMessage('جاري تسجيل الدخول...', 'info');

    // Mock login success
    setTimeout(() => {
        // Store user session (in production, this would be handled by your backend)
        const userData = {
            email: email,
            loginTime: new Date().toISOString(),
            rememberMe: rememberMe
        };

        if (rememberMe) {
            localStorage.setItem('userSession', JSON.stringify(userData));
        } else {
            sessionStorage.setItem('userSession', JSON.stringify(userData));
        }

        showMessage('تم تسجيل الدخول بنجاح! جاري التوجيه...', 'success');

        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }, 2000);
}

// Handle registration
function handleRegistration() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const termsAgreed = document.getElementById('terms-agree').checked;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        showMessage('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('يرجى إدخال بريد إلكتروني صحيح', 'error');
        return;
    }

    // Phone validation (Saudi format)
    const phoneRegex = /^05\d{8}$/;
    if (!phoneRegex.test(phone)) {
        showMessage('يرجى إدخال رقم هاتف صحيح (05xxxxxxxx)', 'error');
        return;
    }

    // Password match validation
    if (password !== confirmPassword) {
        showMessage('كلمات المرور غير متطابقة', 'error');
        return;
    }

    // Password strength validation
    if (password.length < 8) {
        showMessage('كلمة المرور يجب أن تكون 8 أحرف على الأقل', 'error');
        return;
    }

    // Terms agreement validation
    if (!termsAgreed) {
        showMessage('يرجى الموافقة على الشروط والأحكام', 'error');
        return;
    }

    // Simulate registration (replace with actual API call)
    showMessage('جاري إنشاء الحساب...', 'info');

    setTimeout(() => {
        // Mock successful registration
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            registrationDate: new Date().toISOString()
        };

        // Store user data (in production, this would be sent to your backend)
        localStorage.setItem('userProfile', JSON.stringify(userData));

        showMessage('تم إنشاء الحساب بنجاح! جاري تسجيل الدخول...', 'success');

        // Auto login after registration
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 2500);
}

// Show message function
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.auth-message');
    existingMessages.forEach(msg => msg.remove());

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message ${type}`;
    messageDiv.textContent = message;

    // Style based on type
    const colors = {
        success: '#2ed573',
        error: '#ff4757',
        info: '#3742fa',
        warning: '#ffa502'
    };

    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;

    document.body.appendChild(messageDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 5000);
}

// Add slideOutRight animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Check if user is already logged in
function checkAuthStatus() {
    const userSession = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    if (userSession) {
        // User is logged in, could show different UI or redirect
        console.log('User is logged in:', JSON.parse(userSession));
    }
}

// Initialize auth check
checkAuthStatus();
