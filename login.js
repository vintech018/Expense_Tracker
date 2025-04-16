function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill out both fields.");
    return false;
  }

  // Simulated login success
  alert(`Welcome back, ${email.split('@')[0]}!`);
  window.location.href = "tracker.html"; // Replace with actual dashboard if needed

  return false;
}
