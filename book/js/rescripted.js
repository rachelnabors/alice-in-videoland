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
  if (isReduced) {
    cut(document.getElementById("scene_wonderland"));
  } else {
    aliceFallAnimation.onfinish = () => {
      cut(document.getElementById("scene_wonderland"));
      aliceFallAnimation.onfinish = null;
    };
    aliceFallAnimation.play();
    aliceFrightenedAnimation.onfinish = () => {
      aliceEmotionsAnimation.play();
    };
    aliceFrightenedAnimation.play();
  }
});
