"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddUser = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({ name: "varsha", email: "vharkal16@gmail.com", mobile: "9623067667", password: "varsha16" });
    const [codes, setCodes] = useState([]);
    const [codeCount, setCodeCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddUser = async () => {
        setLoading(true);
        setError(null);  // Reset error state
        try {
            const token = localStorage.getItem("adminToken");
            if (!token) {
                setError("Admin token not found. Please log in.");
                setLoading(false);
                return;
            }

            const response = await axios.post("/api/adduser", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSuccessMessage("User added successfully!");
            setFormData({ name: "", email: "", mobile: "", password: "" }); // Clear form
        } catch (error) {
            setError(error.response?.data?.message || "Error adding user");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateCodes = async () => {
        setLoading(true);
        setError(null);  // Reset error state
        try {
            const token = localStorage.getItem("adminToken");
            if (!token) {
                setError("Admin token not found. Please log in.");
                setLoading(false);
                return;
            }

            const response = await axios.post(
                "/api/generateCode",
                { email: formData.email, count: codeCount },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCodes(response.data.codes);
            setSuccessMessage("Codes generated and sent successfully!");
        } catch (error) {
            setError(error.response?.data?.message || "Error generating codes");
        } finally {
            setLoading(false);
        }
    };
    const navigatetoGenreateCode = () => {
        router.push("/admin/generateCode");
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-6">Add User</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
            <div className="w-full max-w-sm space-y-4">
                {/* User Form */}
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    name="mobile"
                    placeholder="Mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                />
                <button
                    onClick={handleAddUser}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Adding User..." : "Add User"}
                </button>
            </div>
            <button onClick={navigatetoGenreateCode} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">GenerateCode</button>
            {/* Code Generator Section */}
            {/* <div className="w-full max-w-sm mt-8">
                <h2 className="text-xl font-bold mb-4">Generate Codes</h2>
                <div className="flex items-center space-x-2 mb-4">
                    <input
                        type="number"
                        value={codeCount}
                        onChange={(e) => setCodeCount(Number(e.target.value))}
                        className="w-20 p-2 border rounded"
                        disabled={loading}
                    />
                    <button
                        onClick={handleGenerateCodes}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Generate & Send Codes"}
                    </button>
                </div>
                <ul className="space-y-2">
                    {codes.map((code, index) => (
                        <li key={index} className="text-gray-700">
                            {code.code} - {code.verified ? "Verified" : "Not Verified"}
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
};

export default AddUser;
