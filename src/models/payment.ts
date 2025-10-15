import { Model, DataTypes, Optional } from 'sequelize';
import  sequelize  from '../config/database';
import Order from './order';

export interface PaymentAttributes {
  id: number;
  order_id: number;
  amount: number;
  payment_method?: string;
  payment_status: string;
  transaction_id?: string;
}

export interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id' | 'payment_method' | 'transaction_id'> {}

class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: number;
  public order_id!: number;
  public amount!: number;
  public payment_method?: string;
  public payment_status!: string;
  public transaction_id?: string;

  // Timestamps Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Order, key: 'id' },
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    payment_status: {
      type: DataTypes.STRING(20),
      defaultValue: 'pending',
    },
    transaction_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    // Pas besoin de created_at ici, Sequelize gère les timestamps natifs
  },
  {
    sequelize,
    tableName: 'payments',
    timestamps: true, // Sequelize auto-manage createdAt/updatedAt
  }
);

export default Payment;