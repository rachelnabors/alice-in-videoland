export const loader = (devStat) => {
  const html = document.querySelector("html");
  // Create the loader div and set its inner HTML directly
  const loaderDiv = document.createElement("div");
  loaderDiv.id = "loader";
  loaderDiv.innerHTML = `
      <div class="cup">
          <svg version="1.1" id="brew" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="266px" height="25px" viewBox="0 0 266 25" enable-background="new 0 0 266 25" xml:space="preserve">
              <ellipse fill="#903741" cx="133" cy="12.5" rx="133" ry="12.5"></ellipse>
          </svg>
          <p>Please wait while we load</p>
      </div>
      <div class="saucer"></div>
  `;

  // Append the loader div to the loading card
  document.querySelector(".loading-card").appendChild(loaderDiv);

  if (devStat === "production") {
    setTimeout(function () {
      // change state to loaded
      html.classList.add("loaded");
      setTimeout(function () {
        html.classList.remove("loading");
      }, 3500);
      // Show park scene.
      document.querySelector(".scene-park").classList.add("cue");
    }, 4000); //gotta wait a lil' bit
  } else {
    console.log("Development mode");
    html.classList.add("loaded");
    html.classList.remove("loading");
    document.querySelector(".scene-park").classList.add("cue");
  }
};
