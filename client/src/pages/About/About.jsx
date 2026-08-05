const About = () => {

    return (

        <div className="min-h-screen bg-slate-50">

            {/* Hero Section */}

            <div className="bg-[#0F172A] text-white py-16">

                <div className="max-w-6xl mx-auto px-6">

                    <h1 className="text-5xl font-bold">
                        About ChargeFlow
                    </h1>

                    <p className="text-gray-300 text-lg mt-4 max-w-3xl">

                        ChargeFlow is an EV charging station booking platform
                        that helps electric vehicle owners discover nearby
                        charging stations, reserve charging slots, and make
                        secure online payments with ease.

                    </p>

                </div>

            </div>

            {/* Main Content */}

            <div className="max-w-6xl mx-auto px-6 py-16">

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <div className="text-5xl mb-4">
                            ⚡
                        </div>

                        <h2 className="text-2xl font-bold mb-3">
                            Find Stations
                        </h2>

                        <p className="text-gray-600">

                            Search available EV charging stations based on
                            your location and view complete station
                            information before booking.

                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <div className="text-5xl mb-4">
                            📅
                        </div>

                        <h2 className="text-2xl font-bold mb-3">
                            Book Slots
                        </h2>

                        <p className="text-gray-600">

                            Reserve charging slots in advance to avoid
                            waiting and ensure charger availability.

                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <div className="text-5xl mb-4">
                            💳
                        </div>

                        <h2 className="text-2xl font-bold mb-3">
                            Secure Payments
                        </h2>

                        <p className="text-gray-600">

                            Integrated Razorpay payment gateway provides
                            safe and secure online transactions.

                        </p>

                    </div>

                </div>

                {/* Project */}

                <div className="bg-white rounded-2xl shadow-lg mt-16 p-10">

                    <h2 className="text-3xl font-bold mb-6">

                        Project Overview

                    </h2>

                    <p className="text-gray-700 leading-8">

                        ChargeFlow is a full-stack MERN application developed
                        to simplify the EV charging experience. Users can
                        register, browse charging stations, reserve charging
                        slots, complete payments through Razorpay, and manage
                        their bookings.

                    </p>

                    <p className="text-gray-700 leading-8 mt-6">

                        Administrators can manage charging stations, monitor
                        bookings, update charging status, and oversee the
                        entire platform through an admin dashboard.

                    </p>

                </div>

                {/* Technologies */}

                <div className="bg-[#0F172A] text-white rounded-2xl mt-16 p-10">

                    <h2 className="text-3xl font-bold mb-8">

                        Technologies Used

                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                        <div className="bg-slate-800 rounded-xl p-5 text-center">
                            React
                        </div>

                        <div className="bg-slate-800 rounded-xl p-5 text-center">
                            Node.js
                        </div>

                        <div className="bg-slate-800 rounded-xl p-5 text-center">
                            Express.js
                        </div>

                        <div className="bg-slate-800 rounded-xl p-5 text-center">
                            MongoDB
                        </div>

                        <div className="bg-slate-800 rounded-xl p-5 text-center">
                            JWT
                        </div>

                        <div className="bg-slate-800 rounded-xl p-5 text-center">
                            Razorpay
                        </div>

                        <div className="bg-slate-800 rounded-xl p-5 text-center">
                            Tailwind CSS
                        </div>

                        <div className="bg-slate-800 rounded-xl p-5 text-center">
                            Axios
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default About;