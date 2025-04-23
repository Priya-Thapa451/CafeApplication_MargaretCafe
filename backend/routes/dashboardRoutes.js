import express from "express";
import { authenticateAdmin } from "../middleware/authMiddleware.js";
import { getDashboardStats } from "../controller/dashboardController.js";


const dashboardRouter = express.Router();

dashboardRouter.get("/stat", authenticateAdmin, getDashboardStats);

export default dashboardRouter;