// ==========================
// CUSTOM CURSOR
// ==========================
const cursor = document.getElementById("cursor");
if (cursor) {
  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top  = e.clientY + "px";
  });
  document.querySelectorAll("a, button, label, .skill-card, .project-card, .goal-big, .cert-item").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });
}

// ==========================
// MOBILE MENU
// ==========================
const menuBtn   = document.getElementById("menuBtn");
const navLinks  = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => navLinks.classList.toggle("active"));
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("active"));
});

// ==========================
// SCROLL ANIMATIONS
// ==========================
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); });
}, { threshold: 0.12 });

document.querySelectorAll("section").forEach(s => {
  s.classList.add("hidden");
  observer.observe(s);
});

// ==========================
// ACTIVE NAV LINK
// ==========================
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(s => {
    if (scrollY >= s.offsetTop - 220) current = s.getAttribute("id");
  });
  navItems.forEach(a => {
    a.classList.remove("current");
    if (a.getAttribute("href") === "#" + current) a.classList.add("current");
  });

  topBtn.style.display = window.scrollY > 500 ? "block" : "none";
});

// ==========================
// TYPING EFFECT
// ==========================
const titles = [
  "Information Systems Student",
  "Future Network Engineer",
  "Future Systems Administrator",
  "Cybersecurity Enthusiast",
  "Cloud Computing Learner"
];
const heroTitle = document.getElementById("typingText");
let tIdx = 0, cIdx = 0, deleting = false;

function typeEffect() {
  const cur = titles[tIdx];
  heroTitle.textContent = cur.substring(0, cIdx);

  if (!deleting) {
    cIdx++;
    if (cIdx > cur.length) { deleting = true; setTimeout(typeEffect, 1400); return; }
  } else {
    cIdx--;
    if (cIdx < 0) {
      deleting = false;
      tIdx = (tIdx + 1) % titles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 45 : 95);
}
typeEffect();

// ==========================
// SCROLL TO TOP
// ==========================
const topBtn = document.getElementById("topBtn");
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ==========================
// PROFILE PHOTO UPLOAD
// ==========================
const uploadInput = document.getElementById("upload");
const profileLabel = document.getElementById("profile");

uploadInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function () {
    profileLabel.style.backgroundImage = `url(${reader.result})`;
    profileLabel.style.backgroundSize = "cover";
    profileLabel.style.backgroundPosition = "center";
    profileLabel.textContent = "";
  };
  reader.readAsDataURL(file);
});
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.getElementById("status");

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    };

    status.textContent = "Sending...";

    try {
      const response = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        status.textContent = "Message sent successfully!";
        contactForm.reset();
      } else {
        status.textContent = result.error || "Failed to send.";
      }
    } catch (error) {
      status.textContent = "Something went wrong.";
    }
  });
}
