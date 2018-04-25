const _ = require('lodash');

const config = require('./config');
const { getDistance } = require('./util');

class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.mass = config.defaultPlayerMass;
    this.score = 0;

    this.colorSet = config.colors[_.random(config.colors.length - 1)];
    this.fillColor = this.colorSet.fill;
    this.strokeColor = this.colorSet.stroke;

    this.pos = {
      x: _.random(config.gameWidth),
      y: _.random(config.gameHeight),
    };
  }

  move(target) {
    const distance = getDistance(this.pos.x, target.x, this.pos.y, target.y);
    const direction = Math.atan2(distance.y, distance.x);

    // greater mass slows the player
    const drag = this.mass * 3;

    let dx = (config.speedFactor * Math.cos(direction)) / drag;
    let dy = (config.speedFactor * Math.sin(direction)) / drag;

    // distance from target affects speed when the target is close
    if (distance.total < (50 + this.mass)) {
      dy *= distance.total / (50 + this.mass);
      dx *= distance.total / (50 + this.mass);
    }

    this.pos.x += dx;
    this.pos.y += dy;

    // keep the player in the game area
    this.pos.x = _.clamp(this.pos.x, 0 + (this.mass / 2), config.gameWidth);
    this.pos.y = _.clamp(this.pos.y, 0 + (this.mass / 2), config.gameHeight);
  }

  eat(value) {
    this.mass += value;
    this.score += value;
  }

  checkOthers(players) {
    let fight = false;

    players.forEach(player => {
      // dont check yourself
      if (this.id === player.id) return;

      const distance = getDistance(this.pos.x, player.pos.x, this.pos.y, player.pos.y);

      // players touching and one has a larger mass
      if (distance.total < (this.mass + player.mass) && this.mass !== player.mass) {
        if (this.mass > player.mass) fight = { winner: this.id, loser: player.id };
        else if (this.mass < player.mass) fight = { winner: player.id, loser: this.id };
      }
    });

    return fight;
  }

  checkFood(foods) {
    let ate = false;

    foods.forEach((food, i) => {
      const distance = getDistance(this.pos.x, food.pos.x, this.pos.y, food.pos.y);

      if (distance.total < this.mass) {
        this.eat(1);
        foods.splice(i, 1);
        ate = true;
      }
    });

    return ate;
  }
}

module.exports = Player;
