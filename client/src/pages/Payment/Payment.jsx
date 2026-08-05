import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

const Payment = () => {

    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);

    const handlePayment = async () => {

        try {

            const response = await api.post(
                "/payments/create-order",
                {
                    bookingId
                }
            );

            const { order } = response.data;

            const options = {

                key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                amount: order.amount,

                currency: order.currency,

                name: "ChargeFlow",

                description: "EV Charging Booking",

                order_id: order.id,

                handler: async function (paymentResponse) {
                    try {
                        const response = await api.post(
                            "/payments/verify",
                            {
                                bookingId,
                                razorpay_order_id:
                                    paymentResponse.razorpay_order_id,
                                razorpay_payment_id:
                                    paymentResponse.razorpay_payment_id,
                                razorpay_signature:
                                    paymentResponse.razorpay_signature
                            }
                        );
                        alert(response.data.message);
                        console.log(response.data);

                        navigate("/my-bookings");
                    }
                    catch (error) {
                        console.log(error);
                        alert("Payment Verification Failed");
                    }
                },

                theme: {

                    color: "#22C55E"

                }

            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        const fetchBooking = async () => {

            try {

                const response = await api.get(
                    `/bookings/${bookingId}`
                );

                setBooking(response.data.booking);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchBooking();

    }, [bookingId]);

    if (!booking) {

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

            {/* Header */}

            <div className="bg-[#0F172A] text-white py-14">

                <div className="max-w-5xl mx-auto px-6">

                    <h1 className="text-5xl font-bold">

                        Payment

                    </h1>

                    <p className="text-gray-300 mt-3 text-lg">

                        Review your booking before completing payment.

                    </p>

                </div>

            </div>

            {/* Booking Summary */}

            <div className="max-w-3xl mx-auto px-6 py-12">

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                    <div className="p-8">

                        <h2 className="text-2xl font-bold mb-6">

                            Booking Summary

                        </h2>

                        <div className="space-y-5">

                            <div className="flex justify-between">

                                <span className="text-gray-600">

                                    Station

                                </span>

                                <span className="font-semibold">

                                    {booking.station.name}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-gray-600">

                                    City

                                </span>

                                <span className="font-semibold">

                                    {booking.station.city}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-gray-600">

                                    Vehicle

                                </span>

                                <span className="font-semibold">

                                    {booking.vehicleNumber}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-gray-600">

                                    Booking Date

                                </span>

                                <span className="font-semibold">

                                    {
                                        new Date(
                                            booking.bookingDate
                                        ).toLocaleDateString()
                                    }

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-gray-600">

                                    Time Slot

                                </span>

                                <span className="font-semibold">

                                    {booking.startTime} - {booking.endTime}

                                </span>

                            </div>

                            <hr />

                            <div className="flex justify-between text-2xl font-bold">

                                <span>

                                    Total Amount

                                </span>

                                <span className="text-green-600">

                                    ₹{booking.estimatedCost}

                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="bg-gray-100 p-8">

                        <button

                            onClick={handlePayment}

                            className="w-full bg-green-500 hover:bg-green-600 transition duration-300 text-white text-lg font-semibold py-4 rounded-xl"

                        >

                            Pay Now 💳

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Payment;