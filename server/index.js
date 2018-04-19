const express = require('express');

const config = require('./config');

const app = express();
const server = app.listen(config.port, () => console.log(`Server started on port ${config.port}`));

const io = require('socket.io')(server);

const Player = require('./player');

// serve the front end in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/../client/build`));
  app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/../client/build/index.html`);
  });
}

const players = [];

io.on('connect', socket => {
  socket.emit('welcome');

  let player;

  // start game
  socket.on('joinGame', name => {
    player = new Player(socket.id, name);
    players.push(player);
    socket.broadcast.emit('playerJoined', players);
    socket.emit('start');
  });
});
