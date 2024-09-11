import axios from "axios";
import { useEffect, useState } from "react";

interface Task {
    _id: string;
    userId: string;
    task: string;
    taken: number;
}

export const YourTasks = () => {
    const [myTasks, setMyTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMyTasks = async () => {
            try {
                const response = await axios.get("https://doris-backend.vercel.app/api/v1/user/myTasks", {
                    headers: {
                        "Authorization": `${localStorage.getItem("token")}`
                    }
                });
                setMyTasks(response.data.tasks); // assuming response.data.tasks contains user-specific tasks
            } catch (error) {
                console.error("Error fetching my tasks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyTasks();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-700">Loading your tasks...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                    Your Tasks
                </h2>
                {myTasks.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400 text-center">no assineed tasks</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {myTasks.map((task: Task) => (
                            <li key={task._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">{task.task}</h3>
                                {/* <p className="text-sm text-green-500 font-semibold">Assigned to You</p> */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
