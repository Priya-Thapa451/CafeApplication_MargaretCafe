import express from "express";

import { tokenVerify } from "../middleware/tokenVerify.js";
import { placeOrder } from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", tokenVerify, placeOrder);


export default orderRouter;