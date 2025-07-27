// src/config/config.type.ts
import databaseConfig from './database.config';
import { ConfigType } from '@nestjs/config';

export type DatabaseConfig = ConfigType<typeof databaseConfig>['database'];
