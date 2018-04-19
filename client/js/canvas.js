import _ from 'lodash';

import config from './config';

class Canvas {
  canvas = document.getElementById('canvas');
  context = this.canvas.getContext('2d');

  constructor() {
    this.canvas.width = config.gameWidth;
    this.canvas.height = config.gameHeight;
  }

  reset = () => {
    const c = this.context;
    c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
  }

  drawGrid = () => {
    const c = this.context;
    c.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    c.lineWidth = 1;

    // vertical grid lines
    _.times(config.gameWidth / config.gridScale, i => {
      c.beginPath();
      c.moveTo(i * config.gridScale, 0);
      c.lineTo(i * config.gridScale, config.gameHeight);
      c.stroke();
      c.closePath();
    });

    // horizontal grid lines
    _.times(config.gameHeight / config.gridScale, i => {
      c.beginPath();
      c.moveTo(0, i * config.gridScale);
      c.lineTo(config.gameWidth, i * config.gridScale);
      c.stroke();
      c.closePath();
    });
  }
}

export default new Canvas();
