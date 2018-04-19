import io from 'socket.io-client';
import 'semantic-ui-css/semantic.min.css';
import '../style/main.scss';

import { waitForName, startGame } from './start';
import './game';
import './end';

const socket = io('http://localhost:3001');

socket.on('welcome', () => {
  const startForm = document.querySelector('.start__form');
  startForm.addEventListener('submit', e => waitForName(e, socket));
});

socket.on('start', () => {
  startGame();
});
