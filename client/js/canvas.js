import _ from 'lodash';

import config from './config';
import player from './player';

class Canvas {
  canvas = document.getElementById('canvas');
  context = this.canvas.getContext('2d');
  gridImage = null;

  constructor() {
    this.canvas.width = config.screenWidth;
    this.canvas.height = config.screenHeight;
  }

  update = () => {
    // game area bounds
    const xMax = config.gameWidth - config.screenWidth;
    const yMax = config.gameHeight - config.screenHeight;

    // viewport bounds
    const left = player.currentPlayer.pos.x - (config.screenWidth / 2);
    const top = player.currentPlayer.pos.y - (config.screenHeight / 2);

    // contain the viewport within the game bounds
    config.offset.x = _.clamp(left, 0, xMax);
    config.offset.y = _.clamp(top, 0, yMax);
  }

  resize = () => {
    this.canvas.width = config.screenWidth;
    this.canvas.height = config.screenHeight;
    this.reset();
  }

  reset = () => {
    const { context: c, gridImage: image } = this;
    const { offset, screenWidth, screenHeight } = config;

    c.setTransform(1, 0, 0, 1, 0, 0);

    c.clearRect(0, 0, config.screenWidth, config.screenHeight);

    c.drawImage(
      image,
      offset.x, offset.y, screenWidth, screenHeight,
      0, 0, screenWidth, screenHeight,
    );
  }

  drawGrid = () => {
    // make a temporary canvas to draw a game-sized grid
    const c = document.createElement('canvas').getContext('2d');
    c.canvas.width = config.gameWidth;
    c.canvas.height = config.gameHeight;

    c.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    c.lineWidth = 1;
    c.beginPath();

    // vertical grid lines
    for (let x = 0; x < config.gameWidth; x += config.gridScale) {
      c.moveTo(x, 0);
      c.lineTo(x, config.gameHeight);
    }

    // horizontal grid lines
    for (let y = 0; y < config.gameHeight; y += config.gridScale) {
      c.moveTo(0, y);
      c.lineTo(config.gameWidth, y);
    }

    c.stroke();
    c.closePath();

    // save the grid as an image to be used for the background
    return new Promise((resolve, reject) => {
      this.gridImage = new Image();

      this.gridImage.onload = resolve;
      this.gridImage.onerror = reject;

      this.gridImage.src = c.canvas.toDataURL();
    });
  }
}

export default new Canvas();
