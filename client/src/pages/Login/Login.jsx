import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
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
                "/auth/login",
                formData
            );

            login(
                response.data.user,
                response.data.token
            );

            if (response.data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/home");
            }

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        }

    };

    return (

        <div className="min-h-screen bg-[#0F172A] flex justify-center items-center px-6">

            <div className="w-full max-w-md bg-[#1E293B] rounded-2xl shadow-2xl p-8">

                <h1 className="text-4xl font-bold text-white text-center">

                    Welcome Back

                </h1>

                <p className="text-gray-400 text-center mt-2 mb-8">

                    Login to continue using ChargeFlow

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="text-gray-300 block mb-2">

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

                        <label className="text-gray-300 block mb-2">

                            Password

                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-[#0F172A] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-3 rounded-lg"
                    >

                        Login

                    </button>

                </form>

                <p className="text-center text-gray-400 mt-6">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-green-400 hover:text-green-300 font-semibold"
                    >

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Login;