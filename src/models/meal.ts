import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import Restaurant from './restaurant';

export interface MealAttributes {
  id: number;
  restaurant_id: number;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  is_available: boolean;
}

export interface MealCreationAttributes extends Optional<MealAttributes, 'id' | 'description' | 'image_url'> {}

class Meal extends Model<MealAttributes, MealCreationAttributes> implements MealAttributes {
  public id!: number;
  public restaurant_id!: number;
  public name!: string;
  public description?: string;
  public price!: number;
  public image_url?: string;
  public is_available!: boolean;

  // Timestamps Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Meal.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurant_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: Restaurant, key: 'id' },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    // Pas besoin de created_at ici
  },
  {
    sequelize,
    tableName: 'meals',
    timestamps: true, // Sequelize auto-manage createdAt/updatedAt
  }
);

export default Meal;