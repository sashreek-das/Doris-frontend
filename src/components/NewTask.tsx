import axios from "axios";
import { useState } from "react";


export const Newtask = () => {
    const [task, setTask] = useState("");

    const token = localStorage.getItem("token");

    const handleCreateTask = async () => {
        try {
            const response = await axios.post("https://doris-backend.vercel.app/api/v1/ticket/createTask", {
                task
            }, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            console.log(response.data);
            setTask(""); 
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
            {/* Dark Mode Toggle */}
            

            <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Create a New Task</h2>
                
                <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">Task Description</label>
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-300"
                        placeholder="Enter task description"
                    />
                </div>

                <button
                    onClick={handleCreateTask}
                    className="w-full py-2 px-4 rounded-md mt-4 text-white font-medium bg-black hover:bg-gray-800 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
                >
                    Create Task
                </button>
            </div>
        </div>
    );
};
