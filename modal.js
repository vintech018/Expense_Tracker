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
  const content = memberDetails[id];
  document.getElementById("modalDetails").innerHTML = `
    <h2>${content.name}</h2>
    <h4>${content.role}</h4>
    <p>${content.message}</p>
  `;
  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("teamModal").style.display = "none";
}

// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");

  // Check for saved theme in localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    
    // Save preference in localStorage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });
});
