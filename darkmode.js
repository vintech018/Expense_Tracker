document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  if (!toggle) return;

  // Helper functions
  const enableDarkMode = () => {
    document.body.classList.add("dark-mode");
    toggle.setAttribute("aria-label", "Switch to light mode");
    toggle.textContent = "☀️";
    localStorage.setItem("darkMode", "enabled");
  };

  const disableDarkMode = () => {
    document.body.classList.remove("dark-mode");
    toggle.setAttribute("aria-label", "Switch to dark mode");
    toggle.textContent = "🌙";
    localStorage.setItem("darkMode", "disabled");
  };

  const applyInitialMode = () => {
    const saved = localStorage.getItem("darkMode");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (saved === "enabled" || (!saved && systemPrefersDark)) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  };

  const dispatchDarkModeChange = (isDark) => {
    const event = new CustomEvent('darkModeChange', {
      detail: { isDarkMode: isDark }
    });
    document.dispatchEvent(event);
  };

  // Initialize
  applyInitialMode();

  // Listen for toggle click
  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    if (isDark) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
    dispatchDarkModeChange(isDark);
  });

  // Listen to system theme changes (dynamic)
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    const isDark = e.matches;
    if (!localStorage.getItem("darkMode")) { // Only update if user hasn't manually chosen
      if (isDark) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
      dispatchDarkModeChange(isDark);
    }
  });
});
