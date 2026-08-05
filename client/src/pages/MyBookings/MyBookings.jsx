import { useEffect, useState } from "react";
import api from "../../services/api";
import BookingCard from "../../components/BookingCard/BookingCard";

const MyBookings = () => {

    const [bookings, setBookings] = useState([]);

    // Fetch all bookings
    const fetchBookings = async () => {
        try {

            const response = await api.get("/bookings/my");

            setBookings(response.data.bookings);

        } catch (error) {

            console.log(error);

        }
    };

    // Runs once when page loads
    useEffect(() => {
        fetchBookings();
    }, []);

    // Cancel booking
    const handleCancel = async (id) => {

        try {

            const response = await api.put(`/bookings/${id}/cancel`);

            alert(response.data.message);

            // Refresh bookings after cancellation
            fetchBookings();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Unable to cancel booking."
            );

        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8 text-center">
                My Bookings
            </h1>

            {
                bookings.length === 0 ?
                (
                    <h2 className="text-center text-gray-500">
                        No bookings found.
                    </h2>
                )
                :
                (
                    bookings.map((booking) => (
                        <BookingCard
                            key={booking._id}
                            booking={booking}
                            onCancel={handleCancel}
                        />
                    ))
                )
            }
        </div>
    );
};

export default MyBookings;