import { useState, useEffect } from "react";

export const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Apply dark or light mode based on state
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full focus:outline-none transition-all duration-300 ease-in-out ${
                darkMode ? 'bg-black-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
        >
            {darkMode ? "🌙" : "☀️"}
        </button>
    );
};
