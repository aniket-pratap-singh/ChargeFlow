import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Landing() {

    const [message, setMessage] = useState("");
    useEffect(() => {
    async function fetchBackend() {
        try {
        const response = await api.get("/");

        setMessage(response.data.message);

        } catch (error) {
        console.error(error);
        }
    }

    fetchBackend();
    }, []);

    return (
        <>

            <Navbar />

            <p>{message}</p>

            <Hero />

        </>
    );
}

export default Landing;