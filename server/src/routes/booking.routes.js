import express from "express";

import { protect, adminOnly } from "../middleware/auth.middleware.js";

import { createBooking, getMyBookings, cancelBooking, getAllBookings, startCharging, completeCharging} from "../controllers/booking.controller.js";

const router = express.Router();

// Create a new booking
router.post(
  "/",
  protect,
  createBooking
);

// Get myBookings for the logged-in user
router.get(
  "/my",
  protect,
  getMyBookings
);

// Cancel a booking
router.put(
  "/:id/cancel",
  protect,
  cancelBooking
);

// Admin - See all bookings
router.get(
  "/",
  protect,
  adminOnly,
  getAllBookings
);

// Admin - Start charging for a booking
router.put(
  "/:id/start",
  protect,
  adminOnly,
  startCharging
);

// Admin - Complete charging for a booking
router.put(
  "/:id/complete",
  protect,
  adminOnly,
  completeCharging
);

export default router;