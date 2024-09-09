import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-white text-black">
            <div className="text-center space-y-4">
                <div className="text-lg font-semibold animate-fade-in">
                    Ticketing system re-designed
                </div>
                <div>
                    <Link to="/signup">
                        <button
                            type="button"
                            className="text-black bg-white border border-black hover:bg-black hover:text-white transition-colors duration-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none animate-bounce"
                        >
                            Start your journey
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
const styles = document.createElement('style');
styles.innerHTML = `
@keyframes fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.animate-fade-in {
    animation: fade-in 1.5s ease-in-out;
}

.animate-bounce {
    animation: bounce 2s infinite;
}
`;
document.head.appendChild(styles);