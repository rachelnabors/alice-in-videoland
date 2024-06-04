import { jumpToAnchor, isReduced } from "./utilities.js";

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
  { threshold: 0.5 },
);

export let pageObserverHandler = (page) => {
  pagesObserver.observe(page);
};

// at bottom of tunnel, add .cue to .scene-cut as well as .scene-wonderland
const tunnelEndObserver = new IntersectionObserver(
  (page) => {
    const sceneWonderland = document.getElementById("scene_wonderland");
    const jiggle = () => {
      if (!isReduced) {
        // jiggle the page
        document.querySelector(".page_crash-landing").animate(
          [
            { transform: "scale(.8) rotate(-10deg) translateY(50%)" },
            {
              transform: "scale(1.2) rotate(10deg) translateY(-50%)",
              offest: 0.5,
            },
            { transform: "scale(1) rotate(0) translateY(0)" },
          ],
          {
            duration: 2000,
            fill: "forwards",
            easing:
              "linear(0, 0.218 2.1%, 0.862 6.5%, 1.114, 1.296 10.7%, 1.346, 1.37 12.9%, 1.373,1.364 14.5%, 1.315 16.2%, 1.032 21.8%, 0.941 24%, 0.891 25.9%, 0.877,0.869 27.8%, 0.87, 0.882 30.7%, 0.907 32.4%, 0.981 36.4%, 1.012 38.3%, 1.036, 1.046 42.7% 44.1%, 1.042 45.7%, 0.996 53.3%, 0.988, 0.984 57.5%, 0.985 60.7%,1.001 68.1%, 1.006 72.2%, 0.998 86.7%, 1)",
          },
        );
      }
    };
    if (page[0].isIntersecting) {
      // At end of page, fade to black (on animationend)
      cut(sceneWonderland, jiggle);

      tunnelEndObserver.unobserve(page[0].target);
    }
  },
  { threshold: 1 },
);

export let tunnelEndObserverHandler = (page) => {
  tunnelEndObserver.observe(page);
};

const cut = (nextScene, postCutFunc) => {
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
      postCutFunc();
    };
    document.addEventListener("scroll", endScroll, { once: true });
  };
  fadeToBlack.play();
};
