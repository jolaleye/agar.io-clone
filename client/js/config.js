export default {
  playing: false,

  // the canvas only takes up the screen
  get screenWidth() { return window.innerWidth; },
  get screenHeight() { return window.innerHeight; },

  // but the game area is larger
  gameWidth: 5000,
  gameHeight: 5000,

  // size of the grid cells
  gridScale: window.innerHeight / 12,

  // viewport offset
  offset: { x: 0, y: 0 },
};
