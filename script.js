document.addEventListener("DOMContentLoaded", () => {
  setupContactForm();
  setupNavigation();
  setupRevealAnimations();
  setupCursorGlow();
  setupHeroMotion();
  setupInteractiveCards();
  setupMobileMenu();
});

/* =========================
   CONTACT FORM
========================= */

function setupContactForm() {
  const form = document.querySelector("#contactForm");

  if (!form) return;

  const button = form.querySelector(
    'button[type="submit"]'
  );

  const status = document.querySelector(
    "#contactStatus"
  );

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }

    if (status) {
      status.textContent = "Sending message...";
      status.className = "contact-status";
    }

    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),

      // Honeypot field
      website: formData.get("website")
    };

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
          "Unable to send message."
        );
      }

      form.reset();

      if (status) {
        status.textContent =
          "Message sent successfully.";
        status.className =
          "contact-status success";
      }

      if (button) {
        button.textContent = "Message Sent";
      }

    } catch (error) {
      console.error(error);

      if (status) {
        status.textContent =
          error.message ||
          "Something went wrong. Please try again.";
        status.className =
          "contact-status error";
      }

      if (button) {
        button.textContent = "Send Message";
        button.disabled = false;
      }
    }
  });
}


/* =========================
   NAVIGATION
========================= */

function setupNavigation() {
  const links = document.querySelectorAll(
    'a[href^="#"]'
  );

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId =
        link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}


/* =========================
   SCROLL REVEAL
========================= */

function setupRevealAnimations() {
  const elements =
    document.querySelectorAll(
      ".reveal, .section-heading, .card, .pack-card, .feature-card"
    );

  if (!elements.length) return;

  const observer =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );
          }
        });
      },
      {
        threshold: 0.12
      }
    );

  elements.forEach((element) => {
    observer.observe(element);
  });
}


/* =========================
   CURSOR GLOW
========================= */

function setupCursorGlow() {
  const glow =
    document.querySelector(
      ".cursor-glow"
    );

  if (!glow) return;

  window.addEventListener(
    "pointermove",
    (event) => {
      glow.style.left =
        `${event.clientX}px`;

      glow.style.top =
        `${event.clientY}px`;
    }
  );
}


/* =========================
   HERO MOTION
========================= */

function setupHeroMotion() {
  const core =
    document.querySelector(
      ".hero-core"
    );

  if (!core) return;

  window.addEventListener(
    "pointermove",
    (event) => {
      const x =
        (event.clientX /
          window.innerWidth -
          0.5) * 2;

      const y =
        (event.clientY /
          window.innerHeight -
          0.5) * 2;

      core.style.transform =
        `translate3d(${x * 18}px, ${y * 18}px, 0) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
    }
  );
}


/* =========================
   INTERACTIVE CARDS
========================= */

function setupInteractiveCards() {
  const cards =
    document.querySelectorAll(
      ".card, .pack-card, .feature-card"
    );

  cards.forEach((card) => {
    card.addEventListener(
      "pointermove",
      (event) => {
        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;

        const rotateY =
          ((x / rect.width) - 0.5) * 8;

        const rotateX =
          ((y / rect.height) - 0.5) * -8;

        card.style.transform =
          `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      }
    );

    card.addEventListener(
      "pointerleave",
      () => {
        card.style.transform = "";
      }
    );
  });
}


/* =========================
   MOBILE MENU
========================= */

function setupMobileMenu() {
  const button =
    document.querySelector(
      "#menuButton"
    );

  const nav =
    document.querySelector(
      ".nav-links"
    );

  if (!button || !nav) return;

  button.addEventListener(
    "click",
    () => {
      nav.classList.toggle(
        "mobile-open"
      );

      button.classList.toggle(
        "active"
      );
    }
  );

  nav.querySelectorAll("a")
    .forEach((link) => {
      link.addEventListener(
        "click",
        () => {
          nav.classList.remove(
            "mobile-open"
          );

          button.classList.remove(
            "active"
          );
        }
      );
    });
});