import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Livreur from '../models/livreur';

// Sequelize 'or' operator must be imported
import { Op } from 'sequelize';

export const login = async (req: Request, res: Response) => {
  try {
    const { phoneOrEmail, password } = req.body;
    if (!phoneOrEmail || !password) {
      return res.status(400).json({ message: 'Téléphone/email et mot de passe requis.' });
    }

    // On cherche l'utilisateur par téléphone ou email
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { phone: phoneOrEmail },
          { email: phoneOrEmail }
        ]
      }
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // Si livreur, vérifions le statut
    if (user.role === 'livreur') {
      const livreur = await Livreur.findOne({ where: { user_id: user.id } });
      if (!livreur) {
        return res.status(403).json({ message: "Compte livreur introuvable." });
      }
      if (livreur.status !== 'disponible') {
        return res.status(403).json({ message: "Votre compte livreur n'est pas encore validé ou a été refusé." });
      }
    }

    // Création du token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    // Réponse personnalisée
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};