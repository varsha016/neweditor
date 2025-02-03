"use client";
import { useState } from "react";

export default function GenerateCodesForm() {
    const [email, setEmail] = useState("");
    const [count, setCount] = useState(1); // Default to 1 if count is not specified
    const [message, setMessage] = useState("");
    const [codes, setCodes] = useState([]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email and count
        if (!email || !count || count < 1) {
            setMessage("Please provide a valid email and a positive count.");
            return;
        }

        try {
            // Send request to the backend
            const response = await fetch("/api/generateCode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, count }),
            });

            // Parse the response
            const data = await response.json();

            if (response.ok) {
                setCodes(data.codes);  // Update codes state with the generated codes
                setMessage(data.message);  // Update message with success message
            } else {
                setMessage(data.message);  // Show error message from API
            }
        } catch (error) {
            setMessage("An error occurred while generating the codes.");
            console.error("Error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-600">
            <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-xl bg-white ">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Generate Verification Codes</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Count Input */}
                    <div>
                        <label htmlFor="count" className="block text-sm font-medium text-gray-700">Number of Codes</label>
                        <input
                            type="number"
                            id="count"
                            name="count"
                            value={count}
                            onChange={(e) => setCount(Number(e.target.value))}
                            min="1"
                            required
                            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Generate Codes
                        </button>
                    </div>
                </form>

                {/* Display message or generated codes */}
                {message && <p className="mt-4 text-lg text-center">{message}</p>}

                {codes.length > 0 && (
                    <div className="mt-6">
                        <h2 className="font-semibold text-lg text-gray-800">Generated Codes:</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            {codes.map((code, index) => (
                                <li key={index} className="text-gray-700">{code.code}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>

    );
}
