function handleSignup(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return false;
    }
  
    // Simulated sign up success
    alert(`Account created successfully for ${name}!`);
    window.location.href = "login.html"; // Redirect to login
    return false;
  }
  