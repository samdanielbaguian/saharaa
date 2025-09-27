import dotenv from 'dotenv';
dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'changeme',
  smsApiKey: process.env.SMS_API_KEY || '',
  // ...autres variables
};