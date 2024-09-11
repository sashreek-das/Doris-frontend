import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DarkModeToggle } from '../components/DarkMode'; 

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignup = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.post("https://doris-backend.vercel.app/api/v1/user/signup", {
                email,
                password
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("UserId", response.data.userId);

            navigate("/dashboard");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
            {/* Dark mode toggle */}
            <div className="absolute top-4 right-4">
                <DarkModeToggle />
            </div>

            <div className="bg-white dark:bg-gray-800 dark:text-white p-10 rounded-lg shadow-lg w-full max-w-md space-y-6">
                <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">Create your Account</h2>
                
                {error && <p className="text-red-500 text-center">{error}</p>}
                
                <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-300 text-black" // Added text-black class
                        placeholder="Enter your email"
                    />
                </div>
                
                <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-300 text-black" // Added text-black class
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    onClick={handleSignup}
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                        loading ? "bg-gray-300 dark:bg-gray-600" : "bg-black hover:bg-gray-800 dark:bg-gray-700"
                    } transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500`}
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-black dark:text-white hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};
