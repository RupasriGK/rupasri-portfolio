const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  menuToggle.textContent = open ? "×" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Current footer year
document.querySelector("#year").textContent = new Date().getFullYear();

// Rotating role text (lightweight, no library required)
const typingElement = document.querySelector("#typing-text");
const roles = [
  "Aspiring Web Developer",
  "Python & Django Learner",
  "Technology Enthusiast"
];
let roleIndex = 0;
let charIndex = roles[0].length;
let deleting = true;

function typeRole() {
  const current = roles[roleIndex];

  if (deleting) {
    charIndex--;
    typingElement.textContent = current.slice(0, Math.max(0, charIndex));
    if (charIndex <= 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      window.setTimeout(typeRole, 350);
      return;
    }
    window.setTimeout(typeRole, 38);
  } else {
    const next = roles[roleIndex];
    charIndex++;
    typingElement.textContent = next.slice(0, charIndex);
    if (charIndex >= next.length) {
      deleting = true;
      window.setTimeout(typeRole, 1700);
      return;
    }
    window.setTimeout(typeRole, 65);
  }
}
window.setTimeout(typeRole, 1800);

// Scroll reveal and active navigation
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -25px 0px" });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
}
