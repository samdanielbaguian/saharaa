import { Model, DataTypes, Optional } from 'sequelize';
import  sequelize  from '../config/database';
import User from './user';

export interface NotificationAttributes {
  id: number;
  user_id: number;
  message: string;
  type?: string; // push, sms, email
  is_read: boolean;
}

export interface NotificationCreationAttributes extends Optional<NotificationAttributes, 'id' | 'type'> {}

class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  public id!: number;
  public user_id!: number;
  public message!: string;
  public type?: string;
  public is_read!: boolean;

  // Timestamps Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notification.init(
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
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "push, sms, email",
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // On retire created_at, Sequelize gère les timestamps natifs
  },
  {
    sequelize,
    tableName: 'notifications',
    timestamps: true, // Sequelize auto-manage createdAt/updatedAt
  }
);


export default Notification;
