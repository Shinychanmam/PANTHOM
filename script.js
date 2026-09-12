document.addEventListener("DOMContentLoaded", () => {

  setupReveal();
  setupCursor();
  setupHeroCore();
  setupMobileNav();
  setupModes();
  setupPacks();
  setupWorkflow();
  setupMarketplace();
  setupEnterprise();
  setupRoadmap();
  setupContact();

});


/* =========================
   REVEAL
========================= */

function setupReveal() {

  const elements =
    document.querySelectorAll(".reveal");

  if (!elements.length) return;

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

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

  elements.forEach(
    element => observer.observe(element)
  );

}


/* =========================
   CURSOR
========================= */

function setupCursor() {

  const glow =
    document.querySelector(
      ".cursor-glow"
    );

  if (!glow) return;

  window.addEventListener(
    "pointermove",
    event => {

      glow.style.left =
        `${event.clientX}px`;

      glow.style.top =
        `${event.clientY}px`;

    }
  );

}


/* =========================
   HERO CORE
========================= */

function setupHeroCore() {

  const hero =
    document.querySelector(".hero");

  const core =
    document.querySelector(".core");

  if (!hero || !core) return;

  hero.addEventListener(
    "pointermove",
    event => {

      const rect =
        hero.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width - .5;

      const y =
        (event.clientY - rect.top) /
        rect.height - .5;

      core.style.transform =
        `rotateX(${y * -10}deg) rotateY(${x * 12}deg)`;

    }
  );

  hero.addEventListener(
    "pointerleave",
    () => {

      core.style.transform =
        "";

    }
  );

}


/* =========================
   MOBILE NAV
========================= */

function setupMobileNav() {

  const button =
    document.querySelector(
      "#menuButton"
    );

  const nav =
    document.querySelector(
      "#mobileNav"
    );

  if (!button || !nav) return;

  button.addEventListener(
    "click",
    () => {

      nav.classList.toggle(
        "open"
      );

    }
  );

  nav.querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          nav.classList.remove(
            "open"
          );

        }
      );

    });

}


/* =========================
   AI MODES
========================= */

function setupModes() {

  const cards =
    document.querySelectorAll(
      ".mode-card"
    );

  const title =
    document.querySelector(
      "#modeTitle"
    );

  const privacy =
    document.querySelector(
      "#privacyBar"
    );

  const connectivity =
    document.querySelector(
      "#connectivityBar"
    );

  const control =
    document.querySelector(
      "#controlBar"
    );

  const values = {

    local: {
      title: "LOCAL",
      privacy: "100%",
      connectivity: "25%",
      control: "100%"
    },

    normal: {
      title: "NORMAL",
      privacy: "70%",
      connectivity: "100%",
      control: "70%"
    },

    enterprise: {
      title: "ENTERPRISE",
      privacy: "100%",
      connectivity: "90%",
      control: "100%"
    }

  };


  cards.forEach(card => {

    card.addEventListener(
      "click",
      () => {

        cards.forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );

        card.classList.add(
          "active"
        );

        const mode =
          card.dataset.mode;

        const data =
          values[mode];

        if (!data) return;

        title.textContent =
          data.title;

        privacy.style.width =
          data.privacy;

        connectivity.style.width =
          data.connectivity;

        control.style.width =
          data.control;

      }
    );

  });

}


/* =========================
   PACKS
========================= */

