"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function VerifyCode() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const router = useRouter();

    const verifyCode = async () => {
        try {
            const response = await axios.post("/api/verifyCode", { email, code });
            console.log(response.data, "VVVVVVVVV");

            if (response.data.message === "Code verified successfully") {
                alert(response.data.message);
                localStorage.setItem("isVerified", "true");
                router.push("/");
            } else {
                alert(response.data.message || "Verification failed. Please try again.");
            }
        } catch (error) {
            console.error("Error verifying code:", error);
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Verify Your Code</h2>
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Enter Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={verifyCode}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Verify Code
                    </button>

                </div>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">Don't have an account? <a href="/signup" className="text-blue-600 hover:text-blue-800">Sign up</a></p>
                </div>
            </div>
        </div>
    );
}
