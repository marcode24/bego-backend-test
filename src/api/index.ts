import 'reflect-metadata';
import 'infrastructure/IoC/dependencyInjection.ts';
import app from './app.ts';
import dbConnection from 'infrastructure/database/connection.ts';
import EnvConfig from 'application/config/EnvConfig.ts';
import logger from 'infrastructure/logging/Logger.ts';

const envConfig = new EnvConfig();

const { PORT } = envConfig.env;

(async (): Promise<void> => {
  try {
    await dbConnection();

    app
      .listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
        // eslint-disable-next-line no-console
        console.log(`Server running on port ${PORT}`);
      })
      .on('error', (error) => {
        logger.error(error.message);
        // eslint-disable-next-line no-console
        console.error(error);
      });
  } catch (error) {
    logger.error(error.message);
    // eslint-disable-next-line no-console
    console.error(error);
  }
})();
