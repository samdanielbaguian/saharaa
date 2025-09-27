import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';

export interface LivreurAttributes {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  locality: string;
  identity_doc_recto_url: string;
  identity_doc_verso_url: string;
  status: string;
  rating: number;
  total_deliveries: number;
  last_latitude?: number;
  last_longitude?: number;
  last_update?: Date;
  zone?: string;
}

export interface LivreurCreationAttributes extends Optional<LivreurAttributes, 'id' | 'last_latitude' | 'last_longitude' | 'last_update' | 'zone'> {}

class Livreur extends Model<LivreurAttributes, LivreurCreationAttributes> implements LivreurAttributes {
  public id!: number;
  public user_id!: number;
  public first_name!: string;
  public last_name!: string;
  public phone!: string;
  public email!: string;
  public locality!: string;
  public identity_doc_recto_url!: string;
  public identity_doc_verso_url!: string;
  public status!: string;
  public rating!: number;
  public total_deliveries!: number;
  public last_latitude?: number;
  public last_longitude?: number;
  public last_update?: Date;
  public zone?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Livreur.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: User, key: 'id' },
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    locality: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    identity_doc_recto_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    identity_doc_verso_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'pending',
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 5,
    },
    total_deliveries: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    last_latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    last_longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    zone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    // Pas besoin de created_at ici, Sequelize gère createdAt/updatedAt
  },
  {
    sequelize,
    tableName: 'livreurs',
    timestamps: true, // Sequelize auto-manage createdAt/updatedAt
  }
);

export default Livreur;