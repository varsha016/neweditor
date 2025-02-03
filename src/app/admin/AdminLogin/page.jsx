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
            });
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
        <div className="flex flex-col items-center justify-center h-screen bg-slate-700">
            <div className="bg-white hover:bg-slate-300 p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleLogin}
                    className={`w-full text-xl p-3 bg-blue-500  text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading} // Disable button during loading
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    );
}
