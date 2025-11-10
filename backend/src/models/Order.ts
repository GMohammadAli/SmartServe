import { Schema, model, Types, HydratedDocument } from "mongoose";

export enum OrderStatus {
  Pending = "PENDING",
  Served = "SERVED",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED",
}

export interface IOrderItem {
  menuItemId: Types.ObjectId; // reference to MenuItem
  label: string;
  priceAtOrder: number;
  quantity: number;
}

export interface IOrder {
  tableNumber: string;
  items: IOrderItem[];
  billAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export type OrderDocument = HydratedDocument<IOrder>;

// Define subDocument schema for order items
const orderItemSchema = new Schema<IOrderItem>(
  {
    menuItemId: {
      type: Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    label: { type: String, required: true },
    priceAtOrder: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false } // no individual _id for subDocs
);

// Main order schema
const orderSchema = new Schema<IOrder>(
  {
    tableNumber: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
    billAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Pending,
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);
