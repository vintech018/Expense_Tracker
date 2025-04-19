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

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("teamModal");

  if (!modal) return; // Avoid errors on pages without a modal

  // Modal backdrop click
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // ESC key to close modal
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});

function showModal(id) {
  const modal = document.getElementById("teamModal");
  const modalContent = document.getElementById("modalDetails");

  if (!modal || !modalContent || !memberDetails[id]) return;

  const content = memberDetails[id];

  modalContent.innerHTML = `
    <div class="modal-header">
      <div class="modal-orb"></div>
      <h2>${content.name}</h2>
      <h4>${content.role}</h4>
    </div>
    <div class="modal-body">
      <p>${content.message}</p>
      <div class="modal-sparkles">
        <div class="modal-sparkle"></div>
        <div class="modal-sparkle"></div>
        <div class="modal-sparkle"></div>
      </div>
    </div>
  `;

  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("show"), 10);
  document.body.style.overflow = "hidden";

  animateModal();
}

function animateModal() {
  gsap.from(".modal-header", {
    duration: 0.8,
    y: -30,
    opacity: 0,
    ease: "back.out(1.7)"
  });

  gsap.from(".modal-body p", {
    duration: 0.8,
    y: 30,
    opacity: 0,
    delay: 0.3,
    ease: "power3.out"
  });

  gsap.to(".modal-orb", {
    duration: 5,
    x: "random(-20, 20)",
    y: "random(-20, 20)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".modal-sparkle", {
    duration: 2,
    scale: 1.5,
    opacity: 0,
    repeat: -1,
    yoyo: true,
    stagger: 0.3,
    ease: "power1.inOut"
  });
}

function closeModal() {
  const modal = document.getElementById("teamModal");
  if (!modal) return;

  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }, 300);
}