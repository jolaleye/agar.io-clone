import io from 'socket.io-client';
import 'semantic-ui-css/semantic.min.css';
import _ from 'lodash';

import '../style/main.scss';
import '../style/start.scss';
import '../style/game.scss';
import '../style/end.scss';

import app from './app';
import canvas from './canvas';

let socket;

const startForm = document.querySelector('.start__form');
const playerNameInput = document.getElementById('name-input');
let playerName;

canvas.drawGrid();

startForm.addEventListener('submit', e => {
  e.preventDefault();

  playerName = _.trim(playerNameInput.value);
  if (playerName === '') return;

  app.changeOverlaysTo('game');

  socket = io('http://localhost:3001');

  socket.on('welcome', () => {
    socket.emit('joinGame', playerName);
    app.socket = socket;
    app.animate();
  });
});
