module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  // subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    // entitiesDir: 'src/entity',
    migrationsDir: 'src/migrations',
    // subscribersDir: 'src/subscriber',
  },
};