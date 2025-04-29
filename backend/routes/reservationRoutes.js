import express from "express";
import { cancelReservation, createReservation, getUserReservations } from "../controller/reservationController.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const reservationRouter = express.Router();

// Protect the routes with the authenticateUser middleware
reservationRouter.post("/create", tokenVerify, createReservation); // Book a reservation (requires authentication)
reservationRouter.put("/:id/cancel", tokenVerify, cancelReservation); // Cancel a reservation (requires authentication)
reservationRouter.get("/get", tokenVerify, getUserReservations); // Get user's reservations

export default reservationRouter;