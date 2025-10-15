import { Request, Response } from 'express';
import Restaurant from '../models/restaurant';

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, address, phone } = req.body;
    const restaurant = await Restaurant.create({ name, address, phone });
    return res.status(201).json(restaurant);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.findAll();
    return res.status(200).json(restaurants);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findByPk(Number(id));
    if (!restaurant) return res.status(404).json({ message: 'Restaurant non trouvé.' });
    return res.status(200).json(restaurant);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, address, phone } = req.body;
    const [affectedRows] = await Restaurant.update(
      { name, address, phone },
      { where: { id: Number(id) } }
    );
    if (!affectedRows) return res.status(404).json({ message: 'Restaurant non trouvé.' });
    return res.status(200).json({ message: 'Restaurant mis à jour.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Restaurant.destroy({ where: { id: Number(id) } });
    if (!deleted) return res.status(404).json({ message: 'Restaurant non trouvé.' });
    return res.status(200).json({ message: 'Restaurant supprimé.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};