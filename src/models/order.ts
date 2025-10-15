import { Model, DataTypes, Optional } from 'sequelize';
import  sequelize  from '../config/database';
import User from './user';
import Restaurant from './restaurant';
import Livreur from './livreur';

export interface OrderAttributes {
  id: number;
  client_id: number;
  restaurant_id: number;
  livreur_id?: number;
  status: 'en_attente' | 'acceptee' | 'en_livraison' | 'livree' | 'annulee';
  total: number;
  delivery_address: string;
  delivery_latitude?: number;
  delivery_longitude?: number;
  payment_method?: string;
  paid: boolean;
  reference: string;
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'livreur_id' | 'delivery_latitude' | 'delivery_longitude' | 'payment_method'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public client_id!: number;
  public restaurant_id!: number;
  public livreur_id?: number;
  public status!: 'en_attente' | 'acceptee' | 'en_livraison' | 'livree' | 'annulee';
  public total!: number;
  public delivery_address!: string;
  public delivery_latitude?: number;
  public delivery_longitude?: number;
  public payment_method?: string;
  public paid!: boolean;
  public reference!: string;

  // Timestamps Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
     type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: 'id' },
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Restaurant, key: 'id' },
    },
    livreur_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Livreur, key: 'id' },
    },
    status: {
      type: DataTypes.ENUM('en_attente', 'acceptee', 'en_livraison', 'livree', 'annulee'),
      defaultValue: 'en_attente',
    },
    total: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    delivery_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    delivery_latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    delivery_longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    payment_method: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    reference: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
},
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // Pas besoin de created_at/updated_at ici
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true, // Sequelize auto-manage createdAt/updatedAt
  }
);

export default Order;
export interface UserAttributes {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  password_hash: string;
  role: 'client' | 'livreur' | 'vendeur' | 'admin';
  status: string;
  language: string;
  otp?: string;
  otpVerified?: boolean;
}
