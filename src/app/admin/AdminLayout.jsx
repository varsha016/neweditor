"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHome, FaUsers, FaSignOutAlt, FaLongArrowAltRight, FaSignInAlt, FaAngleDoubleRight } from "react-icons/fa";

const AdminLayout = ({ children }) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    useEffect(() => {
        // Check if adminToken exists in localStorage
        const token = localStorage.getItem("adminToken");
        setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        setIsLoggedIn(false); // Update login state
        router.push("/admin/AdminLogin");
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-6 text-center text-2xl font-bold border-b border-gray-700">
                    Admin Panel
                </div>
                <nav className="flex-1 p-4 space-y-4">
                    <button
                        onClick={() => router.push("/admin/dashboard")}
                        className="flex items-center gap-3 p-3 w-full text-left hover:bg-gray-700 rounded-md"
                    >
                        <FaHome />
                        <span>Dashboard</span>
                    </button>
                    <button
                        onClick={() => router.push("/admin/addUsers")}
                        className="flex items-center gap-3 p-3 w-full text-left hover:bg-gray-700 rounded-md"
                    >
                        <FaUsers />
                        <span>Add Users</span>
                    </button>

                    {/* Conditionally render Login and Signup buttons */}
                    {!isLoggedIn && (
                        <>
                            <button
                                onClick={() => router.push("/admin/AdminLogin")}
                                className="flex items-center gap-3 p-3 w-full text-left hover:bg-gray-700 rounded-md"
                            >
                                <FaAngleDoubleRight />
                                <span>Login</span>
                            </button>
                            <button
                                onClick={() => router.push("/admin/AdminSignup")}
                                className="flex items-center gap-3 p-3 w-full text-left hover:bg-gray-700 rounded-md"
                            >
                                <FaSignInAlt />
                                <span>Signup</span>
                            </button>
                        </>
                    )}
                </nav>

                {/* Logout button */}
                {isLoggedIn && (
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-3 w-full text-left hover:bg-red-600 bg-red-500 rounded-md"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-0 bg-gray-50">{children}</main>
        </div>
    );
};

export default AdminLayout;