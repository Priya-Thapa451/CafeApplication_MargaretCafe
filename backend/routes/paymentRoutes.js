// routes/paymentRoutes.js
import express from "express";

import { tokenVerify } from "../middleware/tokenVerify.js";
import { getOrderDetails, handleSuccess, initiatePayment } from "../controller/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/initiate", tokenVerify, initiatePayment);
paymentRouter.get("/success", handleSuccess);
paymentRouter.get("/order-details", getOrderDetails); // <-- new endpoint

export default paymentRouter;