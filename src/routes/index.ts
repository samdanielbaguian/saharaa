import { Router } from 'express';
import authRoutes from './auth';
import livreurRoutes from './livreur';
import restaurantRoutes from './restaurants';
import mealRoutes from './meals';
import orderRoutes from './orders';
import paymentRoutes from './payments';
import ratingRoutes from './ratings';
import notificationRoutes from './notifications';
import userRoutes from './user';
import servicesRoutes from './services';

// Si tu ajoutes d'autres routes plus tard, importe-les ici

const router = Router();

router.use('/auth', authRoutes);
router.use('/livreur', livreurRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/meals', mealRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/ratings', ratingRoutes);
router.use('/notifications', notificationRoutes);
router.use('/user', userRoutes);
router.use('/services', servicesRoutes);
export default router;