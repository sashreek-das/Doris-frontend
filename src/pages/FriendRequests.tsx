import axios from 'axios';
import { useState, useEffect } from 'react';

interface FriendRequest {
    _id: string;
    email: string;
}

export const FriendRequests = () => {
    const [friendRequestsReceived, setFriendRequestsReceived] = useState<FriendRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const response = await axios.get('https://doris-backend.vercel.app/api/v1/user/friendRequests', {
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                });

                // Use the correct field from the response (friendRequestsReceived)
                if (response.data && response.data.friendRequestsReceived) {
                    setFriendRequestsReceived(response.data.friendRequestsReceived);
                } else {
                    setFriendRequestsReceived([]); // If no requests, set an empty array
                }
            } catch (error) {
                setError('Error fetching friend requests');
                console.error('Error fetching friend requests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFriendRequests();
    }, []);

    const handleApprove = async (friendId: string) => {
        try {
            await axios.post(`https://doris-backend.vercel.app/api/v1/user/approveFriendRequest/${friendId}`, {}, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            setFriendRequestsReceived(prevRequests => prevRequests.filter(request => request._id !== friendId));
        } catch (error) {
            console.error('Error approving friend request:', error);
        }
    };

    const handleReject = async (friendId: string) => {
        try {
            await axios.post(`https://doris-backend.vercel.app/api/v1/user/rejectFriendRequest/${friendId}`, {}, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            setFriendRequestsReceived(prevRequests => prevRequests.filter(request => request._id !== friendId));
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };

    if (loading) {
        return <p>Loading friend requests...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                    Friend Requests
                </h2>

                {friendRequestsReceived && friendRequestsReceived.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400 text-center">No friend requests.</p>
                ) : (
                    <ul className="space-y-4">
                        {friendRequestsReceived.map((request) => (
                            <li key={request._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between">
                                <span className="text-gray-800 dark:text-white">{request.email}</span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleApprove(request._id)}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(request._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
