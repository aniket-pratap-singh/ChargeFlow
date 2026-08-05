import { useEffect, useState } from "react";
import api from "../../services/api";
import StationCard from "../../components/StationCard/StationCard";

const Stations = () => {

    const [stations, setStations] = useState([]);

    useEffect(() => {

        const fetchStations = async () => {

            try {

                const response = await api.get("/stations");
                setStations(response.data.stations);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchStations();

    }, []);

    return (

        <div className="min-h-screen bg-slate-50">

            {/* Header */}

            <div className="bg-[#0F172A] text-white py-16">

                <div className="max-w-7xl mx-auto px-6">

                    <h1 className="text-5xl font-bold">
                        Charging Stations
                    </h1>

                    <p className="text-gray-300 mt-4 text-lg max-w-2xl">
                        Browse nearby EV charging stations, compare prices,
                        and reserve your charging slot in just a few clicks.
                    </p>

                </div>

            </div>

            {/* Stations */}

            <div className="max-w-7xl mx-auto px-6 py-12">

                <h2 className="text-3xl font-bold mb-8">
                    Available Stations
                </h2>

                {
                    stations.length === 0 ? (

                        <div className="text-center text-gray-500 text-xl mt-16">

                            No charging stations available.

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {
                                stations.map((station) => (

                                    <StationCard
                                        key={station._id}
                                        station={station}
                                    />

                                ))
                            }

                        </div>

                    )
                }

            </div>

        </div>

    );

};

export default Stations;