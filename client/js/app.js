import socket from './index';
import canvas from './canvas';
import player from './player';
import ui from './ui';
import food from './food';

export const handleSocket = () => {
  socket.on('players', players => { player.players = players; });
  socket.on('moveTo', pos => { player.currentPlayer.pos = pos; });
  socket.on('food', newFood => { food.food = newFood; });
  socket.on('score', score => ui.updateScore(score));
  socket.on('leaders', leaders => ui.updateLeaderboard(leaders));
};

export const update = () => {
  canvas.update();
  socket.emit('requestPlayers');
  socket.emit('requestMove', ui.target);
  socket.emit('requestFood');
  socket.emit('requestScore');
  socket.emit('requestLeaders');
};

export const draw = () => {
  canvas.reset();
  food.drawFood();
  player.drawPlayers();
};
