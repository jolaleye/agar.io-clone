const express = require('express');
const _ = require('lodash');

const config = require('./config');
const Player = require('./Player');
const { createFood, getLeaders, createSpikes } = require('./util');

const app = express();

// serve the front end in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/../client/build`));
  app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/../client/build/index.html`);
  });
}

const server = app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
const io = require('socket.io')(server);

let players = {};
let food = [];
const masses = [];
let spikes = [];

io.on('connection', socket => {
  let player;

  spikes = createSpikes(config.numOfSpikes);

  socket.on('joinGame', (name, assignPlayer) => {
    player = new Player(socket.id, name);
    players = { ...players, [player.id]: player };
    assignPlayer(player);

    if (food.length < config.maxFood) food = food.concat(createFood(config.foodToAddOnJoin));

    socket.emit('spikes', spikes);
  });

  socket.on('requestPlayers', () => {
    player.checkOthers(Object.values(players));

    if (players[player.id] && _.isEmpty(player.cells)) {
      delete players[player.id];
      socket.emit('death');
    }

    socket.emit('players', players);
  });

  socket.on('requestMove', target => {
    player.move(target);
    player.checkSelf();
    player.checkSpikes(spikes);
    player.updateMass();
    socket.emit('moveTo', player.center);
  });

  socket.on('requestFood', () => {
    // if the player eats, add another food
    if (!_.isEmpty(food) && player.checkFood(food)) food = food.concat(createFood(1));
    socket.emit('food', food);
  });

  socket.on('eject', () => player.eject(masses));

  socket.on('requestMasses', () => {
    if (!_.isEmpty(masses)) {
      player.checkMasses(masses);
      // move each mass... they slow down over time
      masses.forEach(mass => mass.move());
    }
    socket.emit('masses', masses);
  });

  socket.on('split', () => player.split());

  socket.on('requestScore', () => socket.emit('score', player.score));

  socket.on('requestLeaders', () => socket.emit('leaders', getLeaders(players, player)));

  socket.on('disconnect', () => delete players[socket.id]);
});
