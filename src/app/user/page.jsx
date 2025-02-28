"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaBackspace, FaBackward } from "react-icons/fa";

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
                // setIsVerified(true); // Update state
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
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <div className="flex justify-start">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 flex items-center justify-center rounded-full font-bold text-gray-600 bg-blue-300 hover:bg-blue-400 transition-colors hover:text-white"
                    >
                        {/* Back */}
                        <FaArrowLeft />
                    </button>
                </div>

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

            </div>
        </div>
    );
}
