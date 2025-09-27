import { Request, Response } from 'express';

export const processPayment = async (req: Request, res: Response) => {
  try {
    // Ici on simule le paiement, donc pas de vrai intégration Stripe etc.
    const { orderId, amount } = req.body;
    // logique simulée
    return res.status(200).json({ message: 'Paiement accepté', orderId, amount });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};