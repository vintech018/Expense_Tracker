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
  
  // Add hover effects to team members
  const teamMembers = document.querySelectorAll('.team-member');
  teamMembers.forEach(member => {
    member.addEventListener('mouseenter', (e) => {
      const img = member.querySelector('img');
      gsap.to(img, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    member.addEventListener('mouseleave', (e) => {
      const img = member.querySelector('img');
      gsap.to(img, {
        scale: 1,
        duration: 0.3,
        ease: "power2.in"
      });
    });
  });
});

// Add this at the bottom of your DOMContentLoaded event listener
window.addEventListener('click', (event) => {
  const modal = document.getElementById("teamModal");
  if (event.target === modal) {
    closeModal();
  }
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
      <p class="quote">${content.message}</p>
      <div class="modal-sparkles">
        <div class="modal-sparkle"></div>
        <div class="modal-sparkle"></div>
        <div class="modal-sparkle"></div>
      </div>
      <div class="modal-skills">
        <span class="skill-tag">Leadership</span>
        <span class="skill-tag">Innovation</span>
        <span class="skill-tag">Finance</span>
      </div>
    </div>
  `;

  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("show"), 10);
  document.body.style.overflow = "hidden";

  animateModal();
}

function animateModal() {
  // Initial animations
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

  // Enhanced orb animation
  gsap.to(".modal-orb", {
    duration: "random(3, 5)",
    x: "random(-30, 30)",
    y: "random(-30, 30)",
    rotation: "random(-180, 180)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Sparkle animations
  gsap.to(".modal-sparkle", {
    duration: "random(1.5, 2.5)",
    scale: "random(1.2, 1.8)",
    opacity: 0,
    repeat: -1,
    yoyo: true,
    stagger: {
      amount: 1,
      from: "random"
    },
    ease: "power1.inOut"
  });

  // Animate skill tags
  gsap.from(".skill-tag", {
    duration: 0.6,
    scale: 0,
    opacity: 0,
    stagger: 0.1,
    delay: 0.5,
    ease: "back.out(1.7)"
  });
}

function closeModal() {
  const modal = document.getElementById("teamModal");
  if (!modal) return;
  
  modal.style.display = "none";
  document.body.style.overflow = ""; // Re-enable scrolling
}