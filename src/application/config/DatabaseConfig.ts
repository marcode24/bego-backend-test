import mongoose from 'mongoose';
import logger from 'infrastructure/logging/Logger.js';

export default class DatabaseConfig {
  private mongoUri: string;

  constructor(mongoUri: string) {
    this.mongoUri = mongoUri;
  }

  public connect(): void {
    mongoose
      .connect(this.mongoUri, {
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => {
        logger.info('MongoDB connection established');
      })
      .catch((error) => {
        logger.error(`MongoDB connection error: ${error}`);
      });
  }
}
