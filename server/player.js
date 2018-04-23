const _ = require('lodash');

const config = require('./config');
const { getDistance } = require('./util');

class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.mass = 5;
    this.radius = this.mass * 10;
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

    // greater mass slows the player
    const drag = Math.min(this.mass * 25, 1000);
    // player moves faster when the target is farther away
    const xVel = distance.x / drag;
    const yVel = distance.y / drag;

    this.pos.x += xVel;
    this.pos.y += yVel;
  }

  eatOther(mass) {
    this.mass += mass;
    this.radius = this.mass * 10;
  }

  eatFood() {
    this.mass += 1;
    this.radius = this.mass * 10;
  }

  checkOthers(players) {
    let fight = false;

    players.forEach(player => {
      // dont check yourself
      if (this.id === player.id) return;

      const distance = getDistance(this.pos.x, player.pos.x, this.pos.y, player.pos.y).total;

      // players touching and one has a larger mass
      if (distance < (this.radius + player.radius) && this.mass !== player.mass) {
        if (this.mass > player.mass) fight = { winner: this.id, loser: player.id };
        else if (this.mass < player.mass) fight = { winner: player.id, loser: this.id };
      }
    });

    return fight;
  }

  checkFood(foods) {
    let ate = false;

    foods.forEach((food, i) => {
      const distance = getDistance(this.pos.x, food.pos.x, this.pos.y, food.pos.y).total;

      if (distance < this.radius) {
        this.eatFood();
        foods.splice(i, 1);
        ate = true;
      }
    });

    return ate;
  }
}

module.exports = Player;