function setupPacks() {

  const nodes =
    document.querySelectorAll(
      ".pack-node"
    );

  const status =
    document.querySelector(
      "#packStatus"
    );

  const capability =
    document.querySelector(
      "#packCapability"
    );

  const tools =
    document.querySelector(
      "#packTools"
    );

  const launch =
    document.querySelector(
      "#launchPack"
    );

  const modal =
    document.querySelector(
      "#packModal"
    );

  const close =
    document.querySelector(
      "#modalClose"
    );

  const modalTitle =
    document.querySelector(
      "#modalTitle"
    );

  const modalDescription =
    document.querySelector(
      "#modalDescription"
    );

  const modalEngine =
    document.querySelector(
      "#modalEngine"
    );


  const packs = {

    math: {
      label: "MATH",
      capability: "Structured reasoning",
      tools: "Solver / Graph / Logic",
      description:
        "A reasoning environment for mathematical problems.",
      engine: "REASONING"
    },

    coding: {
      label: "CODING",
      capability: "Software development",
      tools: "Code / Debug / Architecture",
      description:
        "A development environment for building software.",
      engine: "DEVELOPMENT"
    },

    aviation: {
      label: "AVIATION",
      capability: "Flight intelligence",
      tools: "Weather / Flight / Systems",
      description:
        "A specialized intelligence environment for aviation.",
      engine: "AVIATION"
    },

    german: {
      label: "GERMAN",
      capability: "Language intelligence",
      tools: "Grammar / Vocabulary / Practice",
      description:
        "A language environment for German learning.",
      engine: "LANGUAGE"
    },

    investing: {
      label: "INVESTING",
      capability: "Market intelligence",
      tools: "Research / Analysis / Data",
      description:
        "A structured environment for financial research.",
      engine: "MARKET"
    }

  };


  nodes.forEach(node => {

    node.addEventListener(
      "click",
      () => {

        const key =
          node.dataset.pack;

        const pack =
          packs[key];

        if (!pack) return;

        status.textContent =
          `PACK / ${pack.label}`;

        capability.textContent =
          pack.capability;

        tools.textContent =
          pack.tools;

        modalTitle.textContent =
          pack.label;

        modalDescription.textContent =
          pack.description;

        modalEngine.textContent =
          pack.engine;

        modal.classList.add(
          "open"
        );

      }
    );

  });


  if (launch) {

    launch.addEventListener(
      "click",
      () => {

        modal.classList.add(
          "open"
        );

      }
    );

  }


  if (close) {

    close.addEventListener(
      "click",
      () => {

        modal.classList.remove(
          "open"
        );

      }
    );

  }


  if (modal) {

    modal
      .querySelector(
        ".modal-backdrop"
      )
      .addEventListener(
        "click",
        () => {

          modal.classList.remove(
            "open"
          );

        }
      );

  }

}


/* =========================
   WORKFLOW
========================= */

function setupWorkflow() {

  const steps =
    document.querySelectorAll(
      ".workflow-step"
    );

  const number =
    document.querySelector(
      "#workflowNumber"
    );

  const title =
    document.querySelector(
      "#workflowTitle"
    );

  const text =
    document.querySelector(
      "#workflowText"
    );

  const terminal =
    document.querySelector(
      "#workflowTerminal"
    );


  const data = [

    {
      number: "STEP 01",
      title: "SELECT",
      text:
        "Choose the intelligence Pack that matches the problem.",
      terminal:
        'SELECT_PACK("MATH")'
    },

    {
      number: "STEP 02",
      title: "EXECUTE",
      text:
        "Run the task through the selected intelligence environment.",
      terminal:
        'EXECUTE("REASONING_ENGINE")'
    },

    {
      number: "STEP 03",
      title: "EXPAND",
      text:
        "Combine capabilities and extend the intelligence.",
      terminal:
        'CONNECT("CODING", "MATH")'
    },

    {
      number: "STEP 04",
      title: "SHARE",
      text:
        "Turn the result into reusable intelligence.",
      terminal:
        'PUBLISH("NEW_PACK")'
    }

  ];


  steps.forEach(step => {

    step.addEventListener(
      "click",
      () => {

        steps.forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );

        step.classList.add(
          "active"
        );

        const index =
          Number(
            step.dataset.step
          );

        const item =
          data[index];

        number.textContent =
          item.number;

        title.textContent =
          item.title;

        text.textContent =
          item.text;

        terminal.textContent =
          item.terminal;

      }
    );

  });

}


/* =========================
   MARKETPLACE
========================= */

function setupMarketplace() {

  const filters =
    document.querySelectorAll(
      ".market-filter"
    );

  const cards =
    document.querySelectorAll(
      ".market-card"
    );


  filters.forEach(filter => {

    filter.addEventListener(
      "click",
      () => {

        filters.forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );

        filter.classList.add(
          "active"
        );

        const category =
          filter.dataset.filter;

        cards.forEach(card => {

          if (
            category === "all" ||
            card.dataset.category === category
          ) {

            card.style.display =
              "";

          } else {

            card.style.display =
              "none";

          }

        });

      }
    );

  });

}


