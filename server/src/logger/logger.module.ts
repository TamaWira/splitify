// logger.module.ts
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as expressWinston from 'express-winston';
import * as winston from 'winston';

const isProd = process.env.NODE_ENV === 'production';

// ----- Formats -----
const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp, context }) => {
    return `[${timestamp as string}] ${level}: ${message as string}${context ? ` (${context as string})` : ''}`;
  }),
);

const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

// ----- Winston base instance -----
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

// ----- LoggerModule -----
@Module({
  imports: [
    WinstonModule.forRoot({
      instance: rawWinstonLogger, // use our Winston instance for NestJS
    }),
  ],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        expressWinston.logger({
          winstonInstance: rawWinstonLogger, // use same logger for requests
          expressFormat: !isProd, // "GET /path 200 12ms" in dev
          meta: isProd, // only log metadata in prod
          colorize: !isProd,
          level: (req, res) => {
            if (res.statusCode >= 500) return 'error';
            if (res.statusCode === 404) return 'info'; // 404 is expected
            return 'info';
          },
          msg: isProd
            ? '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms'
            : undefined, // in dev, expressFormat already handles this
        }),
      )
      .forRoutes('*'); // apply to all routes
  }
}
