gsap.registerPlugin(ScrollTrigger);

// Wrap text in wordspan
// Find all text with .tricks class and break each word into a span
var tricksWord = document.getElementsByClassName("tricks");
for (var i = 0; i < tricksWord.length; i++) {
  var wordWrap = tricksWord.item(i);
  wordWrap.innerHTML = wordWrap.innerHTML.replace(
    /(^|<\/?[^>]+>|\s+)([^\s<]+)/g,
    '$1<span class="tricksword" >$2</span>'
  );
}
// Break each wordspan into letters
var tricksLetter = document.getElementsByClassName("tricksword");
for (var i = 0; i < tricksLetter.length; i++) {
  var letterWrap = tricksLetter.item(i);
  letterWrap.innerHTML = letterWrap.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
}

// --- GSAP MOBILE
let mm = gsap.matchMedia();
mm.add("(max-width: 767px)", () => {
  // Intro timeline mobile
  let introMobile = gsap.timeline({ defaults: {} });

  // Intro SVG logo
  introMobile.to("#mask-logo", { x: 0, ease: "power1.easeInOut", duration: 1.2, delay: 0.4 });
  introMobile.to("#mask-logo, #svg-stroke", {
    y: -80,
    ease: "power4.easeout",
    duration: 0.4,
    display: "none",
  });
  introMobile.to("#intro-logo", { display: "none" }, "<");

  // Intro white background
  introMobile.to(
    "#intro-white",
    {
      autoAlpha: 0,
      ease: "power4.easeinOut",
      duration: 1.2,
      display: "none",
      onComplete: () =>
        document.querySelector(".stop-scrolling").classList.remove("stop-scrolling"),
    },
    "<"
  );

  // Intro small text items from the hero section
  introMobile.from(
    "#nav-logo",
    { x: -40, autoAlpha: 0, duration: 0.8, ease: "power4.easeOut" },
    "<"
  );

  // Intro hero-text
  introMobile.from(
    ".hero-text .letter",
    { y: -40, autoAlpha: 0, duration: 0.4, ease: "power4.easeOut", stagger: 0.0085 },
    "<"
  );
});

// -- GSAP Desktop --
mm.add("(min-width: 768px)", () => {
  // --- TIMELINE SECTION ---
  // Intro timeline dekstop
  let introDesktop = gsap.timeline({ defaults: {} });

  // Intro SVG logo
  introDesktop.to("#mask-logo", { x: 0, ease: "power1.easeInOut", duration: 1.2, delay: 0.4 });
  introDesktop.to("#mask-logo, #svg-stroke", {
    y: -80,
    ease: "power4.easeout",
    duration: 0.4,
    display: "none",
  });
  introDesktop.to("#intro-logo", { display: "none" }, "<");

  // Intro white background
  introDesktop.to(
    "#intro-white",

    {
      autoAlpha: 0,
      ease: "power4.easeinOut",
      duration: 1.2,
      display: "none",
      onComplete: () =>
        document.querySelector(".stop-scrolling").classList.remove("stop-scrolling"),
    },
    "<"
  );

  // Intro small text items from the hero section
  introDesktop.from(
    "#nav-logo",
    { x: -40, autoAlpha: 0, duration: 0.8, ease: "power4.easeOut" },
    "<"
  );
  introDesktop.from(
    "#nav-list",
    { x: 40, autoAlpha: 0, duration: 0.8, ease: "power4.easeOut" },
    "<"
  );

  // Intro hero-text
  introDesktop.from(
    ".hero-text .letter",
    { y: -40, autoAlpha: 0, duration: 0.4, ease: "power4.easeOut", stagger: 0.0085 },
    "<"
  );

  // Card images
  gsap.to(".card-image", {
    scrollTrigger: {
      trigger: ".card-container",
      start: "center bottom", // when the bottom of the trigger hits the bottom of the viewport
      end: "bottom top", // when the bottom of the trigger hits the top of the viewport
      scrub: true,
    },
    scale: 1.08,
    ease: "power1.easeIn",
  });

  // Quote text
  gsap.from(".quote-text .letter", {
    scrollTrigger: {
      trigger: ".quote",
      start: "top center", // when the top of the trigger hits the center of the viewport
    },
    y: -40,
    autoAlpha: 0,
    duration: 0.8,
    ease: "power4.easeOut",
    stagger: 0.00285,
  });

  // Footer line
  gsap.from(".footer-underline", {
    scrollTrigger: {
      trigger: ".footer-wrap",
      scrub: true,
      start: "center bottom", // when the center of the trigger hits the bottom of the viewport
      end: "bottom bottom", // when the top of bottom trigger hits the center of the viewport
    },
    scaleX: 0,
    transformOrigin: "left center",
    duration: 0.8,
    ease: "power1.easeIn",
  });
});
