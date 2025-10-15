import { Model, DataTypes, Optional } from 'sequelize';
import sequelize  from '../config/database';
import { UserAttributes } from './order';

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'email' | 'phone' | 'status' | 'language'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email?: string;
  public phone?: string;
  public password_hash!: string;
  public role!: 'client' | 'livreur' | 'vendeur' | 'admin';
  public status!: string;
  public language!: string;

  // Timestamps Sequelize natifs
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('client', 'livreur', 'vendeur', 'admin'),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'active',
    },
    language: {
      type: DataTypes.STRING(10),
      defaultValue: 'fr',
    },
     otp: {
  type: DataTypes.STRING,
  allowNull: false
},
otpVerified: {
  type: DataTypes.BOOLEAN,
  defaultValue: false
}
    // PAS de created_at ici : Sequelize gère createdAt/updatedAt
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true, // Sequelize auto-manage createdAt/updatedAt
  }
);

export default User;