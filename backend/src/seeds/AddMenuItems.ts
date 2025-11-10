import { MenuItem as MenuItemModel } from "../models/MenuItem";
import { Request, Response } from "express";
import dummyMenuItems from "./data/menuItems.json";

const addMenuItemsFromDummyFile = async (_req: Request, res: Response) => {
  try {
    const menuItems = await MenuItemModel.insertMany(dummyMenuItems);
    return res.status(200).json({
      success: true,
      data: menuItems,
    });
  } catch (error) {
    console.error("Error while creating menu items from seed ", error);
    return res.status(500).json({
      success: false,
      data: [],
    });
  }
};

export default {
  addMenuItemsFromDummyFile,
};
