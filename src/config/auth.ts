export const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'change_this_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h', // Durée de vie du token
  jwtAlgorithm: 'HS256', // Algorithme utilisé pour le token
};