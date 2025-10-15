import { Request, Response, NextFunction } from 'express';

/**
 * Middleware global de gestion des erreurs.
 * À placer après toutes les routes dans app.ts.
 */
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log complet en dev, minimal en prod
  if (process.env.NODE_ENV !== 'production') {
    console.error('Erreur:', err);
  }

  // Code d'erreur
  const status = err.status || 500;
  const message = err.message || 'Erreur interne du serveur';

  res.status(status).json({
    message,
    // Ne jamais exposer l'erreur complète en prod !
    error: process.env.NODE_ENV === 'production' ? undefined : err,
  });
}