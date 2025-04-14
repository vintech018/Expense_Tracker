document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");

  // Check if dark mode is already enabled in localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      toggle.textContent = '☀️'; // Change the button icon to sun
  } else {
      toggle.textContent = '🌙'; // Moon icon when dark mode is off
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save the dark mode state to localStorage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem('darkMode', 'enabled');
      toggle.textContent = '☀️'; // Sun icon when dark mode is enabled
    } else {
      localStorage.setItem('darkMode', 'disabled');
      toggle.textContent = '🌙'; // Moon icon when dark mode is off
    }
  });
});
