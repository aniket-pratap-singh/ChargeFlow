import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    station: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Station",
      required: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    connectorType: {
      type: String,
      enum: ["CCS2", "Type2", "CHAdeMO"],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Booked",
        "Charging",
        "Completed",
        "Cancelled"
      ],
      default: "Booked",
    },

    estimatedCost: {
      type: Number,
      default: 0,
    },
    
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;