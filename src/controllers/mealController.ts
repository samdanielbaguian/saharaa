import { Request, Response } from 'express';
import Meal from '../models/meal';

export const createMeal = async (req: Request, res: Response) => {
  try {
    const { name, description, price, restaurantId } = req.body;
    const meal = await Meal.create({ name, description, price, restaurantId });
    return res.status(201).json(meal);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

export const getMealsByRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const meals = await Meal.findAll({ where: { restaurantId } });
    return res.status(200).json(meals);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};21  