export const loader = () => {
  const html = document.querySelector("html");
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
};
