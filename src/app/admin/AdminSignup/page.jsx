"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminSignup() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!firstName || !lastName || !phone || !email || !password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("/api/adminSignup", {
                firstName,
                lastName,
                phone,
                email,
                password,
            });

            console.log("Signup successful:", response.data);
            toast.success("Signup successful! Please log in.");
            setLoading(false);
            router.push("/admin/AdminLogin");
        } catch (error) {
            console.error("Signup error:", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="bg-white hover:bg-slate-300 p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg m-4">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Signup</h1>

                <input
                    type="text"
                    placeholder="First Name"
                    className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    type="tel"
                    placeholder="Phone"
                    className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    onClick={handleSignup}
                    className={`w-full text-xl p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <a href="/admin/AdminLogin" className="text-blue-500 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}