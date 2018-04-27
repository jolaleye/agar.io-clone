const _ = require('lodash');

const config = require('./config');

class Mass {
  constructor(x, y, dx, dy, fill, stroke) {
    this.pos = { x, y };
    this.dx = dx;
    this.dy = dy;
    this.mass = 25;
    this.fillColor = fill;
    this.strokeColor = stroke;
  }

  move() {
    this.pos.x += this.dx;
    this.pos.y += this.dy;

    this.dx *= 0.99;
    this.dy *= 0.99;

    this.pos.x = _.clamp(this.pos.x, this.mass / 2, config.gameWidth);
    this.pos.y = _.clamp(this.pos.y, this.mass / 2, config.gameHeight);
  }
}

module.exports = Mass;
