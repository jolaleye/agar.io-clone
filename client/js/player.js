import canvas from './canvas';
import config from './config';

class Player {
  players = [];
  currentPlayer = null;

  updatePlayers = players => {
    this.players = Object.values(players);
    if (config.playing) this.currentPlayer = players[this.currentPlayer.id];
  }

  moveTo = pos => {
    this.currentPlayer.pos.x = pos.x;
    this.currentPlayer.pos.y = pos.y;
  }

  drawPlayers = () => {
    const c = canvas.context;

    this.players.forEach(player => {
      const x = player.pos.x - config.offset.x;
      const y = player.pos.y - config.offset.y;
      const radius = player.mass;
      const fontSize = Math.max(radius / 2, 30);

      // cell
      c.fillStyle = player.fillColor;
      c.strokeStyle = player.strokeColor;
      c.lineWidth = 5;
      c.beginPath();
      c.arc(x, y, radius, 0, 2 * Math.PI);
      c.fill();
      c.stroke();
      c.closePath();

      // name
      c.fillStyle = 'white';
      c.strokeStyle = 'black';
      c.lineWidth = 1;
      c.font = `${fontSize}px arial`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(player.name, x, y);
      c.strokeText(player.name, x, y);
    });
  }
}

export default new Player();
