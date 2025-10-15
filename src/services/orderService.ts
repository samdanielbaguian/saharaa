import Order from '../models/order';
import { randomString } from '../utils/randomString';

// Créer une commande avec une référence unique
export const createOrder = async (
  userId: number,
  restaurantId: number,
  items: any[], // Tableau d'items, à adapter selon ton modèle
  totalPrice: number,
  address: string
): Promise<Order> => {
  const reference = randomString(10); // 10 caractères pour la référence
  return await Order.create({
    userId,
    restaurantId,
    items,
    totalPrice,
    address,
    reference,
    status: 'pending' // Statut initial
  });
};

// Modifier une commande (hors statut et livreur)
export const updateOrder = async (
  orderId: number,
  updates: Partial<{
    items: any[];
    totalPrice: number;
    address: string;
  }>
): Promise<[number, Order[]]> => {
  return await Order.update(
    { ...updates },
    { where: { id: orderId }, returning: true }
  );
};

// Annuler une commande
export const cancelOrder = async (
  orderId: number
): Promise<[number, Order[]]> => {
  return await Order.update(
    { status: 'cancelled' },
    { where: { id: orderId }, returning: true }
  );
};

// Assigner un livreur à une commande
export const assignLivreur = async (
  orderId: number,
  livreurId: number
): Promise<[number, Order[]]> => {
  return await Order.update(
    { livreurId },
    { where: { id: orderId }, returning: true }
  );
};

// Mettre à jour le statut d'une commande
export const updateOrderStatus = async (
  orderId: number,
  status: string
): Promise<[number, Order[]]> => {
  return await Order.update(
    { status },
    { where: { id: orderId }, returning: true }
  );
};

// Récupérer les commandes d'un utilisateur
export const getOrdersByUser = async (
  userId: number
): Promise<Order[]> => {
  return await Order.findAll({ where: { userId } });
};

// Récupérer les commandes d'un livreur
export const getOrdersByLivreur = async (
  livreurId: number
): Promise<Order[]> => {
  return await Order.findAll({ where: { livreurId } });
};

// Récupérer les détails d'une commande
export const getOrderDetails = async (
  orderId: number
): Promise<Order | null> => {
  return await Order.findByPk(orderId);
};