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

// Jiggle the page

export const jiggle = () => {
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

// complaints:
//
// Can't listen for the end of WAAPI animations?
// alice.addEventListener("start", (event) => {
//   console.log(event.animationName + " animation finished");
// });
