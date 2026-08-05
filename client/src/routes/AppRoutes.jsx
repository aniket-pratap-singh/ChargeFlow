import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import About from "../pages/About/About"
import Register from "../pages/Register/Register";
import Stations from "../pages/Stations/Stations";
import Home from "../pages/Home/Home";
import StationDetails from "../pages/StationDetails/StationDetails";
import Booking from "../pages/Booking/Booking";
import Payment from "../pages/Payment/Payment";
import MyBookings from "../pages/MyBookings/MyBookings";
import AdminDashboard from "../pages/Admin/AdminDashboard";

const AppRoutes = () => {

  return (

    <Routes>

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/about" element={<About />} />

      <Route path="/register" element={<Register />} />

      <Route path="/stations" element={<Stations />} />

      <Route path="/home" element={<Home />} />

      <Route path="/stations/:id" element={<StationDetails />} />

      <Route path="/booking/:stationId" element={<Booking />} />

      <Route path="/payment/:bookingId" element={<Payment />} />

      <Route path="/my-bookings" element={<MyBookings />} />

      <Route path="/admin" element={<AdminDashboard />} />

    </Routes>

  );

};

export default AppRoutes;