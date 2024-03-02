require('dotenv').config();

module.exports = {
  development: {
    username: 'default',
    password: 'hM9erd7gVAiL',
    database: 'verceldb',
    host: 'ep-polished-river-a4gpuqh3-pooler.us-east-1.aws.neon.tech',
    port: 5432,
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    use_env_variable: 'PG_URI',
    dialect: 'postgres',
  },
};
