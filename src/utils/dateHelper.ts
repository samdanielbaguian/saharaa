/**
 * Fonctions utilitaires pour manipuler les dates.
 */

// Ajouter des jours à une date
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Formater une date au format YYYY-MM-DD
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Comparer deux dates (retourne -1, 0, 1)
export const compareDates = (date1: Date, date2: Date): number => {
  const d1 = date1.getTime();
  const d2 = date2.getTime();
  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
};

// Obtenir la date actuelle au format ISO
export const getCurrentDateISO = (): string => {
  return new Date().toISOString();
};