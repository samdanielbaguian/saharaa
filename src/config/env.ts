import dotenv from 'dotenv';
dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  dbName: process.env.DB_NAME || 'saharaa',
  dbUser: process.env.DB_USER || 'postgres',
  dbPass: process.env.DB_PASS || '',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || '5432',
  jwtSecret: process.env.JWT_SECRET || 'change_this_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  smsApiKey: process.env.SMS_API_KEY || '',
  mailHost: process.env.MAIL_HOST || 'smtp.mailtrap.io',
  mailPort: process.env.MAIL_PORT || '2525',
  mailUser: process.env.MAIL_USER || '',
  mailPass: process.env.MAIL_PASS || '',
  mailFrom: process.env.MAIL_FROM || 'no-reply@saharaa.com',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  // Ajoute ici d’autres variables si tu en as besoin
};