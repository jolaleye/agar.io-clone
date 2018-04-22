const _ = require('lodash');

class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;

    this.pos = {
      x: _.random(5000),
      y: _.random(5000),
    };
  }
}

module.exports = Player;
