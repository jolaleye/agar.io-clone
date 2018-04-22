import player from './player';

const config = {
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

  // viewport boundaries
  viewport: {
    get left() { return player.currentPlayer.pos.x - (config.screenWidth / 2); },
    get top() { return player.currentPlayer.pos.y - (config.screenHeight / 2); },
    get right() { return player.currentPlayer.pos.x + (config.screenWidth / 2); },
    get bottom() { return player.currentPlayer.pos.y + (config.screenHeight / 2); },
  },
};

export default config;
