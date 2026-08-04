import mongoose from "mongoose";
import Station from "../models/Station.js";

export const createStation = async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      latitude,
      longitude,
      chargerType,
      totalPorts,
      pricePerKwh,
    } = req.body;

    // Basic Validation
    if (
      !name ||
      !address ||
      !city ||
      latitude === undefined ||
      longitude === undefined ||
      !chargerType ||
      totalPorts === undefined ||
      pricePerKwh === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const station = await Station.create({
      name,
      address,
      city,
      latitude,
      longitude,
      chargerType,
      totalPorts,
      pricePerKwh,
    });

    return res.status(201).json({
      success: true,
      message: "Charging Station Created Successfully.",
      station,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getAllStations = async (req, res) => {
  try {
    const stations = await Station.find();

    return res.status(200).json({
      success: true,
      count: stations.length,
      stations,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getStationById = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Station ID."
        });
    }

    const station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({
        success: false,
        message: "Charging Station not found."
      });
    }

    return res.status(200).json({
      success: true,
      station
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const updateStation = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Station ID."
      });
    }

    const station = await Station.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!station) {
      return res.status(404).json({
        success: false,
        message: "Charging Station not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Station updated successfully.",
      station
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const deleteStation = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Station ID."
      });
    }

    const station = await Station.findByIdAndDelete(id);

    if (!station) {
      return res.status(404).json({
        success: false,
        message: "Charging Station not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Charging Station deleted successfully."
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};