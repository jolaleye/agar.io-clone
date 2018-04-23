const _ = require('lodash');

const config = require('./config');

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
    const xDistance = target.x - this.pos.x;
    const yDistance = target.y - this.pos.y;

    // greater mass slows the player
    const drag = Math.min(this.mass * 25, 1000);
    // player moves faster when the target is farther away
    const xVel = xDistance / drag;
    const yVel = yDistance / drag;

    this.pos.x += xVel;
    this.pos.y += yVel;
  }

  eat() {
    this.mass += 1;
    this.radius = this.mass * 10;
  }

  checkFood(foods) {
    let ate = false;

    foods.forEach((food, i) => {
      const xDistance = this.pos.x - food.pos.x;
      const yDistance = this.pos.y - food.pos.y;
      const distance = Math.sqrt((xDistance ** 2) + (yDistance ** 2));

      if (distance < this.radius) {
        this.eat();
        foods.splice(i, 1);
        ate = true;
      }
    });

    return ate;
  }
}

module.exports = Player;
