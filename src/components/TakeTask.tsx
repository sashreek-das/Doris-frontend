// src/components/TakeTaskButton.tsx
import axios from "axios";
import { useState } from "react";

interface TakeTaskButtonProps {
    taskId: string;
    taskTaken: number;
    onTaskTaken: (taskId: string) => void;
}

export const TakeTaskButton: React.FC<TakeTaskButtonProps> = ({ taskId, taskTaken, onTaskTaken }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleTakeTask = async () => {
        setLoading(true); // Set loading state for the clicked task
        setErrorMessage(""); // Reset error message
        try {
            const response = await axios.get(
                `https://doris-backend.vercel.app/api/v1/ticket/takeTask/${taskId}`, 
                {
                    headers: {
                        "Authorization": `${localStorage.getItem("token")}`
                    }
                }
            );

            // Notify parent component that task has been taken
            onTaskTaken(taskId);

            // Log the response from the server
            console.log(response.data.message);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // Handle the error and show message to the user
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("An error occurred while taking the task.");
            }
            console.error("Error taking task:", error);
        } finally {
            setLoading(false); // Reset loading state once request is done
        }
    };

    return (
        <div>
            {/* Error message display */}
            {errorMessage && (
                <p className="text-center text-red-500 mb-4">{errorMessage}</p>
            )}
            <button
                onClick={handleTakeTask}
                className="w-full mt-4 py-2 px-4 bg-black text-white rounded-md hover:bg-gray-700 transition-all"
                disabled={taskTaken >= 2 || loading} // Disable button if taken or loading
            >
                {loading ? "Assigning..." : taskTaken >= 2 ? "Taken" : "Take Task"}
            </button>
        </div>
    );
};
