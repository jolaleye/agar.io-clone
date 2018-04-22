import socket from './index';
import canvas from './canvas';
import player from './player';

export const handleSocket = () => {

};

export const update = () => {
  canvas.update();
};

export const draw = () => {

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
