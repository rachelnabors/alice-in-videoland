import { jumpToAnchor } from "./utilities.js";

const cutScene = document.getElementById("scene-cut");
// Each SCENE gets a class of CUE when it's XX in the VIEWPORT?;
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
  { threshold: 0.75 },
);

export let pageObserverHandler = (page) => {
  pagesObserver.observe(page);
};

// at bottom of tunnel, add .cue to .scene-cut as well as .scene-wonderland
const tunnelEndObserver = new IntersectionObserver(
  (page) => {
    const sceneWonderland = document.getElementById("scene_wonderland");

    if (page[0].isIntersecting) {
      // At end of page, fade to black (on animationend)
      cut(sceneWonderland);
      tunnelEndObserver.unobserve(page[0].target);
    }
  },
  { threshold: 1 },
);

export let tunnelEndObserverHandler = (page) => {
  tunnelEndObserver.observe(page);
};

const cut = (nextScene) => {
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
    // meanshile, cue the next scene
    nextScene.classList.add("cue");
    // scroll the page to next scene
    jumpToAnchor(nextScene);
    const endScroll = () => {
      const fadeInFromBlack = new Animation(
        fadeInFromBlackKeyframes,
        document.timeline,
      );
      fadeInFromBlack.play();
    };
    document.addEventListener("scroll", endScroll, { once: true });
  };
  fadeToBlack.play();
};
