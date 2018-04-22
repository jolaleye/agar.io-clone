const express = require('express');

const config = require('./config');
const Player = require('./Player');

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

io.on('connection', socket => {
  let player;

  socket.on('joinGame', (name, assignPlayer) => {
    player = new Player(socket.id, name);
    players = { ...players, [player.id]: player };
    assignPlayer(player);
  });

  socket.on('requestPlayers', () => socket.emit('players', Object.values(players)));

  socket.on('requestMove', target => {
    player.move(target);
    socket.emit('moveTo', player.pos);
  });

  socket.on('disconnect', () => delete players[socket.id]);
});
