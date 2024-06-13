export const jumpToAnchor = (anchorElem, callback) => {
  // update the URL to reflect the anchor
  // strip out any hash and keep the rest of the URL
  const url = location.href.split("#")[0] + "#" + anchorElem.id;
  location.href = "#" + anchorElem; //Go to the target element.
  history.replaceState(null, null, url); //Don't like hashes. Changing it back.
  anchorElem.scrollIntoView({
    behavior: isReduced ? "instant" : "smooth",
    block: "start",
  });
  callback ? callback() : null;
};

export const isReduced =
  window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
  window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