/* =========================
   ENTERPRISE
========================= */

function setupEnterprise() {

  const layers =
    document.querySelectorAll(
      ".enterprise-layer"
    );

  const title =
    document.querySelector(
      "#enterpriseTitle"
    );

  const text =
    document.querySelector(
      "#enterpriseText"
    );


  const data = {

    privacy: {
      title: "PRIVATE AI",
      text:
        "Dedicated intelligence designed for controlled enterprise environments."
    },

    offline: {
      title: "OFFLINE SERVER",
      text:
        "Run intelligence in isolated infrastructure without requiring external connectivity."
    },

    security: {
      title: "SECURITY",
      text:
        "Access, permissions and infrastructure designed around enterprise control."
    },

    deployment: {
      title: "DEPLOYMENT",
      text:
        "Deploy PANTHOM across private infrastructure and organization-specific environments."
    }

  };


  layers.forEach(layer => {

    layer.addEventListener(
      "click",
      () => {

        layers.forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );

        layer.classList.add(
          "active"
        );

        const key =
          layer.dataset.layer;

        title.textContent =
          data[key].title;

        text.textContent =
          data[key].text;

      }
    );

  });

}


/* =========================
   ROADMAP
========================= */

function setupRoadmap() {

  const years =
    document.querySelectorAll(
      ".timeline-year"
    );

  const year =
    document.querySelector(
      "#roadmapYear"
    );

  const title =
    document.querySelector(
      "#roadmapTitle"
    );

  const text =
    document.querySelector(
      "#roadmapText"
    );


  const data = {

    "2026": {
      title: "PACK ENGINE V1",
      text:
        "The foundation of the PANTHOM intelligence architecture."
    },

    "2027": {
      title: "RUNTIME CORE",
      text:
        "Runtime execution, Multi-Pack workflows and secure tool orchestration."
    },

    "2028": {
      title: "PACK CREATOR",
      text:
        "Create, test, package and publish intelligence Packs."
    },

    "2029": {
      title: "MARKETPLACE",
      text:
        "A discovery and distribution layer for the PANTHOM ecosystem."
    },

    "2030": {
      title: "API / SDK",
      text:
        "Open PANTHOM capabilities to developers and external applications."
    },

    "2032": {
      title: "ENTERPRISE",
      text:
        "Organization-scale intelligence, administration and private infrastructure."
    }

  };


  years.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        years.forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );

        button.classList.add(
          "active"
        );

        const key =
          button.dataset.year;

        year.textContent =
          key;

        title.textContent =
          data[key].title;

        text.textContent =
          data[key].text;

      }
    );

  });

}


/* =========================
   CONTACT
========================= */

function setupContact() {

  const form =
    document.querySelector(
      "#contactForm"
    );

  const button =
    form?.querySelector(
      'button[type="submit"]'
    );

  const status =
    document.querySelector(
      "#contactStatus"
    );


  if (!form) return;


  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      if (button) {

        button.disabled = true;

        button.innerHTML =
          "Sending...";

      }


      if (status) {

        status.textContent =
          "Sending message...";

        status.className =
          "contact-status";

      }


      const formData =
        new FormData(form);


      const payload = {

        name:
          formData.get("name"),

        email:
          formData.get("email"),

        subject:
          formData.get("subject"),

        message:
          formData.get("message"),

        website:
          formData.get("website")

      };


      try {

        const response =
          await fetch(
            "/api/contact",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify(
                  payload
                )
            }
          );


        const result =
          await response.json();


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

          button.innerHTML =
            "Message Sent ✓";

        }


      } catch (error) {

        console.error(error);


        if (status) {

          status.textContent =
            error.message ||
            "Something went wrong.";

          status.className =
            "contact-status error";

        }


        if (button) {

          button.disabled = false;

          button.innerHTML =
            "Send Message <span>↗</span>";

        }

      }

    }
  );

}


/* =========================
   ESCAPE MODAL
========================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape")
      return;

    const modal =
      document.querySelector(
        "#packModal"
      );

    if (modal) {

      modal.classList.remove(
        "open"
      );

    }

  }
);
