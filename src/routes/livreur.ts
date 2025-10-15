import { Router } from 'express';
import { registerLivreur, validateLivreur, getPendingLivreurs } from '../controllers/livreurController';
import upload from '../middleware/upload';
import { requireAuth, requireAdmin } from '../middleware/auth';

const router = Router();

// Inscription livreur (upload recto/verso)
router.post(
  '/register',
  upload.fields([
    { name: 'identity_doc_recto', maxCount: 1 },
    { name: 'identity_doc_verso', maxCount: 1 }
  ]),
  registerLivreur
);

// Liste des livreurs en attente (réservé à l’admin)
router.get('/pending', requireAuth, requireAdmin, getPendingLivreurs);

// Validation/refus d’un livreur (réservé à l’admin)
router.patch('/:id/validate', requireAuth, requireAdmin, validateLivreur);

export default router;