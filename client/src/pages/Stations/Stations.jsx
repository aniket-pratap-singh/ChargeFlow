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
        <div>
            <h1>Charging Stations</h1>
            {
                stations.map((station) => (
                    <StationCard
                        key={station._id}
                        station={station}
                    />
                ))
            }
        </div>
    );
};

export default Stations;