import axios, { AxiosError } from 'axios';
import { useState } from 'react';

interface AddFriendButtonProps {
    friendId: string;
    onAddFriend: (friendId: string) => void;
}

interface ErrorResponse {
    message: string;
}

export const AddFriendButton: React.FC<AddFriendButtonProps> = ({ friendId, onAddFriend }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleAddFriend = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            await axios.post(
                `https://doris-backend.vercel.app/api/v1/user/sendFriendRequest/${friendId}`,
                {},
                {
                    headers: {
                        "Authorization": `${localStorage.getItem("token")}`
                    }
                }
            );
            onAddFriend(friendId); // Notify parent component of successful friend addition
        } catch (error) {
            // Type the error as AxiosError with a defined structure for the error response
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
                setErrorMessage(axiosError.response.data.message);
            } else {
                setErrorMessage("An error occurred while adding the friend.");
            }
            console.error("Error adding friend:", axiosError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {errorMessage && <p className="text-center text-red-500 mb-4">{errorMessage}</p>}
            <button
                onClick={handleAddFriend}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all"
                disabled={loading}
            >
                {loading ? "Sending..." : "Send friend request"}
            </button>
        </div>
    );
};
