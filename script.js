document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements = document.querySelectorAll(".reveal");

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


  /* =========================
     AI PACKS
  ========================= */

  const packButtons = document.querySelectorAll(".pack-item");

  const packIcon = document.querySelector(".pack-icon");
  const packTitle = document.querySelector(".pack-display h3");
  const packDescription = document.querySelector(".pack-display p");

  const packs = {
    math: {
      icon: "∑",
      title: "Math Pack",
      description:
        "개념 이해부터 문제 풀이까지. 수학 학습을 하나의 AI 환경으로 연결합니다."
    },

    coding: {
      icon: "</>",
      title: "Coding Pack",
      description:
        "코드 작성, 디버깅, 구조 설계까지 개발 작업을 빠르게 연결합니다."
    },

    aviation: {
      icon: "✈",
      title: "Aviation Pack",
      description:
        "항공기, 비행 원리, 항공 시스템과 관련된 정보를 하나의 AI로 탐색합니다."
    },

    german: {
      icon: "DE",
      title: "German Pack",
      description:
        "독일어 단어, 문법, 회화와 학습 자료를 하나의 Pack으로 관리합니다."
    },

    investing: {
      icon: "₩",
      title: "Investing Pack",
      description:
        "시장 데이터와 투자 분석 도구를 하나의 작업 공간으로 연결합니다."
    }
  };

  packButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const selectedPack = button.dataset.pack;
      const data = packs[selectedPack];

      if (!data) return;

      packButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      packIcon.textContent = data.icon;
      packTitle.textContent = data.title;
      packDescription.textContent = data.description;

    });

  });


  /* =========================
     HERO PARALLAX
  ========================= */

  const hero = document.querySelector(".hero");
  const orbit = document.querySelector(".hero-orbit");

  if (hero && orbit) {

    hero.addEventListener("mousemove", (event) => {

      const rect = hero.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width - 0.5;

      const y =
        (event.clientY - rect.top) / rect.height - 0.5;

      orbit.style.transform =
        `translate(${x * 20}px, ${y * 20}px)`;

    });

    hero.addEventListener("mouseleave", () => {
      orbit.style.transform = "translate(0, 0)";
    });
  }


  /* =========================
     BUTTON CLICK EFFECT
  ========================= */

  document.querySelectorAll(".button").forEach((button) => {

    button.addEventListener("click", () => {

      button.style.transform = "scale(0.96)";

      setTimeout(() => {
        button.style.transform = "";
      }, 120);

    });

  });


  /* =========================
     CURRENT YEAR
  ========================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================
     CONSOLE
  ========================= */

  console.log("PANTHOM");
  console.log("Endless info. One AI.");

});