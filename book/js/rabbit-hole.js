import { loaderHole } from "./hole-loader.js";
import { sceneObserverHandler, pageObserverHandler } from "./scene-handlers.js";

loaderHole();

Array.from(document.querySelectorAll(".scene")).forEach((scene) => {
  sceneObserverHandler(scene);
});

Array.from(document.querySelectorAll(".page")).forEach((page) => {
  pageObserverHandler(page);
});

var cake = document.getElementById("eat-me");
var bottle = document.getElementById("bottle");

// Keyframes for bouncing the controls
var tryMeKeys = [
  { transform: "translateY(0) scale(1, 1) rotate(0)", easing: "ease-in" },
  { transform: "translateY(0) scale(1.1, .9) rotate(0)" },
  { transform: "translateY(-10%) scale(.9, 1.1) rotate(0)", offset: 0.4 },
  { transform: "translateY(-10%) scale(1, 1) rotate(10deg)", offset: 0.5 },
  { transform: "translateY(-10%) scale(1, 1) rotate(-10deg)", offset: 0.7 },
  {
    transform: "translateY(-10%) scale(1,1) rotate(0deg)",
    offset: 0.8,
    easing: "ease-in",
  },
  { transform: "translateY(0) scale(1, 1) rotate(0)" },
];

// Functions that animates the cake and bottle
function trytheCake() {
  cake.animate(tryMeKeys, {
    id: "bounce",
    delay: 7000,
    duration: 2000,
    iterations: 2,
  });
}
trytheCake();
const trytheCakeTimer = setInterval(trytheCake, 12000);

function trytheBottle() {
  bottle.animate(tryMeKeys, { id: "bounce", duration: 2000, iterations: 2 });
}
const trytheBottleTimer = setInterval(trytheBottle, 12000);

// Growing and shrinking Alice
var aliceChange = document
  .getElementById("alice")
  .animate(
    [
      { transform: "translate(-50%, -50%) scale(.5)" },
      { transform: "translate(-50%, -50%) scale(2)" },
    ],
    {
      duration: 8000,
      easing: "ease-in-out",
      fill: "both",
    },
  );

aliceChange.pause();
let aliceTiming = aliceChange.effect.getTiming();
aliceChange.currentTime = aliceTiming.duration / 2;

var stopPlayingAlice = function () {
  aliceChange.pause();
  nommingCake.pause();
  drinking.pause();
};

var ponytail = document.getElementById("ponytail");
var ponytailTiming = {
  duration: 250,
  direction: "alternate",
  iterations: 2,
};

var nommingCake = document
  .getElementById("eat-me_sprite")
  .animate(
    [{ transform: "translateY(0)" }, { transform: "translateY(-80%)" }],
    {
      fill: "forwards",
      easing: "steps(4, end)",
      duration: aliceTiming.duration / 2,
    },
  );

nommingCake.pause();

var growAlice = function () {
  aliceChange.playbackRate = 1;
  aliceChange.play();
  // stop jiggling the cake.
  clearInterval(trytheCakeTimer);
  if (cake.getAnimations()[0]) {
    cake.getAnimations()[0].cancel();
  }

  nommingCake.play();

  ponytail.animate(
    [
      { transform: "scale(1, 1) rotate(0)" },
      {
        transform: "scale(.85, 1.15) rotate(2deg)",
        easing: "cubic-bezier(.35,.97,.13,1.14)",
      },
    ],
    ponytailTiming,
  );
};

var drinking = document
  .getElementById("liquid")
  .animate([{ height: "100%" }, { height: "0" }], {
    fill: "forwards",
    duration: aliceTiming.duration / 2,
  });
drinking.pause();

