import Rating from '../models/rating';

// Ajouter un avis
export const addRating = async (
  userId: number,
  restaurantId: number,
  score: number,
  comment?: string
): Promise<Rating> => {
  return await Rating.create({
    userId,
    restaurantId,
    score,
    comment
  });
};

// Mettre à jour un avis
export const updateRating = async (
  ratingId: number,
  score?: number,
  comment?: string
): Promise<[number, Rating[]]> => {
  return await Rating.update(
    { score, comment },
    { where: { id: ratingId }, returning: true }
  );
};

// Supprimer un avis
export const deleteRating = async (
  ratingId: number
): Promise<number> => {
  return await Rating.destroy({ where: { id: ratingId } });
};

// Récupérer la moyenne des notes d'un restaurant
export const getAverageRating = async (
  restaurantId: number
): Promise<number> => {
  const ratings = await Rating.findAll({ where: { restaurantId } });
  if (ratings.length === 0) return 0;
  const total = ratings.reduce((acc, curr) => acc + curr.score, 0);
  return total / ratings.length;
};

// Récupérer toutes les notes d'un restaurant
export const getRatingsForRestaurant = async (
  restaurantId: number
): Promise<Rating[]> => {
  return await Rating.findAll({ where: { restaurantId } });
};