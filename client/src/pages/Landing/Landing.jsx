import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import { useEffect, useState } from "react";
import axios from "axios";

function Landing() {

    const [message, setMessage] = useState("");
    useEffect(() => {
    async function fetchBackend() {
        try {
        const response = await axios.get(
            "http://localhost:5000/api/"
        );

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