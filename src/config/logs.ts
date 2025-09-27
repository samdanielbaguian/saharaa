export const logsConfig = {
  level: process.env.LOG_LEVEL || 'info', // 'info', 'warn', 'error', 'debug'
  file: process.env.LOG_FILE || 'app.log',
};