var shrinkAlice = function () {
  aliceChange.playbackRate = -1;
  aliceChange.play();
  // stop jiggling the bottle.
  clearInterval(trytheBottleTimer);
  if (bottle.getAnimations()[0]) {
    bottle.getAnimations()[0].cancel();
  }

  drinking.play();

  ponytail.animate(
    [
      { transform: "scale(1,1) rotate(0)" },
      {
        transform: "scale(1.15, .85) rotate(2deg)",
        easing: "cubic-bezier(.35,.97,.13,1.14)",
      },
    ],
    ponytailTiming,
  );
};

// On tap or click, Alice will change size.
cake.addEventListener("mousedown", growAlice, false);
cake.addEventListener("touchstart", growAlice, false);
cake.addEventListener("mouseup", stopPlayingAlice, false);
cake.addEventListener("mouseout", stopPlayingAlice, false);
cake.addEventListener("touchend", stopPlayingAlice, false);

bottle.addEventListener("mousedown", shrinkAlice, false);
bottle.addEventListener("touchstart", shrinkAlice, false);
bottle.addEventListener("mouseup", stopPlayingAlice, false);
bottle.addEventListener("mouseout", stopPlayingAlice, false);
bottle.addEventListener("touchend", stopPlayingAlice, false);

// When either drink me or eat me animations finish, the game is "over."
// You get a different ending depending on how big or small Alice is
// (that is to say how far along her animation timeline is!)
var endGame = function () {
  // get Alice's timeline's playhead location
  var alicePlayhead = aliceChange.currentTime;
  var aliceTimeline = aliceChange.effect.getComputedTiming().activeDuration;

  stopPlayingAlice();

  // depending on which third it falls into
  var aliceHeight = alicePlayhead / aliceTimeline;

  if (aliceHeight <= 0.333) {
    // Alice got smaller!
    showEndings.play();
    showSmall.play();
    exclaming.play();
    armWave.play();
    aliceShrank.play();
    bringUI.effect.updateTiming({ delay: 2000 });
    bringUI.play();
  } else if (aliceHeight >= 0.666) {
    // Alice got bigger!
    showEndings.play();
    showCrying.play();
    pool.play();
    tears.forEach(function (el) {
      el.playState = "playing";
    });
    bringUI.effect.updateTiming({ delay: 2000 });
    bringUI.play();
  } else {
    // Alice didn't change significantly
    bringUI.effect.updateTiming({ delay: 0 });
    bringUI.play();
  }
};

// When the cake or runs out...
nommingCake.onfinish = endGame;
drinking.onfinish = endGame;

// ...or Alice reaches the end of her animation
aliceChange.onfinish = endGame;

// Reset the 3 animations: alice, the bottle, and the cupcake
var restartGame = function () {
  aliceChange.currentTime = aliceTiming.duration / 2;
  nommingCake.currentTime = 0;
  drinking.currentTime = 0;
};

// create a loop over all .playagain buttons attaching restartGame() to click events
const playAgainButtons = document.getElementsByClassName(".play-again");
for (var i = 0; i < playAgainButtons.length; i++) {
  playAgainButtons[i].addEventListener("click", restartGame, false);
}

/* Crying Ending */
var tearsFalling = [
  { transform: "translate3D(0, 0, 0)" },
  { transform: "translate3D(0, 2850%, 0)" },
];

var getRandomMsRange = function (min, max) {
  return Math.random() * (max - min) + min;
};

var tears = document.querySelectorAll(".tear");
tears = Array.prototype.slice.call(tears);

var pool = document
  .getElementById("pool")
  .animate([{ transform: "scale(.8)" }, { transform: "scale(1)" }], {
    duration: 10000,
    fill: "forwards",
  });
pool.pause();

tears.forEach(function (el) {
  el.animate(tearsFalling, {
    delay: getRandomMsRange(-1000, 1000), // randomized for each tear
    duration: getRandomMsRange(2000, 6000), // randomized for each tear
    iterations: Infinity,
    easing: "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
  });
  el.playState = "paused";
});

/* Small Ending */
var omgDuration = 600;

