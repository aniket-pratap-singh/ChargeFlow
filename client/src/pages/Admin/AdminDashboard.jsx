import api from "../../services/api";
import { useEffect, useState } from "react";
import AddStationModal from "../../components/Admin/AddStationModal";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

    const [stations, setStations] = useState([]);
    const [bookings, setBookings] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [editingStation, setEditingStation] = useState(null);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const fetchDashboard = async () => {

        try {

            const stationResponse =
                await api.get("/stations");

            const bookingResponse =
                await api.get("/bookings");

            // Fallback to [] if the API ever returns an unexpected shape —
            // prevents setStations/setBookings(undefined) from crashing .map()/.length below
            setStations(stationResponse.data.stations || []);
            setBookings(bookingResponse.data.bookings || []);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchDashboard();

    }, []);

    const handleDeleteStation = async (id) => {

        if (!window.confirm("Delete this station?")) return;

        try {

            await api.delete(`/stations/${id}`);

            fetchDashboard();

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleStartCharging = async(id)=>{
        try{
            await api.put(
                `/bookings/${id}/start`
            );
            fetchDashboard();
        }
        catch(error){
            console.log(error);
        }
    };

    const handleCompleteCharging = async(id)=>{
        try{
            await api.put(
                `/bookings/${id}/complete`
            );
            fetchDashboard();
        }
        catch(error){
            console.log(error);
        }
    };

    return (

        <div className="max-w-7xl mx-auto p-8">

            <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold">
                        Admin Dashboard
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition"
                    >
                        Logout
                    </button>

                </div>

            <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="bg-blue-500 text-white p-6 rounded-xl">
                    <h2>Total Stations</h2>
                    <h1 className="text-4xl mt-2">
                        {stations.length}
                    </h1>
                </div>

                <div className="bg-green-500 text-white p-6 rounded-xl">
                    <h2>Total Bookings</h2>
                    <h1 className="text-4xl mt-2">
                        {bookings.length}
                    </h1>
                </div>

                <div className="bg-yellow-500 text-white p-6 rounded-xl">
                    <h2>Revenue</h2>
                    <h1 className="text-4xl mt-2">
                        ₹{
                            bookings.reduce(
                                (sum, booking) =>
                                    booking.paymentStatus === "Paid"
                                        ? sum + (booking.estimatedCost || 0)
                                        : sum,
                                0
                            )
                        }
                    </h1>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-3xl font-bold">
                        Charging Stations
                    </h2>
                    <button
                        onClick={() => {
                            setEditingStation(null);
                            setShowModal(true);
                        }}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg"
                    >
                        + Add Station
                    </button>
                </div>

                <table className="w-full border shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Name</th>
                            <th>City</th>
                            <th>Price</th>
                            <th>Ports</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stations.map((station) => (
                                <tr
                                    key={station._id}
                                    className="text-center border-t"
                                >
                                    <td className="p-3">
                                        {station.name}
                                    </td>

                                    <td>
                                        {station.city}
                                    </td>

                                    <td>
                                        ₹{station.pricePerKwh}
                                    </td>

                                    <td>
                                        {station.totalPorts}
                                    </td>

                                    <td>
                                        {station.status}
                                    </td>

                                    <td>
                                        <button
                                            onClick={() => {
                                                setEditingStation(station);
                                                setShowModal(true);
                                            }}
                                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDeleteStation(station._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                
            </div>

            <hr className="my-12"/>
            <h2 className="text-3xl font-bold mb-6">
                All Bookings
            </h2>

            <table className="w-full shadow border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3">User</th>
                        <th>Station</th>
                        <th>Vehicle</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map((booking)=>(
                            <tr
                                key={booking._id}
                                className="border-t text-center"
                            >

                                <td className="p-3">
                                    {booking.user?.name || "Deleted user"}
                                </td>

                                <td>
                                    {booking.station? booking.station.name : 
                                        <span className="text-red-500 italic">
                                            Station Removed
                                        </span>}
                                </td>

                                <td>
                                    {booking.vehicleNumber}
                                </td>

                                <td>
                                    {
                                        booking.bookingDate
                                            ? new Date(booking.bookingDate).toLocaleDateString()
                                            : "—"
                                    }
                                </td>

                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-white text-sm
                                        ${
                                        booking.status==="Booked"?
                                        "bg-blue-600"
                                        :
                                        booking.status==="Charging"?
                                        "bg-yellow-500"
                                        :
                                        booking.status==="Completed"?
                                        "bg-green-600"
                                        :
                                        "bg-red-500"
                                        }`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>

                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-white
                                        ${
                                            booking.paymentStatus==="Paid"?
                                            "bg-green-600":"bg-orange-500"
                                        }`}
                                    >
                                        {booking.paymentStatus}
                                    </span>
                                </td>

                                <td>
                                    {
                                        booking.status==="Booked" &&
                                        (
                                            <button
                                                onClick={()=>
                                                    handleStartCharging(
                                                        booking._id
                                                    )
                                                }
                                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            >
                                                Start
                                            </button>
                                        )
                                    }
                                    {
                                        booking.status==="Charging" &&
                                        (
                                            <button
                                                onClick={()=>
                                                    handleCompleteCharging(
                                                        booking._id
                                                    )
                                                }
                                                className="bg-green-600 text-white px-3 py-1 rounded"
                                            >
                                                Complete
                                            </button>
                                        )
                                    }
                                    {
                                        booking.status==="Completed" &&
                                        <span>
                                            ✅ Done
                                        </span>
                                    }
                                    {
                                        booking.status==="Cancelled" &&
                                        <span>
                                            ❌ Cancelled
                                        </span>
                                    }
                                </td>
                            </tr>

                        ))
                    }

                </tbody>

            </table>

            {
                showModal && (
                    <AddStationModal
                        station={editingStation}
                        onClose={() => {
                            setShowModal(false);
                            setEditingStation(null);
                        }}
                        onSuccess={fetchDashboard}
                    />
                )

            }

        </div>

    );

};

export default AdminDashboard;
