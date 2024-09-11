import { Appbar } from "../components/Appbar";
import { AssignedTasks } from "../components/AssignedTasks";
import { ExistingTasks } from "../components/ExistingTasks";
import { MyTasks } from "../components/MyTasks";

export const Dashboard = () => {
    return (
        <div>
            <Appbar />
            <div className="dashboard-container px-8 py-6">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* New Task Card */}
                    
                    {/* Existing Tasks Card */}
                    <div className="w-full md:w-1/2">
                        <ExistingTasks />
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 mt-8">
                    {/* My Tasks Card */}
                    <div className="w-full md:w-1/2">
                        <MyTasks />
                    </div>
                    
                    {/* Assigned Tasks Card */}
                    <div className="w-full md:w-1/2">
                        <AssignedTasks />
                    </div>
                </div>
            </div>
        </div>
    );
};
