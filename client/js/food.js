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

      // cell
      c.fillStyle = food.color;
      c.beginPath();
      c.arc(x, y, radius, 0, 2 * Math.PI);
      c.fill();
      c.closePath();
    });
  }
}

export default new Food();
