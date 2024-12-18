import winston from 'winston';
import path from 'path';

const logLevels = {
  levels: {
    info: 0,
    warn: 1,
    error: 2,
  },
  colors: {
    info: 'green',
    warn: 'yellow',
    error: 'red',
  },
};

const __dirname = path.resolve();

const logger = winston.createLogger({
  levels: logLevels.levels,
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, 'logs', 'app.log'),
      level: 'info', // Solo guarda los logs de nivel 'info' o superior
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, 'logs', 'error.log'),
      level: 'error', // Solo guarda los logs de nivel 'error'
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
    }),
  ],
});

export default logger;
