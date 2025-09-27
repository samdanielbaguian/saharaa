import { Request, Response } from 'express';
import { sendEmail } from '../services/mailService';
import { sendNotification } from '../services/notificationService';

// Endpoint pour tester l'envoi d'email
export const testEmail = async (req: Request, res: Response) => {
  const { to, subject, text } = req.body;
  const success = await sendEmail(to, subject, text);
  if (success) {
    return res.status(200).json({ message: 'Email envoyé !' });
  }
  return res.status(500).json({ message: 'Erreur envoi email.' });
};

// Endpoint pour tester l'envoi de notification
export const testNotification = async (req: Request, res: Response) => {
  const { userId, message } = req.body;
  try {
    const notif = await sendNotification(userId, message);
    return res.status(200).json({ message: 'Notification envoyée !', notif });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur envoi notification.', error });
  }
};