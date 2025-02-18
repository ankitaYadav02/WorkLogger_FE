import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import workHistoryy from "../../utils/WorkingHour";
import Card from "../Primitives/Card/Card";

const WorkerHistoryChart = () => {
  const [filter, setFilter] = useState("monthly");
  const [workHistory, setWorkHistory] = useState([]);

  const calculateTotalHours = (data) => {
    return data.reduce((sum, entry) => sum + parseFloat(entry.hours), 0);
  };

  useEffect(() => {
    setWorkHistory(workHistoryy);
  }, []);

  const getFilteredWorkHistory = () => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    if (filter === "daily") {
      return workHistory.filter((entry) => entry.date === today);
    }

    if (filter === "weekly") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
      return workHistory.filter(
        (entry) => new Date(entry.date) >= sevenDaysAgo
      );
    }

    if (filter === "monthly") {
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return workHistory.filter(
        (entry) => new Date(entry.date) >= firstDayOfMonth
      );
    }

    return workHistory;
  };

  const filteredWorkHistory = getFilteredWorkHistory();
  const totalHours = calculateTotalHours(filteredWorkHistory);

  // Format data for the bar chart
  const chartData = filteredWorkHistory.map((entry) => ({
    date: entry.date,
    hours: parseFloat(entry.hours),
  }));

  return (
    <Card>
      <div className="max-w-2xs flex items-center gap-2">
        <label className="font-semibold text-gray-700">Filter:</label>
        <select
          className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 bg-white p-4 "
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </Card>
  );
};

export default WorkerHistoryChart;
