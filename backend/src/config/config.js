import dotenv from 'dotenv';

dotenv.config();

export default {
    NODE_ENV: process.env.NODE_ENV || 'DEV',
    HOST: process.env.HOST || '0.0.0.0',
    PORT: process.env.PORT || '8080',
    expiresIn: process.env.EXPIRESIN || '24h',
    SENTRY_DSN: process.env.SENTRY_DSN || '',
    DB_FILE: process.env.DB_FILE || 'db.sqlite',
  }
  