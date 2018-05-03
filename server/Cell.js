const _ = require('lodash');

const config = require('./config');
const { getDistance } = require('./util');

class Cell {
  constructor(mass, x, y, dx, dy) {
    this.mass = mass;
    this.pos = { x, y };
    this.dx = dx;
    this.dy = dy;
  }

  move(target) {
    const distance = getDistance(this.pos.x, target.x, this.pos.y, target.y);
    const direction = Math.atan2(distance.y, distance.x);

    // greater mass slows the cell
    const drag = this.mass * 3;

    this.dx = (config.speedFactor * Math.cos(direction)) / drag;
    this.dy = (config.speedFactor * Math.sin(direction)) / drag;

    // distance from target affects speed when the target is close
    if (distance.total < (50 + this.mass)) {
      this.dy *= distance.total / (50 + this.mass);
      this.dx *= distance.total / (50 + this.mass);
    }

    this.pos.x += this.dx;
    this.pos.y += this.dy;

    // keep the cell in the game area
    this.pos.x = _.clamp(this.pos.x, this.mass / 2, config.gameWidth);
    this.pos.y = _.clamp(this.pos.y, this.mass / 2, config.gameHeight);
  }

  eat(value) {
    this.mass += value;
  }
}

module.exports = Cell;
