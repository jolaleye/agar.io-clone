const _ = require('lodash');

const config = require('./config');

class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.mass = 5;

    this.pos = {
      x: _.random(config.gameWidth),
      y: _.random(config.gameHeight),
    };
  }

  move(target) {
    const xDistance = target.x - this.pos.x;
    const yDistance = target.y - this.pos.y;

    // greater mass slows the player
    const drag = Math.min(this.mass * 15, 500);
    // player moves faster when the target is farther away
    const xVel = xDistance / drag;
    const yVel = yDistance / drag;

    this.pos.x += xVel;
    this.pos.y += yVel;
  }
}

module.exports = Player;
