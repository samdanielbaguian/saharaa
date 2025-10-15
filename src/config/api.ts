export const apiConfig = {
  baseUrl: process.env.API_BASE_URL || 'https://api.saharaa.com',
  timeout: Number(process.env.API_TIMEOUT) || 5000, // en millisecondes
};