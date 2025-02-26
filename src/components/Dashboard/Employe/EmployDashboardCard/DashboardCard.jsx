import { motion } from "framer-motion";
import ClockInCard from "../../../ClockInCard/ClockInCard";
import WorkerHistoryChart from "../../../ClockInCard/WorkerHistoryChart";
import WorkHistoryTable from "../../../ClockInCard/WorkHistoryTable";

const EmployeeDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto md:p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-2xl max-w-7xl w-full"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
         Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ClockInCard />
        <WorkerHistoryChart />
      </div>
      <div className="mt-8 bg-white rounded-lg shadow-lg md:p-4 overflow-x-auto">
        <WorkHistoryTable />
      </div>
    </motion.div>
  );
};

export default EmployeeDashboard;
