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
      } else {
        page.target.classList.remove("in-view");
      }
    });
  },
  { threshold: 0.75 },
);

export let pageObserverHandler = (page) => {
  pagesObserver.observe(page);
};
