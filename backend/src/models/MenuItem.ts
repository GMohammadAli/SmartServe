import { Schema, model, HydratedDocument } from "mongoose";

export enum CuisineType {
  Chinese = "CHINESE",
  Korean = "KOREAN",
  Punjabi = "PUNJABI",
  SouthIndian = "SOUTH INDIAN",
}

export interface IMenuItem {
  label: string;
  cuisine: CuisineType;
  ingredients: string[];
  price: number;
  availabilityInStock: number;
  createdAt: Date;
  updatedAt?: Date;
}

export type MenuItemDocument = HydratedDocument<IMenuItem>;

const menuItemSchema = new Schema<IMenuItem>(
  {
    label: { type: String, required: true },
    cuisine: {
      type: String,
      enum: Object.values(CuisineType), // <-- handles the enum
      required: true,
    },
    ingredients: [{ type: String }],
    price: { type: Number, required: true },
    availabilityInStock: { type: Number, default: 0 },
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

export const MenuItem = model<IMenuItem>("MenuItem", menuItemSchema);
