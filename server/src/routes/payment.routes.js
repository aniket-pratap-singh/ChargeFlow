import express from "express";

import {protect} from "../middleware/auth.middleware.js";

import {createOrder, verifyPayment, getMyPayments} from "../controllers/payment.controller.js";

const router=express.Router();

// Create a new payment order
router.post(
    "/create-order",
    protect,
    createOrder
);

// Verify payment
router.post(
    "/verify",
    protect,
    verifyPayment
);

// Get myPayments for the logged-in user
router.get(
    "/my",
    protect,
    getMyPayments
);

export default router;