import socket from './index';
import config from './config';
import player from './player';

class Ui {
  target = {
    x: (config.screenWidth / 2) + config.offset.x,
    y: (config.screenHeight / 2) + config.offset.y,
  };

  constructor() {
    document.querySelector('.game.overlay').addEventListener('mousemove', this.updateTarget);
    document.addEventListener('keypress', this.eject);
  }

  updateTarget = e => {
    this.target.x = e.clientX + config.offset.x;
    this.target.y = e.clientY + config.offset.y;
  }

  eject = e => {
    if (!config.playing) return;
    if (e.key === 'w') socket.emit('eject');
  }

  updateScore = score => {
    document.getElementById('score').innerHTML = score;
  }

  updateLeaderboard = leaders => {
    const leaderboard = document.querySelector('.game__leaderboard .list');
    leaderboard.innerHTML = '';

    const createEntry = (place, name, current) => (
      `<div class="item leaderboard__player ${current ? 'me' : null}">
        ${place}.
        <span class="name">${name}</span>
      </div>`
    );

    leaders.forEach(leader => {
      const current = leader.id === player.currentPlayer.id;
      leaderboard.innerHTML += createEntry(leader.rank, leader.name, current);
    });
  }

  endGame = () => {
    this.changeOverlayTo('end');
    document.getElementById('restart-btn').addEventListener('click', () => {
      this.changeOverlayTo('start');
    });
  }

  changeOverlayTo = mode => {
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
  }
}

export default new Ui();
