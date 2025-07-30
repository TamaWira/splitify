import { WinstonModule } from 'nest-winston';
import * as expressWinston from 'express-winston';
import * as winston from 'winston';

const isProd = process.env.NODE_ENV === 'production';

// Shared format for all logs
const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp, context }) => {
    // Include context (Nest logger includes it)
    return `[${timestamp as string}] ${level}: ${message as string}${context ? ` (${context as string})` : ''}`;
  }),
);

const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(), // structured JSON in production
);

// Base Winston logger instance
const rawWinstonLogger = winston.createLogger({
  level: isProd ? 'info' : 'debug',
  format: isProd ? prodFormat : devFormat,
  transports: [
    new winston.transports.Console(),
    ...(isProd
      ? [
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: prodFormat,
          }),
        ]
      : []),
  ],
});

// 1️⃣ WinstonModule for NestJS internal logs
export const winstonLogger = WinstonModule.createLogger({
  instance: rawWinstonLogger,
});

// 2️⃣ Express-winston for request/response logs
export const expressWinstonMiddleware = expressWinston.logger({
  winstonInstance: rawWinstonLogger,
  meta: false, // No extra JSON metadata in dev
  expressFormat: !isProd, // Dev: "GET /url 200 12ms"
  colorize: !isProd,
  msg: isProd
    ? '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms'
    : undefined, // Dev uses expressFormat for one-line style
});
