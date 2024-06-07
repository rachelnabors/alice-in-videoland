import { loader } from "./page-loader.js";
import { isReduced } from "./utilities.js";
import {
  sceneObserverHandler,
  pageObserverHandler,
  cut,
} from "./scene-handlers.js";
import {
  aliceFrightenedAnimation,
  aliceFallAnimation,
  aliceEmotionsAnimation,
  jiggle,
} from "./tunnel-animation.js";

loader();

// Observe all scenes and pages, giving them classes when they are in the viewport to activatet their animations
Array.from(document.querySelectorAll(".scene")).forEach((scene) => {
  sceneObserverHandler(scene);
});

Array.from(document.querySelectorAll(".page")).forEach((page) => {
  pageObserverHandler(page);
});

// Going down the tunnels

// listen for click on the link #to-tunnels
document.querySelector("#to-tunnels").addEventListener("click", function (e) {
  e.currentTarget.classList.add("activated");
  e.currentTarget.classList.remove("unactivated");
  document.getElementById("tunnels").classList.add("cue");
  aliceEmotionsAnimation.onfinish = () => {
    cut(document.getElementById("scene_wonderland"), jiggle);
  };
  if (isReduced) {
    aliceEmotionsAnimation.play();
  } else {
    aliceFallAnimation.play();
    aliceFrightenedAnimation.onfinish = () => {
      console.log("frightened animation finished");
      aliceEmotionsAnimation.play();
    };
    aliceFrightenedAnimation.play();
  }
});

// stop running animations when the page is not visible to the user

// const box = document.querySelector(".box");
// const output = document.querySelector(".output");

// const timeline = new ScrollTimeline({
//   source: document.documentElement,
//   axis: "block",
// });

// box.animate(
//   {
//     rotate: ["0deg", "720deg"],
//     left: ["0%", "100%"],
//   },
//   {
//     timeline,
//   },
// );
