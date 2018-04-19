import '../style/start.scss';

const overlay = document.querySelector('.overlay');
const start = document.querySelector('.start');
const game = document.querySelector('.game');
const nameInput = document.getElementById('name-input');

export const waitForName = (event, socket) => {
  event.preventDefault();

  const playerName = nameInput.value;
  // require the name field
  if (!playerName) return;

  nameInput.value = '';

  socket.emit('joinGame', playerName);
};

export const startGame = () => {
  // change overlays
  overlay.classList.remove('dim');
  start.classList.add('hidden');
  game.classList.remove('hidden');

  console.log('start');
};
