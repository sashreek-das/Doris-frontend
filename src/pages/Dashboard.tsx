import { AllUsers } from "../components/AllUsers";
import { Appbar } from "../components/Appbar";
import { AssignedTasks } from "../components/AssignedTasks";
import { ExistingTasks } from "../components/ExistingTasks";
import { FriendsList } from "../components/MyFriends";

export const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Appbar />
            <div className="dashboard-container px-6 py-4">
                <div className="max-w-4xl mx-auto">
                    {/* Existing Tasks Card */}
                    <div className="mb-6">
                        <ExistingTasks />
                    </div>

                    {/* Assigned Tasks Card */}
                    <div className="mb-6">
                        <AssignedTasks />
                    </div>

                    {/* All Users Card */}
                    <div className="mb-6">
                        <AllUsers />
                    </div>

                    {/* Friends List Card */}
                    <div>
                        <FriendsList />
                    </div>
                </div>
            </div>
        </div>
    );
};
