import axios from "axios";
import { useEffect, useState } from "react"; 

interface Task {
    _id: string;
    userId: string;
    task: string;
    taken: number;
}

export const ExistingTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("https://doris-backend.vercel.app/api/v1/ticket/remainingTasks", {
                    headers: {
                        "Authorization": `${localStorage.getItem("token")}`
                    }
                });
                setTasks(response.data.tasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false); // Ensure loading state is updated after fetching
            }
        };

        fetchTasks();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-700">Loading tasks...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                    Available Tasks
                </h2>
                {tasks.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400 text-center">No tasks available.</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {tasks.map((task: Task) => (
                            <li key={task._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">{task.task}</h3>
                                <p className={`text-sm font-semibold ${task.taken === 2 ? "text-red-500" : "text-green-500"}`}>
                                    {task.taken === 2 ? "Taken" : "Available"}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
