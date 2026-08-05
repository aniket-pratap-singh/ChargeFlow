import { Link } from "react-router-dom";

const StationCard = ({ station }) => {

    return (

        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200">

            <div className="bg-[#0F172A] text-white p-5">

                <div className="flex justify-between items-start">

                    <div>

                        <h2 className="text-2xl font-bold">
                            {station.name}
                        </h2>

                        <p className="text-gray-300 mt-1">
                            📍 {station.city}
                        </p>

                    </div>

                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">

                        {station.status}

                    </span>

                </div>

            </div>

            <div className="p-5 space-y-4">

                <div>

                    <p className="text-gray-500 text-sm">
                        Address
                    </p>

                    <p className="font-medium text-gray-800">
                        {station.address}
                    </p>

                </div>

                <div className="grid grid-cols-2 gap-4">

                    <div className="bg-gray-100 rounded-lg p-3">

                        <p className="text-gray-500 text-sm">
                            Charger
                        </p>

                        <p className="font-semibold">
                            ⚡ {station.chargerType}
                        </p>

                    </div>

                    <div className="bg-gray-100 rounded-lg p-3">

                        <p className="text-gray-500 text-sm">
                            Ports
                        </p>

                        <p className="font-semibold">
                            🔌 {station.totalPorts}
                        </p>

                    </div>

                </div>

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-gray-500 text-sm">
                            Price
                        </p>

                        <p className="text-2xl font-bold text-green-600">
                            ₹{station.pricePerKwh}
                            <span className="text-sm text-gray-500 font-normal">
                                /kWh
                            </span>
                        </p>

                    </div>

                    <Link
                        to={`/stations/${station._id}`}
                    >

                        <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg font-semibold transition">

                            View Details

                        </button>

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default StationCard;