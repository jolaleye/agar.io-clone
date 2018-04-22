import socket from './index';
import canvas from './canvas';
import player from './player';
import ui from './ui';

export const handleSocket = () => {
  socket.on('players', players => { player.players = players; });
  socket.on('moveTo', pos => { player.currentPlayer.pos = pos; });
};

export const update = () => {
  canvas.update();
  socket.emit('requestPlayers');
  socket.emit('requestMove', ui.target);
};

export const draw = () => {
  canvas.reset();
  player.drawPlayers();
};
