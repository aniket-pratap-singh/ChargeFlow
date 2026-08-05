import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import stationRoutes from "./routes/station.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://charge-flow-gules.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

// Check profile route
app.use("/api/user", userRoutes);

// Station routes
app.use("/api/stations", stationRoutes);

// User Register/Login routes
app.use("/api/auth", authRoutes);

// Booking routes
app.use("/api/bookings", bookingRoutes);

// Payment routes
app.use("/api/payments",paymentRoutes);

export default app;