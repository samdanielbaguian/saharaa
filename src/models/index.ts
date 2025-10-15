import User from './user';
import Restaurant from './restaurant';
import Livreur from './livreur';
import Meal from './meal';
import Order from './order';
import OrderItem from './order_item';
import Rating from './rating';
import Payment from './payment';
import Notification from './notification';

// USER associations
User.hasMany(Restaurant, { foreignKey: 'user_id', as: 'restaurants' });
Restaurant.belongsTo(User, { foreignKey: 'user_id', as: 'owner' });

User.hasMany(Livreur, { foreignKey: 'user_id', as: 'livreurProfile' });
Livreur.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Order, { foreignKey: 'client_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'client_id', as: 'client' });

User.hasMany(Rating, { foreignKey: 'client_id', as: 'ratingsGiven' });
Rating.belongsTo(User, { foreignKey: 'client_id', as: 'client' });

User.hasMany(Notification, { foreignKey: 'user_id', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// RESTAURANT associations
Restaurant.hasMany(Meal, { foreignKey: 'restaurant_id', as: 'meals' });
Meal.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });

Restaurant.hasMany(Order, { foreignKey: 'restaurant_id', as: 'orders' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });

// LIVREUR associations
Livreur.hasMany(Order, { foreignKey: 'livreur_id', as: 'deliveries' });
Order.belongsTo(Livreur, { foreignKey: 'livreur_id', as: 'livreur' });

Livreur.hasMany(Rating, { foreignKey: 'livreur_id', as: 'ratings' });
Rating.belongsTo(Livreur, { foreignKey: 'livreur_id', as: 'livreur' });

// ORDER & MEAL associations
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

Meal.hasMany(OrderItem, { foreignKey: 'meal_id', as: 'orderItems' });
OrderItem.belongsTo(Meal, { foreignKey: 'meal_id', as: 'meal' });

// ORDER & PAYMENT associations
Order.hasMany(Payment, { foreignKey: 'order_id', as: 'payment' });
Payment.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

// ORDER & RATING associations
Order.hasMany(Rating, { foreignKey: 'order_id', as: 'rating' });
Rating.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

// Export all models for use in other files
export {
  User,
  Restaurant,
  Livreur,
  Meal,
  Order,
  OrderItem,
  Rating,
  Payment,
  Notification
};