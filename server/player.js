const _ = require('lodash');

const config = require('./config');
const Mass = require('./Mass');
const Cell = require('./Cell');
const { getDistance } = require('./util');

class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.score = 0;
    this.cells = [];
    this.center = null;
    this.totalMass = config.defaultPlayerMass;

    this.colorSet = config.colors[_.random(config.colors.length - 1)];
    this.fillColor = this.colorSet.fill;
    this.strokeColor = this.colorSet.stroke;

    this.initCell();
  }

  initCell() {
    // create an initial cell
    const initialMass = config.defaultPlayerMass;
    const initialX = _.random(config.gameWidth);
    const initialY = _.random(config.gameHeight);
    const initialDx = 0;
    const initialDy = 0;

    this.cells.push(new Cell(initialMass, initialX, initialY, initialDx, initialDy));
    this.center = { x: initialX, y: initialY };
  }

  move(target) {
    this.cells.forEach(cell => cell.move(target));

    // find player's center
    if (this.cells.length === 1) {
      this.center.x = this.cells[0].pos.x;
      this.center.y = this.cells[0].pos.y;
    } else {
      const maxX = _.maxBy(this.cells, cell => cell.pos.x);
      const minX = _.minBy(this.cells, cell => cell.pos.x);
      const maxY = _.maxBy(this.cells, cell => cell.pos.y);
      const minY = _.minBy(this.cells, cell => cell.pos.y);

      const x = (maxX - minX) / 2;
      const y = (maxY - minY) / 2;
      this.center = { x, y };
    }
  }

  eat(value) {
    this.score += value;
  }

  updateMass() {
    this.totalMass = 0;
    this.cells.forEach(cell => { this.totalMass += cell.mass; });
  }

  eject(masses) {
    const cell = this.cells[0];

    // must have a certain mass and can't be split
    if (cell.mass < config.massToEject || this.cells.length > 1) return;

    // eject the mass in the direction the player is moving
    let x = cell.pos.x + (cell.dx < 0 ? -cell.mass : cell.mass);
    let y = cell.pos.y + (cell.dy < 0 ? -cell.mass : cell.mass);

    // keep the mass in the game area
    x = _.clamp(x, 0, config.gameWidth);
    y = _.clamp(y, 0, config.gameHeight);

    const newMass = new Mass(x, y, cell.dx * 2, cell.dy * 2, this.fillColor, this.strokeColor);

    cell.mass -= newMass.mass;

    masses.push(newMass);
  }

  checkOthers(players) {
    // check every player
    players.forEach(player => {
      // dont check this player
      if (this.id === player.id) return;

      // check all of your cells against all of their cells
      this.cells.forEach((thisCell, thisCellIndex) => {
        player.cells.forEach((otherCell, otherCellIndex) => {
          const distance = getDistance(
            thisCell.pos.x, otherCell.pos.x,
            thisCell.pos.y, otherCell.pos.y,
          );

          // players touching
          if (distance.total < (otherCell.mass + thisCell.mass)) {
            if (thisCell.mass > otherCell.mass + config.massDiffToEat) {
              // this player's cell won
              thisCell.eat(otherCell.mass);
              this.eat(otherCell.mass);
              player.cells.splice(otherCellIndex, 1);
            } else if (thisCell + config.massDiffToEat < otherCell.mass) {
              // other player's cell won
              otherCell.eat(thisCell.mass);
              player.eat(thisCell.mass);
              this.cells.splice(thisCellIndex, 1);
            }
          }
        });
      });
    });
  }

  checkFood(foods) {
    let ate = false;

    this.cells.forEach(cell => foods.forEach((food, i) => {
      const distance = getDistance(cell.pos.x, food.pos.x, cell.pos.y, food.pos.y);

      if (distance.total < cell.mass) {
        this.eat(1);
        cell.eat(1);
        foods.splice(i, 1);
        ate = true;
      }
    }));

    return ate;
  }

  checkMasses(masses) {
    this.cells.forEach(cell => masses.forEach((mass, i) => {
      const distance = getDistance(cell.pos.x, mass.pos.x, cell.pos.y, mass.pos.y);

      if (distance.total < cell.mass) {
        this.eat(mass.mass);
        cell.eat(mass.mass);
        masses.splice(i, 1);
      }
    }));
  }
}

module.exports = Player;
