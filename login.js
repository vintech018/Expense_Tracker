// Password visibility toggle
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.querySelector('#password');

togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Remember me functionality
const rememberCheckbox = document.querySelector('#remember');
const emailInput = document.querySelector('#email');

// Load saved email if exists
window.addEventListener('load', () => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }
});

// Form handling
function handleLogin(event) {
    event.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Basic validation
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return false;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return false;
    }
    
    // Handle remember me
    if (rememberCheckbox.checked) {
        localStorage.setItem('rememberedEmail', email);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
    
    // Show loading state
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    loginBtn.disabled = true;
    
    // Simulate API call (replace with actual API call)
    setTimeout(() => {
        // Success scenario (replace with actual authentication logic)
        window.location.href = 'dashboard.html';
        
        // Error scenario example:
        // showError('Invalid credentials');
        // loginBtn.innerHTML = originalText;
        // loginBtn.disabled = false;
    }, 1500);
    
    return false;
}

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and show new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = <i class="fas fa-exclamation-circle"></i> ${message};
    
    const form = document.querySelector('.login-form');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}

// Add these styles to your CSS
const style = document.createElement('style');
style.textContent = `
    .error-message {
        background: rgba(255, 0, 0, 0.1);
        color: #ff6b6b;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);