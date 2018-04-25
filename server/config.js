module.exports = {
  port: process.env.PORT || 3001,
  gameWidth: 5000,
  gameHeight: 5000,
  colors: [
    { fill: '#12FFF7', stroke: '#10efe8' },
    { fill: '#ff7f99', stroke: '#ff6d8b' },
    { fill: '#5974f9', stroke: '#3F5EFB' },
    { fill: '#f9a43b', stroke: '#FF8C00' },
    { fill: '#a236ed', stroke: '#7303c0' },
    { fill: '#34e89e', stroke: '#26c182' },
    { fill: '#f96668', stroke: '#ff474a' },
  ],
  foodToAddOnJoin: 50,
  defaultPlayerMass: 50,
  speedFactor: 750,
};
