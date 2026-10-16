// Typing Animation
const texts = [
  "Full-Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Creative Coder",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById("typed");

function typeText() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    typedElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500;
  }

  setTimeout(typeText, typeSpeed);
}

setTimeout(typeText, 1000);

// Navbar scroll effect
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const scrollTop = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
    scrollTop.classList.add("visible");
  } else {
    navbar.classList.remove("scrolled");
    scrollTop.classList.remove("visible");
  }

  // Update active nav link
  let current = "";
  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Scroll to top
scrollTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinksContainer.classList.toggle("active");
});

// Close menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinksContainer.classList.remove("active");
  });
});

// Animated background particles
const bgAnimation = document.getElementById("bgAnimation");
for (let i = 0; i < 15; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.width = Math.random() * 100 + 50 + "px";
  particle.style.height = particle.style.width;
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  particle.style.animationDelay = Math.random() * 10 + "s";
  particle.style.animationDuration = Math.random() * 20 + 10 + "s";
  bgAnimation.appendChild(particle);
}

// Parallax effect on hero image
const heroImg = document.getElementById("heroImg");
document.addEventListener("mousemove", (e) => {
  if (window.innerWidth > 968 && heroImg) {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroImg.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
  }
});

// Skills animation on scroll
const observerOptions = {
  threshold: 0.5,
};

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".skill-card").forEach((card) => {
  skillsObserver.observe(card);
});

// Form submission
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for your message! I will get back to you soon. 🚀");
  e.target.reset();
});

// About Cards - Spotlight & Tilt Effect
document.querySelectorAll(".about-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Spotlight effect
    card.style.setProperty("--mouse-x", x + "%");
    card.style.setProperty("--mouse-y", y + "%");

    // Tilt effect
    const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * -10;

    card.style.transform = `translateY(-20px) scale(1.02) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });

  // Particle trail on hover
  card.addEventListener("mouseenter", (e) => {
    const particles = card.querySelector(".card-particles");
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const particle = document.createElement("div");
        particle.className = "particle-dot";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particle.style.animation = `particleFade 1s ease-out forwards`;
        particles.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);
      }, i * 50);
    }
  });
});

// Add particle animation
const style = document.createElement("style");
style.textContent = `
            @keyframes particleFade {
                0% {
                    opacity: 0;
                    transform: translate(0, 0) scale(0);
                }
                50% {
                    opacity: 1;
                    transform: translate(${Math.random() * 40 - 20}px, ${
  Math.random() * 40 - 20
}px) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(${Math.random() * 80 - 40}px, ${
  Math.random() * 80 - 40
}px) scale(0);
                }
            }
        `;
document.head.appendChild(style);

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
