// src/config/typeorm.runtime.ts
import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmRuntimeOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  autoLoadEntities: true,
  synchronize: false,
  // (optional) logging: true,
};
