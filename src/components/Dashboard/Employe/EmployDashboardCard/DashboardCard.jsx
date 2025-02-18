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
      className="mx-auto p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Employee Dashboard
      </h2>

      <div className={"flex w-full gap-8"}>
        <div className="w-1/3">
          <ClockInCard />
        </div>
        <div className="w-2/3">
          <WorkerHistoryChart />
        </div>
      </div>

      <WorkHistoryTable />
    </motion.div>
  );
};

export default EmployeeDashboard;
