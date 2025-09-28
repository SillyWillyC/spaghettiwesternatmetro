// ...existing code...
import { gsap } from "gsap";

// Smooth section reveal using IntersectionObserver + gsap
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      gsap.fromTo(entry.target, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".observe").forEach((el) => observer.observe(el));

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

// Smooth scroll for internal links
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute("href");
  const target = document.querySelector(id);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", id);
  }
});

document.querySelectorAll("details.faq").forEach((d) => {
  const c = d.querySelector(":scope > :not(summary)");
  if (!c) return; Object.assign(c.style, { overflow: "hidden", maxHeight: d.open ? c.scrollHeight + "px" : "0px", opacity: d.open ? "1" : "0" });
  d.addEventListener("toggle", () => {
    const h = d.open ? c.scrollHeight : 0;
    gsap.to(c, { maxHeight: h, opacity: d.open ? 1 : 0, duration: 0.35, ease: "power2.out" });
  });
});
