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
import Card from "../Primitives/Card/Card";
import useDashboardData from "../../hooks/useEmployDashboard";
import Loading from "../Loading";

const WorkerHistoryChart = () => {
  const [filter, setFilter] = useState("Weekly");
  const [workHistory, setWorkHistory] = useState([]);
  const { FetchMonthlyData, FetchweeklyData , isLoading } = useDashboardData();

  useEffect(() => {
    if (filter === "Weekly") {
      FetchweeklyData().then((res) => {
        setWorkHistory(formatWorkData(res));
      });
    } else if (filter === "Monthly") {
      FetchMonthlyData().then((res) => {
        setWorkHistory(formatWorkData(res));
      });
    }
  }, [filter]);
  const convertTimeToHours = (timeStr) => {
    if (!timeStr || timeStr === '"0"' || timeStr === "0") return 0; 

    const cleanedTimeStr = timeStr.replace(/"/g, ""); 
    const timeParts = cleanedTimeStr.split(":").map(Number);

    if (timeParts.length === 3) {
      const [hours, minutes, seconds] = timeParts;
      return hours + minutes / 60 + seconds / 3600;
    }
    return 0; 
  };

  const formatWorkData = (data) => {
    return data.map((entry) => ({
      date: entry.date,
      hours: convertTimeToHours(entry.work_hour),
    }));
  };

  const getFilteredWorkHistory = () => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    if (filter === "daily") {
      return workHistory.filter((entry) => entry.date === today);
    }

    if (filter === "Weekly") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
      return workHistory.filter(
        (entry) => new Date(entry.date) >= sevenDaysAgo
      );
    }

    if (filter === "Monthly") {
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return workHistory.filter(
        (entry) => new Date(entry.date) >= firstDayOfMonth
      );
    }

    return workHistory;
  };

  const filteredWorkHistory = getFilteredWorkHistory();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Card>
      <div className="max-w-2xs flex items-center gap-2">
        <label className="font-semibold text-gray-700">Filter:</label>
        <select
          className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
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
            <BarChart data={filteredWorkHistory}>
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
