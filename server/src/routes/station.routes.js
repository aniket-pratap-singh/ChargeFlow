import express from "express";

import { 
    createStation, getAllStations, getStationById, updateStation, deleteStation 
    } from "../controllers/station.controller.js";

import {
  protect,
  adminOnly,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Create a new charging station
router.post(
  "/",
  protect,
  adminOnly,
  createStation
);

// Get all charging stations
router.get(
    "/",
    getAllStations
);

// Get a charging station by ID
router.get(
    "/:id",
    getStationById
);

// Update a charging station by ID
router.put(
    "/:id",
    protect,
    adminOnly,
    updateStation
);

// Delete a charging station by ID
router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteStation
);

export default router;