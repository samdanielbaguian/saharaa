// Exemple de service pour paiement mobile en Afrique de l'Ouest
import Payment from '../models/payment';

// Enum pour les types de paiement
export enum MobilePaymentMethod {
  ORANGE_MONEY = 'orange_money',
  MTN_MONEY = 'mtn_money',
  MOOV_MONEY = 'moov_money',
  WAVE = 'wave'
  // Ajoute d'autres si besoin
}

// Simuler ou traiter un paiement mobile
export const processMobilePayment = async (
  orderId: number,
  method: MobilePaymentMethod,
  phone: string,
  amount: number
): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
  try {
    // Ici tu intègres la logique avec l'API du fournisseur réel
    // Pour l'instant, on simule un paiement réussi
    // Pour chaque méthode, tu pourras ajouter la logique d'appel API

    // Simule une transaction
    const transactionId = `${method.toUpperCase()}_${Date.now()}`;

    // Enregistre le paiement en base
    await Payment.create({
      orderId,
      transactionId,
      amount,
      paymentMethod: method,
      phone,
      status: 'paid'
    });

    return { success: true, transactionId };
  } catch (error) {
    return { success: false, error: 'Paiement échoué' };
  }
};

// Annuler un paiement
export const cancelPayment = async (
  paymentId: number
): Promise<[number, Payment[]]> => {
  return await Payment.update(
    { status: 'cancelled' },
    { where: { id: paymentId }, returning: true }
  );
};

// Récupérer les paiements d'une commande
export const getPaymentsByOrder = async (
  orderId: number
): Promise<Payment[]> => {
  return await Payment.findAll({ where: { orderId } });
};

// Récupérer les détails d'un paiement
export const getPaymentDetails = async (
  paymentId: number
): Promise<Payment | null> => {
  return await Payment.findByPk(paymentId);
};