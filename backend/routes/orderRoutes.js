import express from "express";

import { tokenVerify } from "../middleware/tokenVerify.js";
import { getAllOrders, getCustomerOrders, placeOrder ,updateOrderStatus} from "../controller/orderController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/place", tokenVerify, placeOrder);
orderRouter.get("/orders", authenticateAdmin, getAllOrders); // Admin
orderRouter.put(
  "/orders/:orderId/status",
  authenticateAdmin,
  updateOrderStatus
);
orderRouter.get("/my-orders", tokenVerify, getCustomerOrders);

export default orderRouter;