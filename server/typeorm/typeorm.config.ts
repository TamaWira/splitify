import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    process.env.NODE_ENV === 'production'
      ? 'dist/**/*.entity.js'
      : 'src/**/*.entity.ts',
  ],
  migrations: [
    process.env.NODE_ENV === 'production'
      ? 'dist/typeorm/migrations/*.js'
      : 'src/typeorm/migrations/*.ts',
  ],
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});
