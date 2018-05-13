import config from './config';
import player from './player';

class Canvas {
  canvas = document.getElementById('canvas');
  context = this.canvas.getContext('2d');
  gridImage = null;

  constructor() {
    this.canvas.width = config.deviceWidth;
    this.canvas.height = config.deviceHeight;
  }

  update = () => {
    // follow the player's position
    config.offset.x = player.currentPlayer.center.x - (this.canvas.width / 2);
    config.offset.y = player.currentPlayer.center.y - (this.canvas.height / 2);
  }

  resize = () => {
    this.canvas.width = Math.round(config.deviceWidth / config.scale);
    this.canvas.height = Math.round(config.deviceHeight / config.scale);
    this.reset();
  }

  reset = () => {
    const { context: c, gridImage: image, canvas } = this;
    const { offset } = config;

    c.clearRect(0, 0, canvas.width, canvas.height);

    c.drawImage(
      image,
      offset.x + 1000, offset.y + 1000, canvas.width, canvas.height,
      0, 0, canvas.width, canvas.height,
    );
  }

  drawGrid = () => {
    // make a temporary canvas to draw a game-sized grid
    const c = document.createElement('canvas').getContext('2d');

    // add some extra space for outside the game boundaries
    const width = config.gameWidth + 2000;
    const height = config.gameHeight + 2000;

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
