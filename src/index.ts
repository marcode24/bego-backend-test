import express from 'express';
import logger from './infraestructure/logging/Logger.js';

const app = express();

app.get('/', (_, res) => {
  logger.info('GET /');
  res.send('Hello World!');
});

app.listen(3000, () => {
  logger.info('Server running on port 3000');
  console.log('Server running on port 3000');
});
