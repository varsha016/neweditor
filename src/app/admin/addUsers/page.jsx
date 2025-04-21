"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../AdminLayout";

const AddUser = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({ name: "varsha", email: "vharkal16@gmail.com", mobile: "9623067667", password: "varsha16" });
    const [codes, setCodes] = useState([]);
    const [codeCount, setCodeCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddUser = async () => {
        setLoading(true);
        setError(null); // Reset error state
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

            toast.success("User added successfully!"); // Show success toast
            setFormData({ name: "", email: "", mobile: "", password: "" }); // Clear form
        } catch (error) {
            setError(error.response?.data?.message || "Error adding user");
            toast.error(error.response?.data?.message || "Error adding user"); // Show error toast
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateCodes = async () => {
        setLoading(true);
        setError(null); // Reset error state
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
            toast.success("Codes generated and sent successfully!"); // Show success toast
        } catch (error) {
            setError(error.response?.data?.message || "Error generating codes");
            toast.error(error.response?.data?.message || "Error generating codes"); // Show error toast
        } finally {
            setLoading(false);
        }
    };

    const navigatetoGenreateCode = () => {
        router.push("/admin/generateCode");
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Add User</h1>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
                <ToastContainer /> {/* Add ToastContainer to render toast notifications */}
                <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl font-semibold text-center text-blue-600 mb-8">Add User</h1>

                    {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                    <div className="space-y-4">
                        {/* User Form */}
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            name="mobile"
                            placeholder="Mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            onClick={handleAddUser}
                            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all duration-200"
                            disabled={loading}
                        >
                            {loading ? "Adding User..." : "Add User"}
                        </button>

                        <button
                            onClick={navigatetoGenreateCode}
                            className="w-full mt-4 bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-all duration-200"
                        >
                            Generate Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function AddUserPage() {
    return (
        <AdminLayout>
            <AddUser />
        </AdminLayout>
    );
}
