import { Request, Response } from 'express';
import {
  createOrder,
  updateOrderStatus,
  cancelOrder,
  getOrdersByUser,
  getOrderDetails
} from '../services/orderService';

// Créer une commande
export const createOrderController = async (req: Request, res: Response) => {
  try {
    const { userId, restaurantId, items, totalPrice, address } = req.body;
    if (!userId || !restaurantId || !items || !totalPrice || !address) {
      return res.status(400).json({ message: 'Champs obligatoires manquants.' });
    }
    const order = await createOrder(userId, restaurantId, items, totalPrice, address);
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Récupérer les commandes d'un utilisateur
export const getUserOrdersController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Utilisateur non authentifié." });
    const orders = await getOrdersByUser(userId);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Mettre à jour le statut d'une commande
export const updateOrderStatusController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'Statut requis.' });
    const [affectedRows] = await updateOrderStatus(Number(id), status);
    if (!affectedRows) return res.status(404).json({ message: 'Commande non trouvée.' });
    return res.status(200).json({ message: 'Statut mis à jour.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Annuler une commande
export const cancelOrderController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [affectedRows] = await cancelOrder(Number(id));
    if (!affectedRows) return res.status(404).json({ message: 'Commande non trouvée.' });
    return res.status(200).json({ message: 'Commande annulée avec succès.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Récupérer les détails d'une commande
export const getOrderDetailsController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await getOrderDetails(Number(id));
    if (!order) return res.status(404).json({ message: 'Commande non trouvée.' });
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};