import { DataSource } from 'typeorm';

const runningTsNode = !!process.env.TS_NODE; // we’ll force this in CLI commands

export default new DataSource({
  type: 'postgres',
  url: process.env.RAILWAY_STATIC_URL
    ? process.env.DATABASE_URL // inside Railway → internal URL
    : (process.env.DATABASE_PUBLIC_URL ?? process.env.DATABASE_URL), // local/CI → public URL

  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,

  // adjust these to YOUR actual paths
  entities: runningTsNode ? ['src/**/*.entity.ts'] : ['dist/**/*.entity.js'],

  // IMPORTANT: use your real folders
  migrations: runningTsNode
    ? ['typeorm/migrations/*.ts'] // TS during dev/CLI
    : ['dist/typeorm/migrations/*.js'], // JS in prod runtime

  // If you changed the table name, keep this consistent (optional)
  // migrationsTableName: 'migrations',
});
