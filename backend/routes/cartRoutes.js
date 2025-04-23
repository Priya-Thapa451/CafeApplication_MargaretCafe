import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controller/cartController.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import { getMenuItems } from "../controller/menuController.js";

const cartRouter = express.Router();

cartRouter.post("/add", tokenVerify, addToCart);
cartRouter.get("/", tokenVerify, getCart);
cartRouter.get("/menu",  getMenuItems);
cartRouter.delete("/remove/:cartItemId", tokenVerify, removeFromCart);
cartRouter.put("/update/:cartItemId", tokenVerify, updateCartItem);

export default cartRouter;