import { FaUsers, FaDollarSign, FaChartLine, FaTasks } from "react-icons/fa";

const Dashboard = () => {
    return (
        <div className="flex-1 w-full bg-[#f5f6fa] min-h-screen p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-500">Overview of your application stats</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<FaUsers />} label="Users" value="12,340" />
                <StatCard icon={<FaDollarSign />} label="Revenue" value="$23,450" />
                <StatCard icon={<FaChartLine />} label="Growth" value="18.5%" />
                <StatCard icon={<FaTasks />} label="Tasks" value="132" />
            </div>

            {/* Placeholder for charts/widgets */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm h-64">Chart Placeholder</div>
                <div className="bg-white p-6 rounded-2xl shadow-sm h-64">Activity Placeholder</div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center space-x-4 hover:shadow-md transition duration-200">
            <div className="text-white bg-indigo-500 p-3 rounded-xl text-lg">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-xl font-semibold text-gray-800">{value}</p>
            </div>
        </div>
    );
}
export default Dashboard;
