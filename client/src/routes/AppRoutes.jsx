import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Stations from "../pages/Stations/Stations";
import StationDetails from "../pages/StationDetails/StationDetails";
import Booking from "../pages/Booking/Booking";

const AppRoutes = () => {

  return (

    <Routes>

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/stations" element={<Stations />} />

      <Route path="/stations/:id" element={<StationDetails />} />

      <Route path="/booking/:stationId" element={<Booking />} />

    </Routes>

  );

};

export default AppRoutes;