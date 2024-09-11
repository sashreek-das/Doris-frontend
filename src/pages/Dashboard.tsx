import { Appbar } from "../components/Appbar";
import { AssignedTasks } from "../components/AssignedTasks";
import { ExistingTasks } from "../components/ExistingTasks";
export const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Appbar />
            <div className="dashboard-container px-6 py-4">
                {/* First Row: Existing Tasks and My Tasks */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Existing Tasks Card */}
                    <div className="w-full md:w-1/2">
                        <ExistingTasks />
                    </div>
                    <div className="w-full md:w-1/2">
                        <AssignedTasks />
                    </div>
                </div>
            </div>
        </div>
    );
};
