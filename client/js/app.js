import canvas from './canvas';

class App {
  animate = () => {
    window.requestAnimationFrame(this.animate);
    canvas.reset();
  }

  changeOverlaysTo = mode => {
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

export default new App();
