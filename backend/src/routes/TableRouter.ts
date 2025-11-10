import { Router } from "express";
import TableController from "../controllers/TableController";
import { validate } from "../middlewares/Validator";
import { createOrderSchema } from "../zodSchemas/OrderSchemas";
import addMenuItems from "../seeds/AddMenuItems";

const router = Router();

router.get("/menu", TableController.getMenuItems);
router
  .route("/orders")
  .get(TableController.getOrders)
  .post(validate(createOrderSchema), TableController.createOrders);

router.put("/orders/:id/status", TableController.updateOrderStatus);

router.post("/menu/insert-dummy", addMenuItems.addMenuItemsFromDummyFile);

export default router;
