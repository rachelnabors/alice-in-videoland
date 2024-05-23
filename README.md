# Alice in Videoland

Alice in Videoland is a storybook project using SVG, CSS3 animations, and JavaScript scroll events to loosely retell [Lewis Carroll's](http://en.wikipedia.org/wiki/Lewis_Carroll) [_Alice in Wonderland_](http://www.gutenberg.org/ebooks/11) for a new generation.

## First Edition

Originally created in 2013, the [Alice in Videoland](https://2024.rachelnabors.com/alice-in-videoland/book/) featured a number of technologies which you can check out [in its own repo](https://github.com/rachelnabors/alice-in-videoland/tree/master/book):

- **Modernizr** for feature detection and dependency loading
- **jQuery** for all the below...
  - [Hammer.js](https://hammerjs.github.io/) for touch and gesture support on iOS
  - [jQuery Visible](https://github.com/customd/jquery-visible) to detect when elements are on screen
  - [Waypoints.js](http://imakewebthings.com/waypoints/) executes functions when an element has been scrolled to
  - [Debounced Resize()](https://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/) would throttle the recalculations on resize

## 2024 Edition

Here's what I'm using now, a decade later:

- Timeline animations to "scroll Alice down the tunnel"—includes location as well as sprite change
- CSS Snap points for scrolling down the tunnel—formerly Hammer.js
- Intersection Observer to detect when something is in the window (intersecting with the viewport)

## Table of Contents

- [The finished first chapter](book/)
- [Talk](talk/)
- [Original Storyboard](storyboard/)
