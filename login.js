document.addEventListener("DOMContentLoaded", () => {
    const showLoginLink = document.getElementById("showLogin");
    const showSignupLink = document.getElementById("showSignup");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
  
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "🌙"; // Default to dark mode toggle (moon)
    toggleButton.id = "darkModeToggle";
    document.body.appendChild(toggleButton);
  
    // Dark Mode toggle
    toggleButton.addEventListener("click", () => {
      if (document.body.dataset.theme === 'dark') {
        document.body.dataset.theme = 'light';
        toggleButton.textContent = '🌙'; // Moon icon
      } else {
        document.body.dataset.theme = 'dark';
        toggleButton.textContent = '☀️'; // Sun icon
      }
    });
  
    // Switch to Signup form
    showSignupLink.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.style.display = "none";
      signupForm.style.display = "block";
    });
  
    // Switch to Login form
    showLoginLink.addEventListener("click", (e) => {
      e.preventDefault();
      signupForm.style.display = "none";
      loginForm.style.display = "block";
    });
  
    // Handle login button click
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      if (email && password) {
        alert("Logged in successfully!");
        // Add your login authentication logic here
      } else {
        alert("Please fill in both fields.");
      }
    });
  
    // Handle signup button click
    const signupButton = document.getElementById("signupButton");
    signupButton.addEventListener("click", () => {
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const dob = document.getElementById("dob").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;
  
      if (firstName && lastName && dob && email && password) {
        alert("Signed up successfully!");
        // Add your signup logic here
      } else {
        alert("Please fill in all fields.");
      }
    });
  });
  