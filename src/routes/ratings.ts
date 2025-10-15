import { Router } from 'express';
import { postRating, getRestaurantRatings } from '../controllers/ratingController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Ajouter un avis/une note sur un restaurant (utilisateur connecté)
router.post('/', requireAuth, postRating);

// Récupérer tous les avis d'un restaurant
router.get('/restaurant/:restaurantId', getRestaurantRatings);

export default router;