import config from './config';
import canvas from './canvas';

class Mass {
  masses = [];

  updateMasses = masses => {
    this.masses = masses;
  }

  drawMasses = () => {
    const c = canvas.context;

    this.masses.forEach(mass => {
      const x = mass.pos.x - config.offset.x;
      const y = mass.pos.y - config.offset.y;
      const radius = mass.mass;

      c.fillStyle = mass.fillColor;
      c.strokeStyle = mass.strokeColor;
      c.lineWidth = 3;
      c.beginPath();
      c.arc(x, y, radius, 0, 2 * Math.PI);
      c.fill();
      c.stroke();
      c.closePath();
    });
  }
}

export default new Mass();
