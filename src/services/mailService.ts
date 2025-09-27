import nodemailer from 'nodemailer';

export const sendEmail = async (
  to: string,
  subject: string,
  text: string
): Promise<boolean> => {
  // Configure le transporteur
  const transporter = nodemailer.createTransport({
    service: 'gmail', // tu peux remplacer par ton fournisseur SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });
    return true;
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return false;
  }
};