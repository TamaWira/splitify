import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'docker',
  password: 'docker',
  database: 'splitify_db',
  synchronize: false,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['typeorm/migrations/*.ts'],
  migrationsTableName: 'migrations',
  subscribers: ['src/**/*.subscriber.ts'],
});
