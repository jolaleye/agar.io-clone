import io from 'socket.io-client';
import 'semantic-ui-css/semantic.min.css';
import _ from 'lodash';

import '../style/main.scss';
import '../style/start.scss';
import '../style/game.scss';
import '../style/end.scss';

import { handleSocket, update, draw, changeOverlaysTo } from './app';
import canvas from './canvas';
import player from './player';

const socket = io('http://localhost:3001');

const startForm = document.querySelector('.start__form');

const animate = () => {
  window.requestAnimationFrame(animate);
  update();
  draw();
};

startForm.addEventListener('submit', e => {
  e.preventDefault();

  const playerNameInput = document.getElementById('name-input');
  const playerName = _.trim(playerNameInput.value);
  if (playerName === '') return;

  changeOverlaysTo('game');

  // server sends back player
  socket.emit('joinGame', playerName, currentPlayer => {
    player.currentPlayer = currentPlayer;
    handleSocket();
    animate();
  });
});

const initCanvas = async () => {
  await canvas.drawGrid();
  canvas.reset();
};

initCanvas();

window.addEventListener('resize', canvas.resize);

export default socket;
