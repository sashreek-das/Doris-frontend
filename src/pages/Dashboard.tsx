import { Appbar } from "../components/Appbar";
import { ExistingTasks } from "../components/ExistingTasks";
import { Newtask } from "../components/NewTask";

export const Dashboard = () => {
    return (
        <div>
            <Appbar />
            <div className="dashboard-container flex flex-col md:flex-row justify-between gap-8 px-8 py-6">
                {/* New Task Card */}
                <div className="w-full md:w-1/2">
                    <Newtask />
                </div>
                
                {/* Existing Tasks Card */}
                <div className="w-full md:w-1/2">
                    <ExistingTasks />
                </div>
            </div>
        </div>
    );
};
