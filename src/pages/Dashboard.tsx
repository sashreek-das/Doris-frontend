import { Appbar } from "../components/Appbar";
import { AssignedTasks } from "../components/AssignedTasks";
import { ExistingTasks } from "../components/ExistingTasks";

export const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Appbar />
            <div className="px-6 py-4">
                <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-6">
                    {/* Existing Tasks Card */}
                    <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <ExistingTasks />
                    </div>

                    {/* Assigned Tasks Card */}
                    <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <AssignedTasks />
                    </div>
                </div>
            </div>
        </div>
    );
};
