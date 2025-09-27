export const smsConfig = {
  provider: process.env.SMS_PROVIDER || 'twilio',
  accountSid: process.env.TWILIO_SID || '',
  authToken: process.env.TWILIO_TOKEN || '',
  from: process.env.TWILIO_FROM || '',
  // Ajoute ici d’autres paramètres si besoin
};