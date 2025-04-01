"use client"

import { useEffect } from "react"

const Chatbot = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.async = true;
        script.id = "xq7jK3qoZY68glhGqtIPE";

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script); // Cleanup to prevent duplicates
        };
    }, []);

    return <h1>Your Component Loaded!</h1>;
};

export default Chatbot;