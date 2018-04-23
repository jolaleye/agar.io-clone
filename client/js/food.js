import config from './config';
import canvas from './canvas';

class Food {
  food = [];

  drawFood = () => {
    const c = canvas.context;

    this.food.forEach(food => {
      const x = food.pos.x - config.offset.x;
      const y = food.pos.y - config.offset.y;
      const radius = 15;

      const fillColor = '#12FFF7';
      const strokeColor = '#10efe8';

      // cell
      c.fillStyle = fillColor;
      c.strokeStyle = strokeColor;
      c.lineWidth = 5;
      c.beginPath();
      c.arc(x, y, radius, 0, 2 * Math.PI);
      c.fill();
      c.stroke();
      c.closePath();
    });
  }
}

export default new Food();
