import React, { useEffect, useState } from "react";
import PeriodSelector from "./PeriodSelector";
import { motion } from "framer-motion";
import workHistoryy from "../../utils/WorkingHour";
import workHistoryRawData from "../../utils/workHistoryRawData";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year}`;
};

const formatTime = (isoString) => {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const WorkHistoryTable = () => {
  const [selectedPeroid, setSelectedPeriod] = useState("Weekly");
  const [workHistory, setWorkHistory] = useState([]);

  useEffect(() => {
    setWorkHistory(workHistoryy);
  }, []);

  const getFilteredWorkHistory = () => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    if (selectedPeroid === "Daily") {
      return workHistory.filter((entry) => entry.date === today);
    }

    if (selectedPeroid === "Weekly") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
      return workHistory.filter(
        (entry) => new Date(entry.date) >= sevenDaysAgo
      );
    }

    if (selectedPeroid === "Monthly") {
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return workHistory.filter(
        (entry) => new Date(entry.date) >= firstDayOfMonth
      );
    }

    return workHistory;
  };

  const filterDataByPeriod = () => {
    const now = new Date();
    const days = selectedPeroid === "Weekly" ? 7 : 30;
    const cutoffDate = new Date();
    cutoffDate.setDate(now.getDate() - days); // Ensuring correct calculation

    return workHistoryRawData
      .filter((entry) => new Date(entry.date) >= cutoffDate)
      .sort((a, b) => new Date(b.in) - new Date(a.in));
  };

  console.log(selectedPeroid);

  const filteredWorkHistory = getFilteredWorkHistory();

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mt-8">Work History</h3>

      <div className="flex justify-between items-center">
        <p>
          Total Hours: <span className="font-bold">45 Hours</span>
        </p>
        <PeriodSelector
          onSelect={(e) => setSelectedPeriod(e)}
          selectedPeriod={selectedPeroid}
        />
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-auto max-h-96 ring-1 shadow-sm ring-black/5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Clock In
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Clock Out
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Total Hours
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filterDataByPeriod().map((history, index) => (
                    <motion.tr
                      key={history.date}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                        {formatDate(history.date)}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {formatTime(history.in)}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {formatTime(history.out)}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                       5 hours
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkHistoryTable;
