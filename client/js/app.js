import socket from './index';
import config from './config';
import canvas from './canvas';
import player from './player';
import ui from './ui';
import food from './food';
import mass from './mass';

export const handleSocket = () => {
  socket.on('players', players => player.updatePlayers(players));
  socket.on('moveTo', pos => player.moveTo(pos));
  socket.on('food', newFood => food.updateFood(newFood));
  socket.on('masses', masses => mass.updateMasses(masses));
  socket.on('score', score => ui.updateScore(score));
  socket.on('leaders', leaders => ui.updateLeaderboard(leaders));
  socket.on('death', () => {
    config.playing = false;
    ui.endGame();
  });
};

export const update = () => {
  if (config.playing) {
    canvas.update();
    socket.emit('requestMove', ui.target);
    socket.emit('requestScore');
  }
  socket.emit('requestPlayers');
  socket.emit('requestFood');
  socket.emit('requestLeaders');
  socket.emit('requestMasses');
};

export const draw = () => {
  canvas.reset();
  food.drawFood();
  player.drawPlayers();
  mass.drawMasses();
};
