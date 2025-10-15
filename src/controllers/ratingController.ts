import { Request, Response } from 'express';
import Rating from '../models/rating';

export const postRating = async (req: Request, res: Response) => {
  try {
    const { userId, restaurantId, value, comment } = req.body;
    const rating = await Rating.create({ userId, restaurantId, value, comment });
    return res.status(201).json(rating);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

export const getRestaurantRatings = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const ratings = await Rating.findAll({ where: { restaurantId } });
    return res.status(200).json(ratings);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};