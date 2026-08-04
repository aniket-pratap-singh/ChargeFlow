import { Link } from "react-router-dom";

const StationCard = ({ station }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
        maxWidth: "500px",
      }}
    >
      <h2>{station.name}</h2>

      <p>
        <strong>City:</strong> {station.city}
      </p>

      <p>
        <strong>Address:</strong> {station.address}
      </p>

      <p>
        <strong>Charger:</strong> {station.chargerType}
      </p>

      <p>
        <strong>Ports:</strong> {station.totalPorts}
      </p>

      <p>
        <strong>₹ {station.pricePerKwh}</strong> / kWh
      </p>

      <Link to={`/stations/${station._id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
};

export default StationCard;