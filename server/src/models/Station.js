import mongoose from "mongoose";

const stationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    chargerType: {
      type: String,
      enum: ["CCS2", "Type2", "CHAdeMO"],
      required: true,
    },

    totalPorts: {
      type: Number,
      required: true,
    },

    pricePerKwh: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Station = mongoose.model("Station", stationSchema);

export default Station;
