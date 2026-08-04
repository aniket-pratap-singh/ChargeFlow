import Booking from "../models/Booking.js";
import Station from "../models/Station.js";

export const createBooking = async (req, res) => {
  try {

    const {
      station,
      bookingDate,
      startTime,
      endTime,
      vehicleNumber,
      connectorType,
    } = req.body;

    // Basic Validation
    if (
      !station ||
      !bookingDate ||
      !startTime ||
      !endTime ||
      !vehicleNumber ||
      !connectorType
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Check Station Exists
    const selectedStation = await Station.findById(station);

    if (!selectedStation) {
      return res.status(404).json({
        success: false,
        message: "Charging Station not found.",
      });
    }

    // Check Available Ports
    if (selectedStation.availablePorts <= 0) {
      return res.status(400).json({
        success: false,
        message: "No charging ports available.",
      });
    }

    // Estimated Cost
    const estimatedCost = selectedStation.pricePerKwh * 20;

    const totalBookings = await Booking.countDocuments({
      station,
      bookingDate,
      startTime,
      endTime,
      status: {
        $in: ["Booked", "Charging"],
      },
    });

    if (totalBookings >= selectedStation.totalPorts) {
      return res.status(400).json({
        success: false,
        message: "No charging ports available for this time slot.",
      });
    }

    const booking = await Booking.create({

      user: req.user._id,

      station,

      bookingDate,

      startTime,

      endTime,

      vehicleNumber,

      connectorType,

      estimatedCost

    });

    // Reserve one charging port

    return res.status(201).json({

      success: true,

      message: "Booking created successfully.",

      booking

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};

export const getMyBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("station")
      .sort({ bookingDate: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const cancelBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    // Only booking owner can cancel
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    if (booking.status !== "Booked") {
      return res.status(400).json({
        success: false,
        message: "Only booked sessions can be cancelled.",
      });
    }

    booking.status = "Cancelled";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully.",
      booking,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getAllBookings = async (req, res) => {
  try {

    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("station", "name city")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const startCharging = async (req, res) => {
    try{
        const booking = await Booking.findById(req.params.id);

        if(!booking){
            return res.status(404).json({
                success:false,
                message:"Booking not found"
            });
        }

        if(booking.status!=="Booked"){
            return res.status(400).json({
                success:false,
                message:"Charging cannot be started."
            });
        }

        booking.status="Charging";

        await booking.save();

        return res.status(200).json({
            success:true,
            message:"Charging Started",
            booking
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const completeCharging = async (req, res) => {
    try{
        const booking = await Booking.findById(req.params.id);

        if(!booking){
            return res.status(404).json({
                success:false,
                message:"Booking not found"
            });
        }

        if(booking.status!=="Charging"){
            return res.status(400).json({
                success:false,
                message:"Charging session is not active."
            });
        }

        booking.status="Completed";

        await booking.save();

        return res.status(200).json({
            success:true,
            message:"Charging Completed",
            booking
        });
    }

    catch(error){
        console.log(error);

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}