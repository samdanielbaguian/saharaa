import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import Order from './order';
import Livreur from './livreur';
import User from './user';

export interface RatingAttributes {
  id: number;
  order_id: number;
  livreur_id: number;
  client_id: number;
  rating: number;
  comment?: string;
}

export interface RatingCreationAttributes extends Optional<RatingAttributes, 'id' | 'comment'> {}

class Rating extends Model<RatingAttributes, RatingCreationAttributes> implements RatingAttributes {
  public id!: number;
  public order_id!: number;
  public livreur_id!: number;
  public client_id!: number;
  public rating!: number;
  public comment?: string;

  // Timestamps Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: Order, key: 'id' },
    },
    livreur_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: Livreur, key: 'id' },
    },
    client_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: User, key: 'id' },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Pas besoin de created_at ici, Sequelize gère les timestamps natifs
  },
  {
    sequelize,
    tableName: 'ratings',
    timestamps: true, // Sequelize auto-manage createdAt/updatedAt
  }
);

export default Rating;