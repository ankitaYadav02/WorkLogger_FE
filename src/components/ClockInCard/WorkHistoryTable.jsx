import React, { useEffect, useState } from "react";
import PeriodSelector from "./PeriodSelector";
import { motion } from "framer-motion";
import useDashboardData from "../../hooks/useEmployDashboard";
import Loading from "../Loading";
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB");
}; 

const cleanWorkHour = (work_hour) => {
  const cleanText = work_hour.replace(/"/g, "");
  return cleanText === "0" ? "No Work Logged" : cleanText;
};

const formatPunchTimes = (working_hours) => {
  if (!working_hours  || working_hours.length === 0) {
    return ["No Punch Data"];
  }

  return working_hours.map((punch) => {
    const { punch_in_time, punch_out_time } = punch;
    return `${punch_in_time} - ${punch_out_time}`;
  })
};

const WorkHistoryTable = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");
  const { FetchMonthlyData, FetchweeklyData , isLoading } = useDashboardData();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selectedPeriod === "Weekly") {
      FetchweeklyData().then((res) => processData(res));
    } else if (selectedPeriod === "Monthly") {
      FetchMonthlyData().then((res) => processData(res));
    }
  }, [selectedPeriod]);

  const processData = (res) => {
    if (!res || res.length === 0) {
      setData([]);
      return;
    }

    const formattedData = res.map(({ date, work_hour, working_hour }) => ({
      date: formatDate(date),
      work_hour: cleanWorkHour(work_hour),
      punchTimes: formatPunchTimes(JSON.parse(working_hour)),
    }));

    setData(formattedData);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="md:p-6 bg-gray-50 rounded-lg shadow-sm">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Work History</h3>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <p className="text-gray-600 mb-4 sm:mb-0">
          Total Hours: <span className="font-bold text-gray-800">45 Hours</span>
        </p>
        <PeriodSelector
          onSelect={(e) => setSelectedPeriod(e)}
          selectedPeriod={selectedPeriod}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Date
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Punch In/Out Times
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Work Hours
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-4 px-6 text-center text-gray-500">
                  No work history available
                </td>
              </tr>
            ) : (
              data.map((entry, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {entry.date}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    <div className="flex flex-col space-y-2">
                      {entry.punchTimes.map((time, i) => (
                        <span key={i} className="block">
                          {time}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {entry.work_hour}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkHistoryTable;
