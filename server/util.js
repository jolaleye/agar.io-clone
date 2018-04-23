const _ = require('lodash');

const config = require('./config');
const Food = require('./Food');

exports.createFood = count => {
  const food = [];

  _.times(count, () => {
    const x = _.random(config.gameWidth);
    const y = _.random(config.gameHeight);
    food.push(new Food(x, y));
  });

  return food;
};

module.exports = exports;
