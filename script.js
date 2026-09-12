const cursorGlow = document.querySelector(".cursor-glow");
const nav = document.querySelector(".nav");

document.addEventListener("mousemove", (event) => {
  if (cursorGlow) {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }
});

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
});


/* HERO INTERACTION */

const hero = document.querySelector(".hero");
const heroCore = document.querySelector("#heroCore");

if (hero && heroCore) {
  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroCore.style.transform =
      `translateY(-50%) translate(${x * 30}px, ${y * 30}px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
  });

  hero.addEventListener("mouseleave", () => {
    heroCore.style.transform = "translateY(-50%)";
  });
}


/* REVEAL */

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


/* AI SYSTEM */

const aiNodes = document.querySelectorAll(".ai-node");
const aiInfo = document.querySelector("#aiInfo");

const aiData = {
  local: {
    number: "01",
    title: "Local Intelligence",
    description:
      "Run intelligence directly on your own machine. Designed for control, privacy, and local workflows."
  },
  normal: {
    number: "02",
    title: "Normal Intelligence",
    description:
      "Use cloud-powered intelligence when you need scalable computation and convenient access."
  },
  enterprise: {
    number: "03",
    title: "Enterprise Intelligence",
    description:
      "Deploy controlled intelligence environments designed for organizations and private infrastructure."
  }
};

aiNodes.forEach((node) => {
  node.addEventListener("click", () => {
    const mode = node.dataset.mode;
    const data = aiData[mode];

    aiNodes.forEach((item) => item.classList.remove("active"));
    node.classList.add("active");

    aiInfo.querySelector(".ai-number").textContent = data.number;
    aiInfo.querySelector("h3").textContent = data.title;
    aiInfo.querySelector("p:last-child").textContent = data.description;
  });
});


/* PACKS */

const packs = document.querySelectorAll(".pack");
const packDetail = document.querySelector("#packDetail");
const closePack = document.querySelector("#closePack");
const packTitle = document.querySelector("#packTitle");
const packDescription = document.querySelector("#packDescription");

const packData = {
  math: {
    title: "Math",
    description:
      "A specialized intelligence layer for mathematical reasoning, structured problem solving, analysis, and learning."
  },
  coding: {
    title: "Coding",
    description:
      "A development-focused Pack for building, debugging, analyzing, and improving software."
  },
  aviation: {
    title: "Aviation",
    description:
      "A focused intelligence Pack for aviation concepts, systems, operations, and structured learning."
  },
  german: {
    title: "German",
    description:
      "A language-focused Pack designed around German vocabulary, grammar, comprehension, and practical learning."
  },
  investing: {
    title: "Investing",
    description:
      "A structured research Pack for understanding markets, financial concepts, data, and investment workflows."
  }
};

packs.forEach((pack) => {
  pack.addEventListener("click", () => {
    const data = packData[pack.dataset.pack];

    packTitle.textContent = data.title;
    packDescription.textContent = data.description;

    packDetail.classList.add("open");
  });
});

closePack.addEventListener("click", () => {
  packDetail.classList.remove("open");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    packDetail.classList.remove("open");
  }
});


/* WORKFLOW */

const workflowSteps = document.querySelectorAll(".workflow-step");
const workflowDisplay = document.querySelector("#workflowDisplay");
const workflowBar = document.querySelector("#workflowBar");

const workflowNames = [
  "SELECT",
  "EXECUTE",
  "EXPAND",
  "SHARE"
];

workflowSteps.forEach((step) => {
  step.addEventListener("click", () => {
    const index = Number(step.dataset.step);

    workflowSteps.forEach((item) => {
      item.classList.remove("active");
    });

    step.classList.add("active");

    workflowDisplay.textContent = workflowNames[index];

    const progress = `${(index / 3) * 100}%`;
    workflowBar.style.width = progress;
  });
});


/* MARKETPLACE FILTER */

const filters = document.querySelectorAll(".filter");
const marketCards = document.querySelectorAll(".market-card");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const category = filter.dataset.filter;

    filters.forEach((item) => {
      item.classList.remove("active");
    });

    filter.classList.add("active");

    marketCards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});


/* CREATOR BUILDER */

const builderSteps = document.querySelectorAll(".builder-step");
const builderStatus = document.querySelector("#builderStatus");
const builderSub = document.querySelector("#builderSub");
const builderStage = document.querySelector("#builderStage");

const builderData = [
  ["YOUR PACK", "NAME YOUR INTELLIGENCE"],
  ["KNOWLEDGE", "ADD SPECIALIZED KNOWLEDGE"],
  ["TOOLS", "CONNECT CAPABILITIES"],
  ["TEST", "RUN YOUR PACK"],
  ["PUBLISHED", "READY FOR THE ECOSYSTEM"]
];

builderSteps.forEach((step) => {
  step.addEventListener("click", () => {
    const index = Number(step.dataset.builder);
    const data = builderData[index];

    builderSteps.forEach((item) => {
      item.classList.remove("active");
    });

    step.classList.add("active");

    builderStatus.textContent = data[0];
    builderSub.textContent = data[1];

    builderStage.style.transform = "scale(.98)";

    setTimeout(() => {
      builderStage.style.transform = "scale(1)";
    }, 120);
  });
});


/* ENTERPRISE */

const enterpriseLayers = document.querySelectorAll(".enterprise-layer");
const enterpriseInfo = document.querySelector("#enterpriseInfo");

const enterpriseData = {
  private: {
    title: "Private AI",
    description:
      "Keep intelligence inside your controlled environment."
  },
  offline: {
    title: "Offline",
    description:
      "Support environments where AI workloads need to operate without external connectivity."
  },
  security: {
    title: "Security",
    description:
      "Design access, permissions, and infrastructure around organizational requirements."
  },
  deployment: {
    title: "Deployment",
    description:
      "Adapt PANTHOM to controlled infrastructure and enterprise environments."
  }
};

enterpriseLayers.forEach((layer) => {
  layer.addEventListener("click", () => {
    const data = enterpriseData[layer.dataset.enterprise];

    enterpriseLayers.forEach((item) => {
      item.classList.remove("active");
    });

    layer.classList.add("active");

    enterpriseInfo.querySelector("h3").textContent = data.title;
    enterpriseInfo.querySelector("p").textContent = data.description;
  });
});


/* ROADMAP */

const roadItems = document.querySelectorAll(".road-item");
const roadDetail = document.querySelector("#roadDetail");

const roadmapData = {
  2026: {
    title: "Pack Engine V1",
    description: "Build the foundation of the PANTHOM ecosystem."
  },
  2027: {
    title: "Runtime",
    description: "Create a secure and scalable environment for executing Packs."
  },
  2028: {
    title: "Creator",
    description: "Give creators the tools to build, test, and publish Packs."
  },
  2029: {
    title: "Marketplace",
    description: "Connect creators and users through a growing Pack ecosystem."
  },
  2030: {
    title: "API / SDK",
    description: "Open PANTHOM capabilities to external developers and services."
  },
  2031: {
    title: "Full Platform",
    description: "Integrate Core, Packs, Runtime, Marketplace, Local, Cloud, API, and SDK."
  },
  2032: {
    title: "Enterprise",
    description: "Expand PANTHOM into controlled enterprise AI infrastructure."
  }
};

roadItems.forEach((item) => {
  item.addEventListener("click", () => {
    const year = item.dataset.year;
    const data = roadmapData[year];

    roadItems.forEach((node) => {
      node.classList.remove("active");
    });

    item.classList.add("active");

    roadDetail.querySelector("span").textContent = year;
    roadDetail.querySelector("h3").textContent = data.title;
    roadDetail.querySelector("p").textContent = data.description;
  });
});


/* WORLD MAP */

const mapNodes = document.querySelectorAll(".map-node");
const mapInfo = document.querySelector("#mapInfo");

mapNodes.forEach((node) => {
  node.addEventListener("click", () => {
    const location = node.dataset.location;

    mapInfo.querySelector("strong").textContent = location;
  });
});


/* CONTACT */

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formStatus.textContent =
    "Message interface ready. Connect your email endpoint to receive submissions.";

  contactForm.reset();
});


/* SIMPLE CARD TILT */

const tiltCards = document.querySelectorAll(
  ".market-card, .pack, .enterprise-layer"
);

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.transform =
      `perspective(800px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-5px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});


/* MOBILE MENU */

const menuButton = document.querySelector("#menuButton");

menuButton.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
});


/* ACTIVE NAV */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  {
    threshold: 0.35
  }
);

sections.forEach((section) => {
  navObserver.observe(section);
});