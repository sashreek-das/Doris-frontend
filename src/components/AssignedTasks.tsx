import axios from "axios";
import { useEffect, useState } from "react";

interface Task {
    _id: string;
    task: string;
    taken: number;
}

export const AssignedTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const fetchAssignedTasks = async () => {
            try {
                const response = await axios.get("https://doris-backend.vercel.app/api/v1/ticket/assignedTasks", {
                    headers: {
                        "Authorization": `${localStorage.getItem("token")}`
                    }
                });
                setTasks(response.data.tasks);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error:any) {
                if (error.response && error.response.data && error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage("An error occurred while fetching assigned tasks.");
                }
                console.error("Error fetching assigned tasks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignedTasks();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-700">Loading assigned tasks...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                    Assigned Tasks
                </h2>

                {/* Error message display */}
                {errorMessage && (
                    <p className="text-center text-red-500 mb-4">{errorMessage}</p>
                )}

                {tasks.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400 text-center">You have no assigned tasks.</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {tasks.map((task: Task) => (
                            <li key={task._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">{task.task}</h3>
                                <p className={`text-sm font-semibold ${task.taken >= 2 ? "text-red-500" : "text-green-500"}`}>
                                    {task.taken >= 2 ? "Taken" : "Available"}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
