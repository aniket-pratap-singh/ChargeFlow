import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Home = () => {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (

        <div className="min-h-screen bg-slate-50">

            {/* Hero */}

            <div className="bg-[#0F172A] text-white py-16">

                <div className="max-w-6xl mx-auto px-6">

                    <h1 className="text-5xl font-bold">
                        Welcome to ChargeFlow
                    </h1>

                    <p className="text-gray-300 text-lg mt-4">

                        Manage your EV charging experience from one place.

                    </p>

                </div>

            </div>

            {/* Dashboard Cards */}

            {/* Logout Button */}
            <div className="max-w-6xl mx-auto px-6 py-14">
                <div className="flex justify-between items-center mb-8">

                    <h2 className="text-3xl font-bold">
                        Dashboard
                    </h2>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition"
                    >
                        Logout
                    </button>

                </div>

                <h2 className="text-3xl font-bold mb-8">
                    Dashboard
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* View Stations */}

                    <div
                        onClick={() => navigate("/stations")}
                        className="cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition p-8"
                    >

                        <div className="text-5xl mb-5">
                            ⚡
                        </div>

                        <h3 className="text-2xl font-bold mb-3">
                            View Stations
                        </h3>

                        <p className="text-gray-600">

                            Browse all available charging stations and view
                            their details.

                        </p>

                    </div>

                    {/* My Bookings */}

                    <div
                        onClick={() => navigate("/my-bookings")}
                        className="cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition p-8"
                    >

                        <div className="text-5xl mb-5">
                            📅
                        </div>

                        <h3 className="text-2xl font-bold mb-3">
                            My Bookings
                        </h3>

                        <p className="text-gray-600">

                            View, manage and cancel your charging bookings.

                        </p>

                    </div>

                    {/* About */}

                    <div
                        onClick={() => navigate("/about")}
                        className="cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition p-8"
                    >

                        <div className="text-5xl mb-5">
                            ℹ️
                        </div>

                        <h3 className="text-2xl font-bold mb-3">
                            About ChargeFlow
                        </h3>

                        <p className="text-gray-600">

                            Learn more about the project and technologies
                            used.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Home;