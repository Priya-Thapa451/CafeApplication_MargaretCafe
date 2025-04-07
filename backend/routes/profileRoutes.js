import express from "express";
import {
  getCustomerProfile,
  getProfile,
  createProfile,
  updateProfile,
} from "../controller/profileController.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import { getCustomerAddress, updateCustomerAddress } from "../controller/customerController.js";

const profileRouter = express.Router();

profileRouter.get("/getprofile", tokenVerify, getCustomerProfile);
profileRouter.get("/profile", tokenVerify, getProfile);
profileRouter.post("/profile", tokenVerify, createProfile);
profileRouter.put("/profile", tokenVerify, updateProfile);
profileRouter.get("/address", tokenVerify, getCustomerAddress);
profileRouter.put("/address/update", tokenVerify, updateCustomerAddress);


export default profileRouter;