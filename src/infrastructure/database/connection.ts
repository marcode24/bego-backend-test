import DatabaseConfig from 'application/config/DatabaseConfig.ts';
import EnvConfig from 'application/config/EnvConfig.ts';

const envConfig = new EnvConfig();

const { MONGO_URI } = envConfig.env;

const dbConnection = async (): Promise<void> => {
  const dbConfig = new DatabaseConfig(MONGO_URI);
  dbConfig.connect();
};

export default dbConnection;
