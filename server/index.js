const express = require('express');

const config = require('./config');

const app = express();

// serve the front end in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/../client/build`));
  app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/../client/build/index.html`);
  });
}

app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
