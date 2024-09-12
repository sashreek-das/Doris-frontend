import { useState } from "react";
import { Link } from "react-router-dom";
import { DarkModeToggle } from "./DarkMode";

export const Appbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="border-b border-gray-200 bg-white flex justify-between items-center px-10 py-4 shadow-lg">
            <Link to="/dashboard">
                <div className="text-2xl font-extrabold text-black">
                    TRIVERRR
                </div>
            </Link>
            <div className="flex items-center space-x-6">

                {/* Circular + Icon for New Task */}
                <Link to="/newTaskPage">
                    <button
                        type="button"
                        className="w-10 h-10 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        +
                    </button>
                </Link>

                {/* Circular Dropdown Button */}
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        type="button"
                        className="w-10 h-10 bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-semibold rounded-full text-white shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105"
                        aria-expanded={dropdownOpen}
                        aria-controls="dropdown-menu"
                    >
                        ☰
                    </button>

                    {dropdownOpen && (
                        <div
                            id="dropdown-menu"
                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 transition-transform transform scale-100"
                        >
                            <Link
                                to="/myFriends"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setDropdownOpen(false)}
                            >
                                My Friends
                            </Link>
                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    setDropdownOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                <DarkModeToggle />
            </div>
        </div>
    );
};
