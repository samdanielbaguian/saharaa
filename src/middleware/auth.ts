import { Request, Response, NextFunction, Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { login } from '../controllers/authController';

const router = Router();
router.post('/login', login);

// Étend l'objet Request pour le typage TypeScript du champ user
declare global {
  namespace Express {
    interface Request {
      user?: typeof User.prototype;
    }
  }
}

// Middleware pour vérifier le token JWT et récupérer l'utilisateur
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Token d'authentification manquant." });
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé." });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
};

// Middleware pour vérifier si l'utilisateur est admin
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: "Accès réservé aux administrateurs." });
};

export default router;