/* =========================================================
   PANTHOM V4
   Interactive Website Script
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     1. Scroll Reveal
     --------------------------------------------------------- */

  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
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


  /* ---------------------------------------------------------
     2. Scroll Progress Bar
     --------------------------------------------------------- */

  const progressBar = document.createElement("div");

  progressBar.className = "scroll-progress";

  progressBar.innerHTML = `
    <div class="scroll-progress-bar"></div>
  `;

  document.body.appendChild(progressBar);

  const progress = progressBar.querySelector(".scroll-progress-bar");

  function updateProgress() {
    const scrollTop = window.scrollY;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const percentage =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progress.style.width = `${percentage}%`;
  }

  window.addEventListener("scroll", updateProgress);
  updateProgress();


  /* ---------------------------------------------------------
     3. Navigation
     --------------------------------------------------------- */

  const navLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* ---------------------------------------------------------
     4. Active Navigation Section
     --------------------------------------------------------- */

  const sections = document.querySelectorAll("section[id]");

  const navigationItems = document.querySelectorAll(
    ".nav-links a"
  );

  const sectionObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        navigationItems.forEach((link) => {
          link.classList.remove("active");
        });

        const activeLink = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );

        if (activeLink) {
          activeLink.classList.add("active");
        }

      });

    },
    {
      threshold: 0.45
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });


  /* ---------------------------------------------------------
     5. Hero Mouse Parallax
     --------------------------------------------------------- */

  const hero = document.querySelector(".hero");
  const heroVisual = document.querySelector(".hero-visual");

  if (hero && heroVisual) {

    hero.addEventListener("mousemove", (event) => {

      const rect = hero.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      heroVisual.style.transform = `
        translate(${x * 18}px, ${y * 18}px)
      `;

    });

    hero.addEventListener("mouseleave", () => {

      heroVisual.style.transform =
        "translate(0, 0)";

    });

  }


  /* ---------------------------------------------------------
     6. AI Pack System
     --------------------------------------------------------- */

  const packButtons = document.querySelectorAll(
    ".pack-item"
  );

  const packTitle = document.querySelector(
    ".pack-display h3"
  );

  const packDescription = document.querySelector(
    ".pack-display p"
  );

  const packIcon = document.querySelector(
    ".pack-icon"
  );

  const packData = {

    math: {
      title: "Math Pack",
      icon: "∑",
      description:
        "개념 이해부터 문제 풀이까지. 수학 학습을 하나의 AI 환경으로 연결합니다."
    },

    coding: {
      title: "Coding Pack",
      icon: "</>",
      description:
        "코드 작성, 디버깅, 구조 설계까지 개발 작업을 빠르게 연결합니다."
    },

    aviation: {
      title: "Aviation Pack",
      icon: "✈",
      description:
        "항공기, 비행 원리, 항공 시스템과 관련된 정보를 하나의 AI로 탐색합니다."
    },

    german: {
      title: "German Pack",
      icon: "DE",
      description:
        "독일어 단어, 문법, 회화와 학습 자료를 하나의 Pack으로 관리합니다."
    },

    investing: {
      title: "Investing Pack",
      icon: "₩",
      description:
        "시장 데이터와 투자 분석 도구를 하나의 작업 공간으로 연결합니다."
    }

  };


  function changePack(packName) {

    const data = packData[packName];

    if (!data) return;

    if (packTitle) {
      packTitle.textContent = data.title;
    }

    if (packDescription) {
      packDescription.textContent =
        data.description;
    }

    if (packIcon) {
      packIcon.textContent = data.icon;
    }

    packButtons.forEach((button) => {
      button.classList.remove("active");
    });

    const selected =
      document.querySelector(
        `[data-pack="${packName}"]`
      );

    if (selected) {
      selected.classList.add("active");
    }

  }


  packButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const packName =
        button.dataset.pack;

      changePack(packName);

    });

  });


  /* ---------------------------------------------------------
     7. Button Interaction
     --------------------------------------------------------- */

  const buttons = document.querySelectorAll(
    ".btn"
  );

  buttons.forEach((button) => {

    button.addEventListener("click", () => {

      button.classList.add("clicked");

      setTimeout(() => {
        button.classList.remove("clicked");
      }, 350);

    });

  });


  /* ---------------------------------------------------------
     8. Cards Tilt Effect
     --------------------------------------------------------- */

  const cards = document.querySelectorAll(
    ".mode-card, .market-card, .enterprise-card"
  );

  cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

      const rect =
        card.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width;

      const y =
        (event.clientY - rect.top) /
        rect.height;

      const rotateX =
        (0.5 - y) * 5;

      const rotateY =
        (x - 0.5) * 5;

      card.style.transform = `
        perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-4px)
      `;

    });

    card.addEventListener("mouseleave", () => {

      card.style.transform =
        "perspective(900px) rotateX(0) rotateY(0) translateY(0)";

    });

  });


  /* ---------------------------------------------------------
     9. Roadmap Animation
     --------------------------------------------------------- */

  const roadmapItems =
    document.querySelectorAll(
      ".roadmap-item"
    );

  const roadmapObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "roadmap-active"
            );

          }

        });

      },
      {
        threshold: 0.3
      }
    );

  roadmapItems.forEach((item) => {
    roadmapObserver.observe(item);
  });


  /* ---------------------------------------------------------
     10. Terminal Typing Effect
     --------------------------------------------------------- */

  const terminal =
    document.querySelector(".terminal-text");

  if (terminal) {

    const originalText =
      terminal.textContent;

    terminal.textContent = "";

    let index = 0;

    function typeTerminal() {

      if (index < originalText.length) {

        terminal.textContent +=
          originalText.charAt(index);

        index++;

        setTimeout(
          typeTerminal,
          35
        );

      }

    }

    const terminalObserver =
      new IntersectionObserver(
        (entries) => {

          if (
            entries[0].isIntersecting
          ) {

            typeTerminal();

            terminalObserver.disconnect();

          }

        },
        {
          threshold: 0.5
        }
      );

    terminalObserver.observe(terminal);

  }


  /* ---------------------------------------------------------
     11. Number Counter
     --------------------------------------------------------- */

  const counters =
    document.querySelectorAll(
      "[data-counter]"
    );

  counters.forEach((counter) => {

    const target =
      Number(counter.dataset.counter);

    if (Number.isNaN(target)) return;

    let current = 0;

    const duration = 1200;

    const startTime =
      performance.now();

    function animateCounter(time) {

      const progress =
        Math.min(
          (time - startTime) /
          duration,
          1
        );

      current =
        Math.floor(
          progress * target
        );

      counter.textContent =
        current.toLocaleString();

      if (progress < 1) {

        requestAnimationFrame(
          animateCounter
        );

      }

    }

    const counterObserver =
      new IntersectionObserver(
        (entries) => {

          if (
            entries[0].isIntersecting
          ) {

            requestAnimationFrame(
              animateCounter
            );

            counterObserver.disconnect();

          }

        },
        {
          threshold: 0.5
        }
      );

    counterObserver.observe(counter);

  });


  /* ---------------------------------------------------------
     12. Floating Background
     --------------------------------------------------------- */

  const background =
    document.querySelector(
      ".hero-bg"
    );

  if (background) {

    window.addEventListener(
      "scroll",
      () => {

        const movement =
          window.scrollY * 0.12;

        background.style.transform =
          `translateY(${movement}px)`;

      },
      {
        passive: true
      }
    );

  }


  /* ---------------------------------------------------------
     13. Page Load Animation
     --------------------------------------------------------- */

  document.body.classList.add(
    "page-loaded"
  );


  /* ---------------------------------------------------------
     14. Dynamic Current Year
     --------------------------------------------------------- */

  const yearElements =
    document.querySelectorAll(
      "[data-year]"
    );

  yearElements.forEach((element) => {

    element.textContent =
      new Date().getFullYear();

  });


  /* ---------------------------------------------------------
     15. Console
     --------------------------------------------------------- */

  console.log(
    "%cPANTHOM",
    "font-size:32px;font-weight:800;"
  );

  console.log(
    "Endless info. One AI."
  );

});