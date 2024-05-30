const html = document.querySelector("html");
function loader() {
  setTimeout(function () {
    // change state to loaded
    html.classList.add("loaded");
    setTimeout(function () {
      html.classList.remove("loading");
    }, 3500);

    // Show park scene.
    const scenePark = document.querySelector(".scene-park");
    scenePark.classList.add("cue");
  }, 4000); //gotta wait a lil' bit
  console.log("loading");
}
loader();

// Each SCENE gets a class of CUE when it's XX in the VIEWPORT?
const sceneArray = Array.from(document.querySelectorAll(".scene"));
const sceneObserver = new IntersectionObserver(
  (sceneArray) => {
    sceneArray.forEach((scene) => {
      if (scene.isIntersecting) {
        console.log(scene.target);
        scene.target.classList.add("cue");
        // This is set once, no need to keep observing
        sceneObserver.unobserve(scene.target);
      }
    });
  },
  { threshold: 1.0 },
);

sceneArray.forEach((scene) => {
  sceneObserver.observe(scene);
});

// Each page gets a class of in-view when it's in the VIEWPORT and removed when out.
const pagesArray = Array.from(document.querySelectorAll(".page"));
const pagesInObserver = new IntersectionObserver(
  function (pagesArray) {
    pagesArray.forEach((page) => {
      page.classList.add("in-view");
      console.log("in-view");
    });
  },
  { threshold: 1.0 },
);

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
