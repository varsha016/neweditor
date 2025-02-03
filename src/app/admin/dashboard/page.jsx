"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaTrash, FaTrashAlt, FaPlusCircle } from "react-icons/fa"; // Import icons from react-icons/fa

const Dashboard = () => {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all users along with their verification codes
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/getAllUsers");
                const data = await res.json();
                setUsers(data.users);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (email) => {
        try {
            const res = await fetch("/api/deleteUser", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (data.message === "User deleted successfully") {
                setUsers(users.filter((user) => user.email !== email));
            }
        } catch (error) {
            console.error("Error deleting user:", error);
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
            }
        } catch (error) {
            console.error("Error deleting code:", error);
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
            }
        } catch (error) {
            console.error("Error deleting all users:", error);
        }
    };

    const navigatetoAddUsers = () => router.push("/admin/addUsers");

    if (loading) return <div>Loading...</div>;

    // return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
    return (
        <div className=" bg-gray-900">
            {/* <div className="flex justify-center ">
            </div> */}

            <div className="min-h-screen flex items-center justify-center bg-gray-900">

                <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-semibold mb-6  text-gray-300  hover:text-slate-400">Dashboard - User Codes</h1>

                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={deleteAllUsers}
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

                    <table className="min-w-full bg-white rounded-lg shadow-lg table-auto">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600">
                                <th className="px-4 py-3 border text-left">Name</th>
                                <th className="px-4 py-3 border text-left">Email</th>
                                <th className="px-4 py-3 border text-left">Codes</th>
                                <th className="px-4 py-3 border text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
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
        </div>
    );
};

export default Dashboard;
