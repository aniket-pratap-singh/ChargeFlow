import { Link } from "react-router-dom";

import {
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaClock,
    FaCar,
    FaPlug,
    FaMoneyBillWave
} from "react-icons/fa";

const BookingCard = ({ booking, onCancel }) => {

    return (

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border">

            <h2 className="text-2xl font-bold text-blue-600">
                {booking.station.name}
            </h2>

            <p className="flex items-center gap-2 text-gray-600 mt-2">
                <FaMapMarkerAlt />
                {booking.station.city}
            </p>

            <hr className="my-4"/>

            <div className="space-y-2">

                <p className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <strong>Date :</strong>
                    {new Date(
                        booking.bookingDate
                    ).toLocaleDateString()}
                </p>

                <p className="flex items-center gap-2">
                    <FaClock />
                    <strong>Time :</strong>
                    {booking.startTime} - {booking.endTime}
                </p>

                <p className="flex items-center gap-2">
                    <FaCar />
                    <strong>Vehicle :</strong>
                    {booking.vehicleNumber}
                </p>

                <p className="flex items-center gap-2">
                    <FaPlug />
                    <strong>Connector :</strong>
                    {booking.connectorType}
                </p>

                <p className="flex items-center gap-2">
                    <FaMoneyBillWave />
                    <strong>Estimated Cost :</strong>
                    ₹{booking.estimatedCost}
                </p>

            </div>

            <div className="flex gap-4 mt-5">
                <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                        booking.status === "Booked"
                            ? "bg-blue-600"
                            : booking.status === "Cancelled"
                            ? "bg-red-600"
                            : booking.status === "Charging"
                            ? "bg-yellow-500"
                            : "bg-green-600"
                    }`}
                >
                    {booking.status}
                </span>
                <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                        booking.paymentStatus === "Paid"
                            ? "bg-green-600"
                            : "bg-orange-500"
                    }`}
                >
                    {booking.paymentStatus}
                </span>
            </div>

            {
                <div className="flex gap-4 mt-8">
                    {
                        booking.paymentStatus === "Pending" &&
                        booking.status === "Booked" && (
                            <Link
                                to={`/payment/${booking._id}`}
                            >
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                                >
                                    💳 Pay Now
                                </button>
                            </Link>
                        )
                    }
                    {
                        booking.status === "Booked" && (
                            <button
                                onClick={() => onCancel(booking._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                            >
                                Cancel Booking
                            </button>
                        )
                    }
                </div>
            }

        </div>

    );

};

export default BookingCard;