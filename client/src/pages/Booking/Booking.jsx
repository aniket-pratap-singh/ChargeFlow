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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                "/bookings",
                {
                    station: stationId,
                    ...formData
                }
            );
            alert("Booking Created!");
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
        <div>
            <h1>Book Charging Slot</h1>
            
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    name="bookingDate"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="time"
                    name="startTime"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="time"
                    name="endTime"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="vehicleNumber"
                    placeholder="Vehicle Number"
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="connectorType"
                    onChange={handleChange}
                >

                    <option>CCS2</option>

                    <option>Type2</option>

                    <option>CHAdeMO</option>

                </select>

                <br /><br />

                <button type="submit">

                    Book Slot

                </button>

            </form>

        </div>

    );

};

export default Booking;