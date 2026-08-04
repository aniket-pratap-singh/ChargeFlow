import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const StationDetails = () => {

    const { id } = useParams();

    const [station, setStation] = useState(null);

    const navigate = useNavigate();

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
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h1>{station.name}</h1>
            <p>City : {station.city}</p>
            <p>Address : {station.address}</p>
            <p>Latitude : {station.latitude}</p>
            <p>Longitude : {station.longitude}</p>
            <p>Connector : {station.chargerType}</p>
            <p>Total Ports : {station.totalPorts}</p>
            <p>₹ {station.pricePerKwh}/kWh</p>
            <button
                onClick={() =>
                    navigate(`/booking/${station._id}`)
                }
            >
                Book Charging Slot
            </button>
        </div>
    );
};

export default StationDetails;