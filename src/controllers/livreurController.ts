import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Livreur from '../models/livreur';
import User from '../models/user';
import { generateOtp } from '../utils/generateOtp';
import { sendSMS } from '../services/smsService';

export const registerLivreur = async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      phone,
      email,
      password,
      locality
    } = req.body;

    // Fichiers uploadés (via multer)
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const recto = files?.identity_doc_recto?.[0];
    const verso = files?.identity_doc_verso?.[0];

    if (!first_name || !last_name || !phone || !email || !password || !locality || !recto || !verso) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires (y compris les deux faces de la pièce d\'identité).' });
    }

    // Vérifier que l'utilisateur n'existe pas déjà
    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec ce numéro existe déjà.' });
    }

    // Générer l'OTP
    const otp = generateOtp(); // 6 chiffres

    // Création de l'utilisateur
    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: `${first_name} ${last_name}`,
      email,
      phone,
      password_hash,
      role: 'livreur',
      otp,               // Stocke l'OTP dans le User
      otpVerified: false // À ajouter dans le modèle User si pas déjà présent
    });

    // Création du profil livreur
    await Livreur.create({
      user_id: user.id,
      first_name,
      last_name,
      phone,
      email,
      locality,
      identity_doc_recto_url: recto.path,
      identity_doc_verso_url: verso.path,
      status: 'pending'
    });

    // Envoie l'OTP par SMS
    await sendSMS(phone, `Votre code OTP Saharaa: ${otp}`);

    return res.status(201).json({ message: 'Inscription livreur réussie! Un code OTP a été envoyé par SMS. Votre compte sera validé après vérification.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

export const validateLivreur = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'approve' ou 'reject'

    const livreur = await Livreur.findByPk(id);
    if (!livreur) {
      return res.status(404).json({ message: "Livreur non trouvé." });
    }

    let newStatus = '';
    if (action === 'approve') {
      newStatus = 'disponible';
    } else if (action === 'reject') {
      newStatus = 'refusé';
    } else {
      return res.status(400).json({ message: "Action invalide (approve/reject)." });
    }

    livreur.status = newStatus;
    await livreur.save();

    return res.status(200).json({ message: `Livreur ${action === 'approve' ? 'validé' : 'refusé'} avec succès.` });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Lister tous les livreurs en attente (pour l'admin)
export const getPendingLivreurs = async (req: Request, res: Response) => {
  try {
    const livreurs = await Livreur.findAll({ where: { status: 'pending' } });
    return res.status(200).json(livreurs);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};