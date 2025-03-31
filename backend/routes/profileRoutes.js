import express from "express";
import {
  getCustomerProfile,
  getProfile,
  createProfile,
  updateProfile,
} from "../controller/profileController.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const profileRouter = express.Router();

profileRouter.get("/getprofile", tokenVerify, getCustomerProfile);
profileRouter.get("/profile", tokenVerify, getProfile);
profileRouter.post("/profile", tokenVerify, createProfile);
profileRouter.put("/profile", tokenVerify, updateProfile);

export default profileRouter;