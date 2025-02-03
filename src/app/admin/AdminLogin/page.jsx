"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);



    const handleLogin = async () => {
        // Basic validation
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        setLoading(true); // Set loading to true during login attempt

        try {
            const response = await axios.post("/api/adminLogin", {
                email,
                password
            },
            );
            console.log("Login successful:", response.data);
            // Check if response contains token
            if (response.data?.token) {
                localStorage.setItem("adminToken", response.data.token);

                alert("Login successful!");
                setLoading(false);
                router.push("/admin/dashboard");
            } else {
                throw new Error("Token not received. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data?.message || error.message);
            alert(error.response?.data?.message || error.message); // Show error to the user
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-600">
            <h1 className="text-2xl font-bold mb-4 text-white">Admin Login</h1>
            <input
                type="email"
                placeholder="Email"
                className="mb-2 p-2 border rounded w-64"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="mb-2 p-2 border rounded w-64"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={handleLogin}
                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading} // Disable button during loading
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </div>
    );
}
