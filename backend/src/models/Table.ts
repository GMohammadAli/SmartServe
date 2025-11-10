import { HydratedDocument, model, Schema, Types } from "mongoose";

//Important Learning ->
//In the official Mongoose documentation they recommend everyone to setup the interface and
// then use it as a generic when you create the Schema
//we lose IntelliSense for Mongo db methods when we just use types

export interface ITable {
  tableId: Types.ObjectId;
  tableNumber: string;
  restaurantId?: Types.ObjectId; //future use case for multi tenancy of restaurants
  activeOrderId?: string;
  orderHistory?: Types.ObjectId[]; //contains order ids of order completed on the table
}

//Adds IntelliSense for Mongo db methods
export type TableDocument = HydratedDocument<ITable>;

const tableSchema = new Schema<ITable>(
  {
    tableNumber: { type: String, required: true },
    restaurantId: String, //no restaurant table as of now
    activeOrderId: { type: Schema.Types.ObjectId, ref: "Order" },
    orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

export const Table = model<ITable>("Table", tableSchema);

//07/11/2025 Tasks ->
// 1] Implement all three different models with their mongoose schemas -> Order, MenuItem, Table
// https://mongoosejs.com/docs/typescript.html
// 2] implement /api/menu
