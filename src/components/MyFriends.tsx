import { useEffect, useState } from "react";
import axios from "axios";

interface Friend {
    userId: {
        _id: string;
        email: string;
        name?: string;
    };
}

export const FriendsList = () => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get("https://doris-backend.vercel.app/api/v1/user/friends", {
                    headers: {
                        "Authorization": `${localStorage.getItem("token")}`
                    }
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">My Friends</h3>

            {friends.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-400">No friends found.</p>
            ) : (
                <ul className="space-y-4">
                    {friends.map((friend: Friend) => (
                        <li key={friend.userId._id} className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
                            <p className="text-gray-800 dark:text-white">
                                {friend.userId.name || friend.userId.email}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Email: {friend.userId.email}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
