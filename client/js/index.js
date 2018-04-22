import io from 'socket.io-client';
import 'semantic-ui-css/semantic.min.css';
import _ from 'lodash';

import '../style/main.scss';
import '../style/start.scss';
import '../style/game.scss';
import '../style/end.scss';

import config from './config';
import { handleSocket, update, draw } from './app';
import canvas from './canvas';
import player from './player';
import ui from './ui';

const socket = io('http://localhost:3001');

const animate = () => {
  window.requestAnimationFrame(animate);
  update();
  draw();
};

// set up canvas
const initCanvas = async () => {
  await canvas.drawGrid();
  canvas.reset();
};
window.addEventListener('resize', canvas.resize);
initCanvas();

// initially randomize the viewport position in the game
config.offset = {
  x: _.random(config.gameWidth - config.screenWidth),
  y: _.random(config.gameHeight - config.screenHeight),
};

document.querySelector('.start__form').addEventListener('submit', e => {
  e.preventDefault();

  const playerNameInput = document.getElementById('name-input');
  const playerName = _.trim(playerNameInput.value);
  if (playerName === '') return;

  ui.changeOverlayTo('game');

  // server sends back player
  socket.emit('joinGame', playerName, currentPlayer => {
    player.currentPlayer = currentPlayer;
    handleSocket();
    animate();
  });
});

export default socket;
