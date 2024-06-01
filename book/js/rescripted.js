import { loader } from "./page-loader.js";
import {
  sceneObserverHandler,
  pageObserverHandler,
  tunnelEndObserverHandler,
} from "./scene-handlers.js";

loader();

// Observe all scenes and pages, giving them classes when they are in the viewport to activatet their animations
Array.from(document.querySelectorAll(".scene")).forEach((scene) => {
  sceneObserverHandler(scene);
});

Array.from(document.querySelectorAll(".page")).forEach((page) => {
  pageObserverHandler(page);
});

tunnelEndObserverHandler(document.querySelector(".falling_weird"));

// Going down the tunnels

// listen for click on the link #to-tunnels
document.querySelector("#to-tunnels").addEventListener("click", function (e) {
  e.currentTarget.classList.add("activated");
  e.currentTarget.classList.remove("unactivated");
  document.querySelector("#tunnels").classList.add("cue");
});

// at end of tunnel,
//  add .cue to .cut & remove it after its animation over
//  then add .cue to .scene-wonderland/scroll it into view

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
