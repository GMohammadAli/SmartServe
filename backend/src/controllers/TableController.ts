import { Request, Response } from "express";
import {
  MenuItemDocument,
  MenuItem as MenuItemModel,
} from "../models/MenuItem";
import { Order as OrderModel, OrderDocument, IOrder } from "../models/Order";
import { Types } from "mongoose";

const getMenuItems = async (_req: Request, res: Response) => {
  try {
    const menuItems: MenuItemDocument[] = await MenuItemModel.find({});
    // console.log({ menuItems });
    return res.status(200).json({
      success: true,
      data: menuItems,
    });
  } catch (error) {
    console.error("Error while fetching menu items ", error);
    return res.status(500).json({
      success: false,
      data: [],
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const orders: OrderDocument[] = await OrderModel.find({});
    // console.log({ orders });
    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error while fetching orders ", error);
    return res.status(500).json({
      success: false,
      data: [],
    });
  }
};

const createOrders = async (req: Request, res: Response) => {
  try {
    const reqBody: IOrder = req.body;
    const createdOrder: OrderDocument = new OrderModel({ ...reqBody });
    await createdOrder.save();
    return res.status(200).json({
      success: true,
      data: createdOrder,
    });
  } catch (error) {
    console.error("Error while creating orders ", error);
    return res.status(500).json({
      success: false,
      data: null,
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    // Validate ObjectId
    if (!Types.ObjectId.isValid(orderId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order ID" });
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error while updating the order status ", error);
    return res.status(500).json({
      success: false,
      message: "Order status not updated",
    });
  }
};

export default {
  getMenuItems,
  getOrders,
  createOrders,
  updateOrderStatus,
};
