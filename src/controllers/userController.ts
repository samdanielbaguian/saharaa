import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';

// Récupérer le profil de l'utilisateur connecté
export const getProfile = async (req: Request, res: Response) => {
  try {
    // req.user est ajouté par le middleware requireAuth
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Non authentifié.' });

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Modifier le profil
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Non authentifié.' });

    const { name, email, phone } = req.body;
    await User.update(
      { name, email, phone },
      { where: { id: user.id } }
    );
    return res.status(200).json({ message: 'Profil mis à jour.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Changer le mot de passe
export const changePassword = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Non authentifié.' });

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Ancien et nouveau mot de passe requis.' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Ancien mot de passe incorrect.' });
    }

    const password_hash = await bcrypt.hash(newPassword, 10);
    await User.update(
      { password_hash },
      { where: { id: user.id } }
    );

    return res.status(200).json({ message: 'Mot de passe changé.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};