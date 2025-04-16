document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  if (!toggle) return;
  
  // Set initial mode from localStorage or system preference
  const saved = localStorage.getItem("darkMode");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (saved === "enabled" || (!saved && systemPrefersDark)) {
    document.body.classList.add("dark-mode");
    toggle.textContent = "☀️";
  } else {
    toggle.textContent = "🌙";
  }
  
  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    toggle.textContent = isDark ? "☀️" : "🌙";
    
    // Create custom event to notify charts to update
    const event = new CustomEvent('darkModeChange', {
      detail: {
        isDarkMode: isDark
      }
    });
    document.dispatchEvent(event);
  });
});