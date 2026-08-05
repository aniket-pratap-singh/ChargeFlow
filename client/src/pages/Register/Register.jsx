import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/auth/register",
                formData
            );

            alert(response.data.message);

            navigate("/login");

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );

        }

    };

    return (

        <div className="min-h-screen bg-[#0F172A] flex justify-center items-center px-6">

            <div className="w-full max-w-md bg-[#1E293B] rounded-2xl shadow-2xl p-8">

                <h1 className="text-4xl font-bold text-white text-center">

                    Create Account

                </h1>

                <p className="text-gray-400 text-center mt-2 mb-8">

                    Join ChargeFlow and start booking EV charging stations

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="block text-gray-300 mb-2">

                            Name

                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-[#0F172A] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                        />

                    </div>

                    <div>

                        <label className="block text-gray-300 mb-2">

                            Email

                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-[#0F172A] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                        />

                    </div>

                    <div>

                        <label className="block text-gray-300 mb-2">

                            Password

                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-[#0F172A] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 transition duration-200 text-white font-semibold py-3 rounded-lg"
                    >

                        Register

                    </button>

                </form>

                <p className="text-center text-gray-400 mt-6">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-green-400 hover:text-green-300 font-semibold"
                    >

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Register;