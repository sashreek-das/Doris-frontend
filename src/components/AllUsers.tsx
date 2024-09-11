// src/components/AllUsers.tsx
import axios from "axios";
import { useEffect, useState } from "react";
import { AddFriendButton } from "./AddFriendButton";

interface User {
    _id: string;
    email: string;
    name?: string;
}

export const AllUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://doris-backend.vercel.app/api/v1/user/all", {
                    headers: {
                        "Authorization": `${localStorage.getItem("token")}`
                    }
                });
                setUsers(response.data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleAddFriend = (friendId: string) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user._id === friendId ? { ...user, isFriend: true } : user
            )
        );
    };

    if (loading) {
        return <p className="text-center text-gray-700">Loading users...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                    All Users
                </h2>

                {users.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400 text-center">No users found.</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {users.map((user: User) => (
                            <li key={user._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                                    {user.name || user.email}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>

                                {/* Use AddFriendButton component */}
                                <AddFriendButton
                                    friendId={user._id}
                                    onAddFriend={handleAddFriend}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
