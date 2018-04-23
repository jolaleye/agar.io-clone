const _ = require('lodash');

const config = require('./config');

class Food {
  constructor(x, y) {
    this.pos = { x, y };
    this.color = config.colors[_.random(config.colors.length - 1)].fill;
  }
}

module.exports = Food;
