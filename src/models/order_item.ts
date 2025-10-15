import { Model, DataTypes, Optional } from 'sequelize';
import  sequelize  from '../config/database';
import Order from './order';
import Meal from './meal';

export interface OrderItemAttributes {
  id: number;
  order_id: number;
  meal_id: number;
  quantity: number;
  price: number;
}

export interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id'> {}

class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  public id!: number;
  public order_id!: number;
  public meal_id!: number;
  public quantity!: number;
  public price!: number;

  // Timestamps Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderItem.init(
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
    meal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Meal, key: 'id' },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    // Pas besoin de created_at ni updated_at ici
  },
  {
    sequelize,
    tableName: 'order_items',
    timestamps: true, // Sequelize auto-manage createdAt/updatedAt
  }
);

export default OrderItem;