var exclaming = document
  .getElementById("exclaim")
  .animate([{ opacity: 0 }, { opacity: 1 }, { opacity: 1 }], {
    easing: "steps(2, end)",
    iterations: Infinity,
    direction: "alternate",
    duration: omgDuration,
  });
exclaming.pause();

var armWave = document
  .getElementById("alice_arm")
  .animate([{ transform: "rotate(10deg)" }, { transform: "rotate(-40deg)" }], {
    easing: "steps(2, end)",
    iterations: Infinity,
    direction: "alternate",
    duration: omgDuration,
  });
armWave.pause();

var aliceShrank = document
  .getElementById("alice_too-small")
  .animate(
    [
      { transform: "translateX(-50%) scale(1.1)" },
      { transform: "translateX(-50%) scale(1)" },
    ],
    {
      easing: easeOut,
      duration: 600,
      fill: "forwards",
    },
  );
aliceShrank.pause();

/* Ending UI */
/* Pull #learn-more into space when  */
var learnMoreButton = document.getElementById("learn-more_button");

var seeLearnMore = document.getElementById("ending-ui_panels").animate(
  [
    { opacity: 1, transform: "translateX(0)" },
    { opacity: 0, transform: "translateX(0)", offset: 0.33 },
    { opacity: 0, transform: "translateX(-66.67%)", offset: 0.66 },
    { opacity: 1, transform: "translateX(-66.67%)" },
  ],
  {
    duration: 400,
    easing: "cubic-bezier(0.23, 1, 0.32, 1)",
    fill: "forwards",
  },
);
seeLearnMore.pause();

var learnMore = function (e) {
  e.preventDefault();
  seeLearnMore.play();
};

learnMoreButton.addEventListener("click", learnMore);
learnMoreButton.addEventListener("touchStart", learnMore);

// hide content
var hide = function (element) {
  element.style.pointerEvents = "none";
};

// set animation back at the start then pause
var resetAnimation = function (animation) {
  animation.currentTime = 0;
  animation.pause();
};

/* Buttons reset the page's interactions. */
var easeIn = "cubic-bezier(0.755, 0.05, 0.855, 0.06)";
var easeOut = "cubic-bezier(0.23, 1, 0.32, 1)";
var durationFade = 300;
var keysFade = [{ opacity: 0 }, { opacity: 1 }];
var timingFade = {
  duration: durationFade,
  fill: "forwards",
  easing: easeIn,
};

var timingFadeDelayed = {
  duration: durationFade,
  fill: "forwards",
  easing: easeIn,
  delay: durationFade,
};

var showEndings = document
  .getElementById("endings")
  .animate(keysFade, timingFade);
showEndings.pause();

var showCrying = document
  .getElementById("end-in-tears")
  .animate(keysFade, timingFadeDelayed);
showCrying.pause();

var showSmall = document
  .getElementById("end-too-small")
  .animate(keysFade, timingFadeDelayed);
showSmall.pause();

var endingUI = document.getElementById("ending-ui");
var bringUI = endingUI.animate(keysFade, timingFade);
bringUI.pause();
hide(endingUI);

bringUI.onfinish = function () {
  endingUI.style.pointerEvents = "auto";
};

var resetAllTheThings = function () {
  resetAnimation(seeLearnMore);
  resetAnimation(drinking);
  resetAnimation(nommingCake);
  resetAnimation(showCrying);
  resetAnimation(showSmall);
  resetAnimation(showEndings);
  resetAnimation(exclaming);
  resetAnimation(armWave);
  resetAnimation(aliceShrank);
  resetAnimation(pool);
  tears.forEach(function (el) {
    el.playState = "paused";
    el.currentTime = 0;
  });
  resetAnimation(bringUI);
  hide(endingUI);
  aliceChange.currentTime = aliceTiming.duration / 2;
  aliceChange.pause();
};

Array.prototype.forEach.call(
  document.getElementsByClassName("play-again"),
  function (button) {
    button.addEventListener("click", resetAllTheThings);
    button.addEventListener("touchStart", resetAllTheThings);
  },
);
