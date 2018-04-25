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
    // follow the player's position
    config.offset.x = player.currentPlayer.pos.x - (config.screenWidth / 2);
    config.offset.y = player.currentPlayer.pos.y - (config.screenHeight / 2);
  }

  resize = () => {
    this.canvas.width = config.screenWidth;
    this.canvas.height = config.screenHeight;
    this.reset();
  }

  reset = () => {
    const { context: c, gridImage: image } = this;
    const { offset, screenWidth, screenHeight } = config;

    c.clearRect(0, 0, config.screenWidth, config.screenHeight);

    // crop positions - adding half the screen so that the grid appears beyond game boundaries
    const sx = offset.x + (config.screenWidth / 2);
    const sy = offset.y + (config.screenHeight / 2);

    c.drawImage(image, sx, sy, screenWidth, screenHeight, 0, 0, screenWidth, screenHeight);
  }

  drawGrid = () => {
    // make a temporary canvas to draw a game-sized grid
    const c = document.createElement('canvas').getContext('2d');

    const width = config.gameWidth + config.screenWidth;
    const height = config.gameHeight + config.screenHeight;

    c.canvas.width = width;
    c.canvas.height = height;

    c.fillStyle = '#f2f9ff';
    c.fillRect(0, 0, width, height);

    c.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    c.lineWidth = 1;
    c.beginPath();

    // vertical grid lines
    for (let x = 0; x < width; x += config.gridScale) {
      c.moveTo(x, 0);
      c.lineTo(x, height);
    }

    // horizontal grid lines
    for (let y = 0; y < height; y += config.gridScale) {
      c.moveTo(0, y);
      c.lineTo(width, y);
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
