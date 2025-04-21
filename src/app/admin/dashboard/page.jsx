"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaTrash, FaTrashAlt, FaPlusCircle } from "react-icons/fa"; // Import icons from react-icons/fa
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import AdminLayout from "../AdminLayout";

const Dashboard = () => {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // State to toggle modal visibility

    useEffect(() => {
        // Fetch all users along with their verification codes
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/getAllUsers");
                const data = await res.json();
                setUsers(data.users);
                setLoading(false);
                toast.success("Users fetched successfully!"); // Show success toast
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("Error fetching users"); // Show error toast
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (email) => {
        try {
            const res = await fetch("/api/deleteUsers", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (data.message === "User deleted successfully") {
                setUsers(users.filter((user) => user.email !== email));
                toast.success("User deleted successfully!"); // Show success toast
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Error deleting user"); // Show error toast
        }
    };

    const deleteCode = async (email, code) => {
        try {
            const res = await fetch("/api/deleteCode", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, code }),
            });

            const data = await res.json();
            if (data.message === "Code deleted successfully") {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.email === email
                            ? {
                                ...user,
                                codes: user.codes.filter((item) => item.code !== code),
                            }
                            : user
                    )
                );
                toast.success("Code deleted successfully!"); // Show success toast
            }
        } catch (error) {
            console.error("Error deleting code:", error);
            toast.error("Error deleting code"); // Show error toast
        }
    };

    const deleteAllUsers = async () => {
        try {
            const res = await fetch("/api/deleteAllUsers", {
                method: "DELETE",
            });

            const data = await res.json();
            if (data.message === "All users deleted successfully") {
                setUsers([]);
                setShowModal(false); // Close the modal after deletion
                toast.success("All users deleted successfully!"); // Show success toast
            }
        } catch (error) {
            console.error("Error deleting all users:", error);
            toast.error("Error deleting all users"); // Show error toast
        }
    };

    const navigatetoAddUsers = () => router.push("/admin/addUsers");

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="bg-gray-900">
                {/* <h1 className="text-3xl font-bold mb-6 text-gray-400 flex justify-start px-4">Dashboard</h1> */}
                <ToastContainer /> {/* Add ToastContainer to render toast notifications */}
                <div className="min-h-screen flex items-center justify-center py-10 px-4">
                    <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-7xl">
                        <h1 className="text-4xl font-semibold mb-6 text-gray-300 hover:text-slate-400 text-center">
                            Dashboard - User Codes
                        </h1>

                        <div className="flex gap-4 mb-6 justify-center">
                            <button
                                onClick={() => setShowModal(true)} // Open the modal
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transform transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
                            >
                                <FaTrashAlt className="text-xl" />
                                <span>Delete All Users</span>
                            </button>

                            <button
                                onClick={navigatetoAddUsers}
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow-md transform transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
                            >
                                <FaPlusCircle className="text-xl" />
                                <span>Add Users</span>
                            </button>
                        </div>

                        {/* Confirmation Modal */}
                        {showModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                        Are you sure you want to delete all users?
                                    </h2>
                                    <div className="flex justify-end gap-4">
                                        <button
                                            onClick={() => setShowModal(false)} // Close the modal
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={deleteAllUsers} // Call deleteAllUsers function
                                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                            <div className="max-h-96 overflow-y-auto"> {/* Added vertical scrollbar */}
                                <table className="min-w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-600">
                                            <th className="px-4 py-3 border text-left">Name</th>
                                            <th className="px-4 py-3 border text-left">Email</th>
                                            <th className="px-4 py-3 border text-left">Codes</th>
                                            <th className="px-4 py-3 border text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users?.length > 0 ? (
                                            users?.map((user) => (
                                                <tr key={user.email} className="hover:bg-gray-50 transition-all">
                                                    <td className="px-4 py-3 border">{user.name}</td>
                                                    <td className="px-4 py-3 border">{user.email}</td>
                                                    <td className="px-4 py-3 border">
                                                        <ul>
                                                            {user.codes.map((code) => (
                                                                <li key={code.code} className="flex justify-between items-center">
                                                                    <span className="text-gray-600">{code.code}</span>
                                                                    <button
                                                                        onClick={() => deleteCode(user.email, code.code)}
                                                                        className="text-red-500 hover:text-red-700 transition-all"
                                                                    >
                                                                        <FaTrash className="text-lg" />
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                    <td className="px-4 py-3 border text-center">
                                                        <button
                                                            onClick={() => deleteUser(user.email)}
                                                            className="text-red-500 hover:text-red-700 transition-all"
                                                        >
                                                            <FaTrash className="text-lg" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-4 py-3 border text-center text-gray-500">
                                                    No users found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-600">
                                        <th className="px-4 py-3 border text-left">Name</th>
                                        <th className="px-4 py-3 border text-left">Email</th>
                                        <th className="px-4 py-3 border text-left">Codes</th>
                                        <th className="px-4 py-3 border text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.length > 0 ? (
                                        users?.map((user) => (
                                            <tr key={user.email} className="hover:bg-gray-50 transition-all">
                                                <td className="px-4 py-3 border">{user.name}</td>
                                                <td className="px-4 py-3 border">{user.email}</td>
                                                <td className="px-4 py-3 border">
                                                    <ul>
                                                        {user.codes.map((code) => (
                                                            <li key={code.code} className="flex justify-between items-center">
                                                                <span className="text-gray-600">{code.code}</span>
                                                                <button
                                                                    onClick={() => deleteCode(user.email, code.code)}
                                                                    className="text-red-500 hover:text-red-700 transition-all"
                                                                >
                                                                    <FaTrash className="text-lg" />
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td className="px-4 py-3 border text-center">
                                                    <button
                                                        onClick={() => deleteUser(user.email)}
                                                        className="text-red-500 hover:text-red-700 transition-all"
                                                    >
                                                        <FaTrash className="text-lg" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-4 py-3 border text-center text-gray-500">
                                                No users found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function DashboardPage() {
    return (
        <AdminLayout>
            <Dashboard />
        </AdminLayout>
    );
}
