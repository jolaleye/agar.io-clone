const express = require('express');
const _ = require('lodash');

const config = require('./config');
const Player = require('./Player');
const { createFood } = require('./util');

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

  socket.on('requestPlayers', () => socket.emit('players', Object.values(players)));

  socket.on('requestMove', target => {
    player.move(target);
    socket.emit('moveTo', player.pos);
  });

  socket.on('requestFood', () => {
    if (!_.isEmpty(food)) player.checkFood(food);
    socket.emit('food', food);
  });

  socket.on('requestScore', () => socket.emit('score', player.mass));

  socket.on('requestLeaders', () => {
    const leaders = _.sortBy(Object.values(players), p => p.mass).reverse();

    if (leaders.length >= 10) leaders.splice(10);

    socket.emit('leaders', leaders);
  });

  socket.on('disconnect', () => delete players[socket.id]);
});
