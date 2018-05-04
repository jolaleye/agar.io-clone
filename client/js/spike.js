import config from './config';
import canvas from './canvas';

class Spike {
  spikes = [];

  updateSpikes = spikes => {
    this.spikes = spikes;
  }

  drawSpikes = () => {
    const c = canvas.context;

    this.spikes.forEach(spike => {
      const x = spike.pos.x - config.offset.x;
      const y = spike.pos.y - config.offset.y;

      c.fillStyle = '#38ef7d';
      c.strokeStyle = '#31ce6c';
      c.lineWidth = 6;
      c.beginPath();
      c.arc(x, y, spike.radius, 0, 2 * Math.PI);
      c.fill();
      c.stroke();
      c.closePath();
    });
  }
}

export default new Spike();
