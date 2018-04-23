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

exports.getLeaders = (players, currentPlayer) => {
  const sortedPlayers = _.sortBy(Object.values(players), p => p.mass).reverse();

  // give every player their rank
  // eslint-disable-next-line
  sortedPlayers.forEach((sortedPlayer, i) => { sortedPlayer.rank = i + 1; });

  // cut down to 10 players
  if (sortedPlayers.length >= 10) sortedPlayers.splice(10);

  // if the current player isn't in the top ten add them to the end
  if (!_.includes(sortedPlayers, currentPlayer)) sortedPlayers.push(currentPlayer);

  return sortedPlayers;
};

module.exports = exports;
