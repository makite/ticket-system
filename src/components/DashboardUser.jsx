import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import useApiFetch from "../utils/apiMiddleware";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DashboardUser = () => {
  const [ticketCount, setTicketCount] = useState(0);
  const [userTicketStats, setUserTicketStats] = useState([]);
  const apiFetch = useApiFetch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [ticketCountRes, userStatsRes] = await Promise.all([
          apiFetch("/ticket/count/getticketcount"),
          apiFetch("/ticket/status/getticketstats"),
        ]);

        if (ticketCountRes.ok)
          setTicketCount((await ticketCountRes.json()).count);
        if (userStatsRes.ok)
          setUserTicketStats((await userStatsRes.json()).stats);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  const userTicketData = {
    labels: userTicketStats.map((stat) => stat.status), // Use status as labels
    datasets: [
      {
        label: "Your Ticket Status",
        data: userTicketStats.map((stat) => stat.count),
        backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="flex flex-col self-center p-10">
      <h2 className="text-2xl font-bold mb-10 text-center text-gray-800">
        User Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-10">
        <div className="bg-gray-100 hover:bg-gray-200 p-8 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-1xl font-semibold text-gray-700">
            Total Tickets
          </h3>
          <p className="text-4xl font-bold text-blue-600">{ticketCount}</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-1xl font-semibold mb-4 text-gray-800">
          Your Ticket Status Distribution
        </h3>
        <div className="w-full h-80">
          <Bar
            data={userTicketData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
