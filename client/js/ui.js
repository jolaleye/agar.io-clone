import config from './config';

class Ui {
  target = {
    x: (config.screenWidth / 2) + config.offset.x,
    y: (config.screenHeight / 2) + config.offset.y,
  };

  constructor() {
    document.querySelector('.game.overlay').addEventListener('mousemove', this.updateTarget);
  }

  updateTarget = e => {
    this.target.x = e.clientX + config.offset.x;
    this.target.y = e.clientY + config.offset.y;
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
