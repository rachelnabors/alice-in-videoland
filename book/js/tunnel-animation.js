import { isReduced } from "./utilities.js";
const alice = document.getElementById("alice_falling");
const tunnels = document.getElementById("tunnels");

// Alice going from top to bottom
const aliceFallKeyframes = new KeyframeEffect(
  alice,
  [
    { transform: "translate(-50%, -200%)" },
    { transform: "translate(-50%, 100%)" },
  ],
  { easing: "linear", duration: 10000, fill: "both" },
);

const tunnelScrollTimeline = new ScrollTimeline({ tunnels });

export const aliceFallAnimation = new Animation(
  aliceFallKeyframes,
  tunnelScrollTimeline,
);

// Alice freaking out
const aliceFrightenedKeyframes = new KeyframeEffect(
  alice,
  [{ backgroundPosition: "0 0%" }, { backgroundPosition: "0 50%" }],
  { iterations: 3, duration: 1500, easing: "steps(2)" },
);

export const aliceFrightenedAnimation = new Animation(
  aliceFrightenedKeyframes,
  document.timeline,
);

// Alice's different attitudes

const tunnelViewTimeline = new ViewTimeline({
  subject: alice,
  inset: [CSS.percent("20"), CSS.percent("-100")],
});

const aliceEmotionsKeyframes = new KeyframeEffect(
  alice,
  [{ backgroundPosition: "0 25%" }, { backgroundPosition: "0 125%" }],
  { easing: "steps(4)", fill: "forwards" },
);

export const aliceEmotionsAnimation = new Animation(
  aliceEmotionsKeyframes,
  tunnelViewTimeline,
);
