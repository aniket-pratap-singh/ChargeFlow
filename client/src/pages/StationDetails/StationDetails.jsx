import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";

const StationDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [station, setStation] = useState(null);

    useEffect(() => {

        const fetchStation = async () => {

            try {

                const response = await api.get(`/stations/${id}`);

                setStation(response.data.station);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchStation();

    }, [id]);

    if (!station) {

        return (

            <div className="min-h-screen flex justify-center items-center bg-slate-50">

                <h2 className="text-2xl font-semibold">
                    Loading...
                </h2>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-50">

            {/* Hero */}

            <div className="bg-[#0F172A] text-white py-14">

                <div className="max-w-6xl mx-auto px-6">

                    <h1 className="text-5xl font-bold">

                        {station.name}

                    </h1>

                    <p className="text-gray-300 mt-3 text-lg">

                        📍 {station.city}

                    </p>

                </div>

            </div>

            {/* Details */}

            <div className="max-w-5xl mx-auto px-6 py-10">

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                    <div className="grid md:grid-cols-2 gap-8 p-8">

                        <div>

                            <h2 className="text-2xl font-bold mb-6">

                                Station Information

                            </h2>

                            <div className="space-y-5">

                                <div>

                                    <p className="text-gray-500">

                                        Address

                                    </p>

                                    <p className="font-semibold">

                                        {station.address}

                                    </p>

                                </div>

                                <div>

                                    <p className="text-gray-500">

                                        City

                                    </p>

                                    <p className="font-semibold">

                                        {station.city}

                                    </p>

                                </div>

                                <div>

                                    <p className="text-gray-500">

                                        Connector Type

                                    </p>

                                    <p className="font-semibold">

                                        ⚡ {station.chargerType}

                                    </p>

                                </div>

                                <div>

                                    <p className="text-gray-500">

                                        Total Ports

                                    </p>

                                    <p className="font-semibold">

                                        🔌 {station.totalPorts}

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div>

                            <h2 className="text-2xl font-bold mb-6">

                                Location & Pricing

                            </h2>

                            <div className="space-y-5">

                                <div>

                                    <p className="text-gray-500">

                                        Latitude

                                    </p>

                                    <p className="font-semibold">

                                        {station.latitude}

                                    </p>

                                </div>

                                <div>

                                    <p className="text-gray-500">

                                        Longitude

                                    </p>

                                    <p className="font-semibold">

                                        {station.longitude}

                                    </p>

                                </div>

                                <div>

                                    <p className="text-gray-500">

                                        Price

                                    </p>

                                    <p className="text-4xl font-bold text-green-600">

                                        ₹{station.pricePerKwh}

                                        <span className="text-lg text-gray-500">

                                            /kWh

                                        </span>

                                    </p>

                                </div>

                                <div>

                                    <p className="text-gray-500">

                                        Status

                                    </p>

                                    <span className="inline-block mt-2 bg-green-500 text-white px-4 py-2 rounded-full">

                                        {station.status}

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="bg-gray-100 p-8 flex justify-center">

                        <button

                            onClick={() =>
                                navigate(`/booking/${station._id}`)
                            }

                            className="bg-green-500 hover:bg-green-600 text-white text-lg font-semibold px-10 py-4 rounded-xl transition duration-300"

                        >

                            Book Charging Slot ⚡

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default StationDetails;