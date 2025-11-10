import { z } from "zod";
import { Types } from "mongoose";
import { OrderStatus } from "../models/Order";

// ✅ Validate Mongo ObjectId
export const objectIdSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

// ✅ Zod schema for OrderItem
export const orderItemZodSchema = z.object({
  menuItemId: objectIdSchema,
  label: z.string().min(1),
  priceAtOrder: z.number().positive(),
  quantity: z.number().int().min(1),
});

// ✅ Zod schema for Creating an Order
export const createOrderSchema = z.object({
  tableNumber: z.string().min(1),
  items: z.array(orderItemZodSchema).nonempty(),
  billAmount: z.number().positive(),
  status: z.enum(OrderStatus).optional(),
});
