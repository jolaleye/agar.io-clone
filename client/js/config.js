const config = {
  playing: false,

  // game designed at this resolution
  nativeWidth: 1920,
  nativeHeight: 1080,

  // current device dimensions
  get deviceWidth() { return window.innerWidth; },
  get deviceHeight() { return window.innerHeight; },

  get scale() {
    return Math.max(
      config.deviceWidth / config.nativeWidth,
      config.deviceHeight / config.nativeHeight,
    );
  },

  // but the game area is larger
  gameWidth: 5000,
  gameHeight: 5000,

  // size of the grid cells
  gridScale: window.innerHeight / 12,

  // viewport offset
  offset: { x: 0, y: 0 },
};

export default config;
