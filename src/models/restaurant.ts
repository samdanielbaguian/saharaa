import { Model, DataTypes, Optional } from 'sequelize';
import  sequelize  from '../config/database';
import User from './user';

export interface RestaurantAttributes {
  id: number;
  user_id: number;
  name: string;
  address: string;
  city?: string;
  country: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  is_active: boolean;
  // Les timestamps seront ajoutés automatiquement par Sequelize
}

export interface RestaurantCreationAttributes extends Optional<RestaurantAttributes, 'id' | 'city' | 'country' | 'latitude' | 'longitude' | 'description'> {}

class Restaurant extends Model<RestaurantAttributes, RestaurantCreationAttributes> implements RestaurantAttributes {
  public id!: number;
  public user_id!: number;
  public name!: string;
  public address!: string;
  public city?: string;
  public country!: string;
  public latitude?: number;
  public longitude?: number;
  public description?: string;
  public is_active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: 'id' },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(50),
      defaultValue: "Afrique de l'Ouest",
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    // Ne pas déclarer createdAt/updatedAt ici, Sequelize les gère via timestamps: true
  },
  {
    sequelize,
    tableName: 'restaurants',
    timestamps: true, // active createdAt/updatedAt
  }
);

export default Restaurant;