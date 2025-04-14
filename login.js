document.addEventListener("DOMContentLoaded", () => {
  const showLoginLink = document.getElementById("showLogin");
  const showSignupLink = document.getElementById("showSignup");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // Dark Mode toggle
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "🌙";
  toggleButton.id = "darkModeToggle";
  document.body.appendChild(toggleButton);
  toggleButton.style.position = "fixed";
  toggleButton.style.top = "15px";
  toggleButton.style.right = "15px";
  toggleButton.style.zIndex = "999";

  toggleButton.addEventListener("click", () => {
    if (document.body.dataset.theme === "dark") {
      document.body.dataset.theme = "light";
      toggleButton.textContent = "🌙";
    } else {
      document.body.dataset.theme = "dark";
      toggleButton.textContent = "☀️";
    }
  });

  // Form toggles
  showSignupLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  });

  showLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  });

  // LocalStorage auth class
  class UserAuth {
    constructor() {
      this.users = JSON.parse(localStorage.getItem("users")) || [];
      this.currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    }

    register(firstName, lastName, dob, email, password) {
      if (this.users.some((user) => user.email === email)) {
        return { success: false, message: "Email already registered" };
      }

      const user = {
        id: this.users.length + 1,
        firstName,
        lastName,
        dob,
        email,
        password,
        created: new Date(),
      };

      this.users.push(user);
      localStorage.setItem("users", JSON.stringify(this.users));
      return { success: true };
    }

    login(email, password) {
      const user = this.users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        this.currentUser = {
          id: user.id,
          name: user.firstName,
          email: user.email,
        };
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
        return { success: true };
      }
      return { success: false, message: "Invalid email or password" };
    }

    logout() {
      this.currentUser = null;
      localStorage.removeItem("currentUser");
    }

    isLoggedIn() {
      return this.currentUser !== null;
    }
  }

  const auth = new UserAuth();

  // Login
  const loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email && password) {
      const result = auth.login(email, password);
      if (result.success) {
        alert("Login successful!");
        window.location.href = "tracker.html"; // Redirect to tracker page
      } else {
        alert(result.message || "Login failed.");
      }
    } else {
      alert("Please fill in both fields.");
    }
  });

  // Signup
  const signupButton = document.getElementById("signupButton");
  signupButton.addEventListener("click", () => {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (firstName && lastName && dob && email && password) {
      const result = auth.register(firstName, lastName, dob, email, password);
      if (result.success) {
        alert("Signup successful! You can now log in.");
        signupForm.style.display = "none";
        loginForm.style.display = "block";
      } else {
        alert(result.message || "Signup failed.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  });
});
