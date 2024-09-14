import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Appbar } from "../components/Appbar"; // Import the Appbar component

interface Friend {
    userId: {
        _id: string;
        email: string;
        name?: string;
    } | null; // Update to allow null or undefined for safety
}

export const FriendsList = () => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get("https://doris-backend.vercel.app/api/v1/user/friends", {
                    headers: {
                        "Authorization": `${localStorage.getItem("token")}`,
                    },
                });
                setFriends(response.data.friends);
            } catch (err) {
                console.error("Error fetching friends", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-700">Loading friends...</p>;
    }

    return (
        <div>
            {/* Appbar Component */}
            <Appbar />

            {/* Friends List Content */}
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-6">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl">
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
                        My Friends
                    </h3>

                    {friends.length === 0 ? (
                        <p className="text-center text-gray-600 dark:text-gray-400">No friends found.</p>
                    ) : (
                        <ul className="space-y-6">
                            {friends.map((friend: Friend) => (
                                friend.userId && ( // Add this check to ensure userId is not null or undefined
                                    <li
                                        key={friend.userId._id}
                                        className="flex items-center justify-between bg-gradient-to-r from-blue-100 via-white to-purple-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 p-4 rounded-2xl shadow-md transition-transform duration-300 hover:shadow-xl"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-full bg-indigo-200 dark:bg-gray-700 flex items-center justify-center">
                                                <span className="text-xl text-indigo-600 dark:text-white font-bold">
                                                    {friend.userId.name?.[0].toUpperCase() || friend.userId.email[0].toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                                    {friend.userId.name || friend.userId.email}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {friend.userId.email}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                )
                            ))}
                        </ul>
                    )}

                    {/* Add More Friends Button */}
                    <div className="mt-10 text-center">
                        <Link to="/allUsers">
                            <button
                                type="button"
                                className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-300 font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                Add More Friends
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
