import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

// Login par téléphone ou email
router.post('/login', login);

// Tu peux ajouter ici d'autres endpoints liés à l'authentification (ex: logout, refresh token, etc.)

export default router;