/**
 * Formate un numéro de téléphone en supprimant les espaces, tirets, et en ajoutant l'indicatif pays si nécessaire.
 * Par défaut, ajoute l'indicatif +225 (Côte d'Ivoire) si le numéro commence par 0.
 * Adapte selon ton pays cible !
 */

export const formatPhone = (phone: string, countryCode: string = '+225'): string => {
  if (!phone) return '';
  // Retire espaces, tirets, points, parenthèses
  let clean = phone.replace(/[\s\-\.()]/g, '');

  // Si le numéro commence par '0', on le remplace par l'indicatif pays
  if (clean.startsWith('0')) {
    clean = countryCode + clean.substring(1);
  }

  // Si le numéro commence déjà par '+', on suppose qu'il est au bon format
  if (clean.startsWith('+')) {
    return clean;
  }

  return clean;
};