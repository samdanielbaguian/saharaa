// Exemple de service SMS utilisant Twilio (ou autre fournisseur)
// Installe Twilio : npm install twilio

import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;

const client = twilio(accountSid, authToken);

export const sendSMS = async (
  to: string,
  body: string
): Promise<boolean> => {
  try {
    await client.messages.create({
      body,
      from: twilioPhone,
      to
    });
    return true;
  } catch (error) {
    console.error('Erreur envoi SMS:', error);
    return false;
  }
};