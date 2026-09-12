const navbar = document.querySelector(".navbar");
const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

window.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});


const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        timelineItems.forEach((item) => {
          item.classList.remove("active");
        });

        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.5
  }
);

timelineItems.forEach((item) => {
  timelineObserver.observe(item);
});


const cards = document.querySelectorAll(
  ".mode-card, .pack-card, .mini-card"
);

cards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX =
      ((y / rect.height) - 0.5) * -5;

    const rotateY =
      ((x / rect.width) - 0.5) * 5;

    card.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});


const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  if (!hero) return;

  const scrollPosition = window.scrollY;
  const heroHeight = hero.offsetHeight;

  if (scrollPosition <= heroHeight) {
    const progress = scrollPosition / heroHeight;

    const heroContent = document.querySelector(".hero-content");

    if (heroContent) {
      heroContent.style.transform =
        `translateY(${progress * 100}px) scale(${1 - progress * 0.08})`;

      heroContent.style.opacity =
        `${1 - progress * 1.3}`;
    }
  }
});


const smoothLinks = document.querySelectorAll(
  'a[href^="#"]'
);

smoothLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});


const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        link.style.color = "";

        if (
          link.getAttribute("href") ===
          `#${entry.target.id}`
        ) {
          link.style.color = "white";
        }
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px"
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});