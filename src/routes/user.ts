import { Router } from 'express';
import { getProfile, updateProfile, changePassword } from '../controllers/userController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Récupérer le profil de l'utilisateur connecté
router.get('/profile', requireAuth, getProfile);

// Modifier le profil de l'utilisateur connecté
router.put('/update', requireAuth, updateProfile);

// Changer le mot de passe de l'utilisateur connecté
router.patch('/change-password', requireAuth, changePassword);

export default router;