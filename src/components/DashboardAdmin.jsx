import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import useApiFetch from "../utils/apiMiddleware";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const DashboardAdmin = () => {
  const [userCount, setUserCount] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);
  const [ticketStats, setTicketStats] = useState([]);
  const [roleCounts, setRoleCounts] = useState([]);
  const apiFetch = useApiFetch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, ticketRes, statsRes, roleRes] = await Promise.all([
          apiFetch(`/user/count/getusercount`),
          apiFetch("/ticket/count/getticketcount"),
          apiFetch("/ticket/status/getticketstats"),
          apiFetch("/user/role/getuserrolecounts"),
        ]);

        if (userRes.ok) setUserCount((await userRes.json()).count);
        if (ticketRes.ok) setTicketCount((await ticketRes.json()).count);
        if (statsRes.ok) setTicketStats((await statsRes.json()).stats);
        if (roleRes.ok) setRoleCounts((await roleRes.json()).roleCounts);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  // Create ticket data for the chart
  const ticketData = {
    labels: ticketStats.map((stat) => stat._id), // Use _id as labels for statuses
    datasets: [
      {
        label: "Ticket Status",
        data: ticketStats.map((stat) => stat.count), // Use count for data
        backgroundColor: ["#4CAF50", "#FF9800", "#F44336"], // You can add more colors if needed
        borderRadius: 8,
      },
    ],
  };

  const roleData = {
    labels: roleCounts.map((role) => role._id),
    datasets: [
      {
        label: "User Roles",
        data: roleCounts.map((role) => role.count),
        backgroundColor: ["#673AB7", "#E91E63", "#FFC107", "#03A9F4"],
      },
    ],
  };

  return (
    <div className="flex flex-col self-center p-10">
      <h2 className="text-2xl font-bold mb-10 text-center text-gray-800">
        Admin Dashboard
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <div className="bg-gray-100 hover:bg-gray-200 p-8 rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105">
          <h3 className="text-1xl font-semibold text-gray-700">Total Users</h3>
          <p className="text-4xl font-bold text-blue-600">{userCount}</p>
        </div>
        <div className="bg-gray-100 hover:bg-gray-200 p-8 rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105">
          <h3 className="text-1xl font-semibold text-gray-700">
            Total Tickets
          </h3>
          <p className="text-4xl font-bold text-green-600">{ticketCount}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ticket Status Chart */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-1xl font-semibold mb-4 text-gray-800">
            Ticket Status Distribution
          </h3>
          <div className="w-full h-80">
            <Bar
              data={ticketData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* User Role Distribution Chart */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-1xl font-semibold mb-4 text-gray-800">
            User Role Distribution
          </h3>
          <div className="w-full h-80">
            <Pie
              data={roleData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
