import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

const Booking = () => {

    const navigate = useNavigate();

    const { stationId } = useParams();

    const [formData, setFormData] = useState({
        bookingDate: "",
        startTime: "",
        endTime: "",
        vehicleNumber: "",
        connectorType: "CCS2"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateBooking = () => {

        if (!formData.bookingDate) {
            alert("Please select a booking date.");
            return false;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selectedDate = new Date(formData.bookingDate);

        if (selectedDate < today) {
            alert("Booking date cannot be in the past.");
            return false;
        }

        if (!formData.startTime || !formData.endTime) {
            alert("Please select both start and end time.");
            return false;
        }

        const start = new Date(`2000-01-01T${formData.startTime}`);
        const end = new Date(`2000-01-01T${formData.endTime}`);

        if (start >= end) {
            alert("End time must be later than start time.");
            return false;
        }

        const duration =
            (end - start) / (1000 * 60 * 60);

        if (duration > 24) {
            alert("Booking duration cannot exceed 24 hours.");
            return false;
        }

        return true;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!validateBooking()) return;

        try {

            const response = await api.post(
                "/bookings",
                {
                    station: stationId,
                    ...formData
                }
            );

            alert("Booking Created Successfully!");

            navigate(`/payment/${response.data.booking._id}`);

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Booking Failed"
            );

        }

    };

    return (

        <div className="min-h-screen bg-slate-50">

            {/* Hero */}

            <div className="bg-[#0F172A] text-white py-14">

                <div className="max-w-5xl mx-auto px-6">

                    <h1 className="text-5xl font-bold">

                        Book Charging Slot

                    </h1>

                    <p className="text-gray-300 mt-3 text-lg">

                        Select your preferred charging date and time.

                    </p>

                </div>

            </div>

            {/* Booking Card */}

            <div className="max-w-3xl mx-auto px-6 py-12">

                <div className="bg-white rounded-2xl shadow-xl p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        <div>

                            <label className="block text-gray-700 font-semibold mb-2">

                                Booking Date

                            </label>

                            <input
                                type="date"
                                name="bookingDate"
                                value={formData.bookingDate}
                                onChange={handleChange}
                                min={new Date().toISOString().split("T")[0]}
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>

                                <label className="block text-gray-700 font-semibold mb-2">

                                    Start Time

                                </label>

                                <input
                                    type="time"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />

                            </div>

                            <div>

                                <label className="block text-gray-700 font-semibold mb-2">

                                    End Time

                                </label>

                                <input
                                    type="time"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="block text-gray-700 font-semibold mb-2">

                                Vehicle Number

                            </label>

                            <input
                                type="text"
                                name="vehicleNumber"
                                placeholder="e.g. HR26AB1234"
                                value={formData.vehicleNumber}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                        </div>

                        <div>

                            <label className="block text-gray-700 font-semibold mb-2">

                                Connector Type

                            </label>

                            <select
                                name="connectorType"
                                value={formData.connectorType}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >

                                <option value="CCS2">CCS2</option>

                                <option value="Type2">Type2</option>

                                <option value="CHAdeMO">CHAdeMO</option>

                            </select>

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold text-lg py-4 rounded-xl transition duration-300"
                        >

                            Confirm Booking ⚡

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default Booking;