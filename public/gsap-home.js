// --- SCROLLTRIGGER SECTION ---

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

// --- Pinky ---
gsap.from(".pinky-container", {
  scrollTrigger: {
    trigger: ".pinky-grid",
    scrub: true,
    start: "top bottom", // when the bottom of the trigger hits the bottom of the viewport
    end: "top top", // when the top of the trigger hits the top of the viewport
  },
  y: 100,
  autoAlpha: 0,
  ease: "power4.easeOut",
  stagger: 0.2,
});
