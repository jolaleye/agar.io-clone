import config from './config';
import socket from './index';
import canvas from './canvas';
import player from './player';

let mouse;
export const init = () => {
  mouse = { x: 0, y: 0 };

  document.querySelector('.game.overlay').addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
};

export const handleSocket = () => {
  socket.on('players', players => { player.players = players; });
  socket.on('moveTo', pos => { player.currentPlayer.pos = pos; });
};

export const update = () => {
  canvas.update();
  socket.emit('requestPlayers');
  socket.emit('requestMove', {
    x: mouse.x + config.offset.x,
    y: mouse.y + config.offset.y,
  });
};

export const draw = () => {
  canvas.reset();
  player.drawPlayers();
};

export const changeOverlaysTo = mode => {
  const startOverlay = document.querySelector('.start.overlay');
  const gameOverlay = document.querySelector('.game.overlay');
  const endOverlay = document.querySelector('.end.overlay');

  startOverlay.classList.add('hidden');
  gameOverlay.classList.add('hidden');
  endOverlay.classList.add('hidden');

  if (mode === 'start') {
    startOverlay.classList.remove('hidden');
  } else if (mode === 'game') {
    gameOverlay.classList.remove('hidden');
  } else if (mode === 'end') {
    endOverlay.classList.remove('hidden');
  }
};
