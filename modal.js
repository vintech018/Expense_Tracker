const memberDetails = {
  vaibhav: {
    name: "Vaibhav",
    role: "Founder & CEO",
    message: `"I started BankRoll with the dream of empowering people to take control of their finances and achieve their goals."`
  },
  maanit: {
    name: "Maanit",
    role: "Lead Developer",
    message: `"I love solving complex problems and making sure our users have the best experience possible with BankRoll."`
  },
  medhansh: {
    name: "Medhansh",
    role: "Product & UX Design",
    message: `"Designing BankRoll was an exciting challenge — our goal is to create an intuitive, user-friendly experience for everyone."`
  },
  dhruv: {
    name: "Dhruv Nasra",
    role: "Finance & Strategy",
    message: `"Finance isn’t just numbers — it’s about enabling smart choices. BankRoll helps you make them daily."`
  }
};

function showModal(id) {
  const modal = document.getElementById("teamModal");
  const modalContent = document.getElementById("modalDetails");

  if (!modal || !modalContent || !memberDetails[id]) return;

  const content = memberDetails[id];
  modalContent.innerHTML = `
    <h2>${content.name}</h2>
    <h4>${content.role}</h4>
    <p>${content.message}</p>
  `;
  modal.style.display = "flex";
  modal.classList.add("fade-in");
}

function closeModal() {
  const modal = document.getElementById("teamModal");
  if (modal) modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");

  // Set dark mode on load if enabled
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }

  // Toggle dark mode
  toggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
  });

  // Allow ESC key to close modal
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
