const _ = require('lodash');

const config = require('./config');

class Spike {
  constructor() {
    this.radius = 100;

    this.pos = {
      x: _.random(120, config.gameWidth - 120),
      y: _.random(120, config.gameHeight - 120),
    };
  }
}

module.exports = Spike;
