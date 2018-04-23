const express = require('express');
const _ = require('lodash');

const config = require('./config');
const Player = require('./Player');
const { createFood, getLeaders } = require('./util');

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

io.on('connection', socket => {
  let player;

  socket.on('joinGame', (name, assignPlayer) => {
    player = new Player(socket.id, name);
    players = { ...players, [player.id]: player };
    assignPlayer(player);

    food = food.concat(createFood(30));
  });

  socket.on('requestPlayers', () => {
    const playersList = Object.values(players);
    let fight = false;

    if (playersList.length > 1) { fight = player.checkOthers(playersList); }

    // current player won
    if (fight && fight.winner === player.id) player.eatOther(players[fight.loser].mass);
    // current player lost
    else if (fight && fight.loser === player.id) socket.emit('death');

    delete players[fight.loser];

    socket.emit('players', playersList);
  });

  socket.on('requestMove', target => {
    player.move(target);
    socket.emit('moveTo', player.pos);
  });

  socket.on('requestFood', () => {
    // if the player eats, add another food
    if (!_.isEmpty(food) && player.checkFood(food)) food = food.concat(createFood(1));

    socket.emit('food', food);
  });

  socket.on('requestScore', () => socket.emit('score', player.mass));

  socket.on('requestLeaders', () => socket.emit('leaders', getLeaders(players, player)));

  socket.on('disconnect', () => delete players[socket.id]);
});
