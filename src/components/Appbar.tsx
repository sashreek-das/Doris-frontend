import { Link } from "react-router-dom";
import { DarkModeToggle } from "./DarkMode";

export const Appbar = () => {
    return (
        <div className="border-b border-gray-200 bg-white flex justify-between items-center px-10 py-4 shadow-lg">
            <div className="text-2xl font-extrabold text-black">
                TRIVERRR
            </div>
            <div className="flex items-center space-x-6">
                <Link to="/newTaskPage">
                    <button
                        type="button"
                        className="text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold rounded-full text-sm px-5 py-2 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                        New Task
                    </button>
                </Link>
                <Link to="/signin">
                    <button
                        type="button"
                        className="text-gray-700 hover:text-gray-500 focus:outline-none font-semibold rounded-full text-sm px-5 py-2 transition-all duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => localStorage.removeItem("token")}
                    >
                        Logout
                    </button>
                </Link>
                {/* <Link to="/yourTasks">
                    <button
                        type="button"
                        className="text-gray-700 hover:text-gray-500 focus:outline-none font-semibold rounded-full text-sm px-5 py-2 transition-all duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => localStorage.removeItem("token")}
                    >
                        Your Tasks
                    </button>
                </Link> */}
                <DarkModeToggle/>
            </div>
        </div>
    );
};
