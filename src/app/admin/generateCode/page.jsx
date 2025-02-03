
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
        <div className="max-w-lg mx-auto p-4 border rounded shadow-md">
            <pre>{JSON.stringify({ email, count, codes }, null, 2)}</pre>
            <h1 className="text-2xl font-semibold mb-4">Generate Verification Codes</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Count Input */}
                <div>
                    <label htmlFor="count" className="block text-sm font-medium text-gray-700">
                        Number of Codes
                    </label>
                    <input
                        type="number"
                        id="count"
                        name="count"
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        min="1"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                    >
                        Generate Codes
                    </button>
                </div>
            </form>

            {/* Display message or generated codes */}
            {message && <p className="mt-4 text-lg">{message}</p>}
            {codes.length > 0 && (
                <div className="mt-4">
                    <h2 className="font-semibold">Generated Codes:</h2>
                    <ul className="list-disc pl-5 mt-2">
                        {codes.map((code, index) => (
                            <li key={index}>{code.code}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
