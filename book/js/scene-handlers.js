import { jumpToAnchor, isReduced } from "./utilities.js";
import { jiggle } from "./tunnel-animation.js";

// Each SCENE gets a class of CUE when it's fully in viewport
const cutScene = document.getElementById("scene-cut");
const sceneObserver = new IntersectionObserver(
  (scenes) => {
    scenes.forEach((scene) => {
      // check that it is intersecting and is opacity 1
      if (scene.isIntersecting && scene.target.style.opacity === "1") {
        scene.target.classList.add("cue");
        // This is set once, no need to keep observing
        sceneObserver.unobserve(scene.target);
      }
    });
  },
  { threshold: 1.0 },
);

export let sceneObserverHandler = (scene) => {
  sceneObserver.observe(scene);
};

// Each page gets a class of in-view when it's in the VIEWPORT and removed when out.
const pagesObserver = new IntersectionObserver(
  (pages) => {
    pages.forEach((page) => {
      if (page.isIntersecting) {
        page.target.classList.add("in-view");
      } else if (page.target.classList.contains("in-view")) {
        page.target.classList.remove("in-view");
        page.target.classList.add("viewed");
      }
    });
  },
  { threshold: 0.5 },
);

export let pageObserverHandler = (page) => {
  pagesObserver.observe(page);
};

export const cut = (nextScene, postCutFunc) => {
  const fadeToBlackKeyframes = new KeyframeEffect(
    cutScene,
    [{ opacity: 0 }, { opacity: 1 }],
    { duration: 2000, fill: "forwards" },
  );
  const fadeInFromBlackKeyframes = new KeyframeEffect(
    cutScene,
    [{ opacity: 1 }, { opacity: 0 }],
    { duration: 2000, fill: "forwards" },
  );
  const fadeToBlack = new Animation(fadeToBlackKeyframes, document.timeline);
  fadeToBlack.onfinish = () => {
    // then fade back in (on scrollend)
    // meanwhile, cue the next scene
    nextScene.classList.add("cue");
    // scroll the page to next scene
    jumpToAnchor(nextScene);
    const endScroll = () => {
      const fadeInFromBlack = new Animation(
        fadeInFromBlackKeyframes,
        document.timeline,
      );
      fadeInFromBlack.play();
      postCutFunc();
    };
    document.addEventListener("scroll", endScroll, { once: true });
  };
  fadeToBlack.play();
};
