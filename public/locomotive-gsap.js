gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "[data-scroll-container]" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("[data-scroll-container]").style.transform
    ? "transform"
    : "fixed",
});

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
  introDesktop.to("#mask-logo", { x: 0, ease: "power1.easein", duration: 2, delay: 0.4 });
  introDesktop.to("#mask-logo, #svg-stroke", {
    y: -80,
    ease: "power4.easeout",
    duration: 0.4,
    display: "none",
  });
  introDesktop.to("#intro-logo", { display: "none" }, "<");
  introDesktop.to(
    ".intro-loader",
    { autoAlpha: 0, ease: "power4.easeout", duration: 0.4, display: "none" },
    "<"
  );

  // Intro black background
  introDesktop.to(
    "#intro-black",
    { y: "-100vh", ease: "power4.easeinOut", duration: 0.6, display: "none" },
    "<"
  );
  introDesktop.to(
    "#intro-bg-wrap",
    { padding: "1rem", duration: 0.6, ease: "power4.easeOut" },
    "<0.6"
  );
});

// -- GSAP Desktop --
mm.add("(min-width: 768px)", () => {
  // --- TIMELINE SECTION ---
  // Intro timeline dekstop
  let introDesktop = gsap.timeline({ defaults: {} });

  // Intro SVG logo
  introDesktop.to("#mask-logo", { x: 0, ease: "power1.easein", duration: 2, delay: 0.4 });
  introDesktop.to("#mask-logo, #svg-stroke", {
    y: -80,
    ease: "power4.easeout",
    duration: 0.4,
    display: "none",
  });
  introDesktop.to("#intro-logo", { display: "none" }, "<");
  introDesktop.to(
    ".intro-loader",
    { autoAlpha: 0, ease: "power4.easeout", duration: 0.4, display: "none" },
    "<"
  );

  // Intro black background
  introDesktop.to(
    "#intro-black",
    { y: "-100vh", ease: "power4.easeinOut", duration: 0.6, display: "none" },
    "<"
  );
  introDesktop.to(
    "#intro-bg-wrap",
    { padding: "1rem", duration: 0.6, ease: "power4.easeOut" },
    "<0.6"
  );

  // Intro small text items from the hero section
  introDesktop.fromTo(
    "#nav-logo",
    { x: -40, opacity: 0 },
    {
      x: 0,
      autoAlpha: 1,
      duration: 0.6,
      ease: "power4.easeOut",
    },
    "<"
  );
  introDesktop.fromTo(
    "#nav-list",
    { x: 40, opacity: 0 },
    { x: 0, autoAlpha: 1, duration: 0.8, ease: "power4.easeOut" },
    "<"
  );
  introDesktop.fromTo(
    ".hero-outro",
    { y: 20, opacity: 0 },
    { y: 0, autoAlpha: 1, duration: 0.8, ease: "power4.easeOut" },
    "<"
  );

  // Intro hero-text
  introDesktop.fromTo(
    "#hero-headline .letter",
    { y: -40, opacity: 0 },
    { y: 0, autoAlpha: 1, duration: 0.4, ease: "power4.easeOut", stagger: 0.0085 },
    "<"
  );

  // --- SCROLLTRIGGER SECTION ---
  // Intro text
  gsap.from("#intro-text .letter", {
    scrollTrigger: {
      trigger: ".intro-text",
      scroller: "[data-scroll-container]",
      start: "bottom bottom",
    },
    y: -40,
    autoAlpha: 0,
    ease: "power4.easeOut",
    stagger: 0.00185,
  });

  // --- Pinky ---
  gsap.from(".pinky-container", {
    scrollTrigger: {
      trigger: ".pinky-grid",
      scrub: true,
      start: "top bottom",
      end: "top top",
    },
    y: 100,
    autoAlpha: 0,
    ease: "power4.easeOut",
    stagger: 0.2,
  });

  // Quote text
  gsap.from(".quote-text .letter", {
    scrollTrigger: {
      trigger: ".quote",
      scroller: "[data-scroll-container]",
      start: "top center",
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
      scroller: "[data-scroll-container]",
      start: "center bottom",
      end: "bottom bottom",
    },
    scaleX: 0,
    transformOrigin: "left center",
    duration: 0.8,
    ease: "power4.easeOut",
  });
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
