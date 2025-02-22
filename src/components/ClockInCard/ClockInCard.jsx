import { useEffect, useState } from "react";
import Button from "../Primitives/Button/Button";
import Card from "../Primitives/Card/Card";
import useDashboardData from "../../hooks/useEmployDashboard";

const ClockInCard = () => {
  const [isClockIn, setIsClockIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [dashboardData, setDashboardData] = useState({});
  const { fetchDashboardData, PunchInOut, isLoading } = useDashboardData();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
        setIsClockIn(data.currentlyWorking);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [clockInTime]);

  const handlePunch = async () => {
    const res = await PunchInOut();
    if (res.statusCode === 200) {
      setIsClockIn(!isClockIn);
      setClockInTime(isClockIn ? null : new Date());
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-8 w-full">
        <div className="grow">
          {isClockIn && (
            <div>
              <p className="text-green-600 font-semibold">You are clocked in!</p>
              <p className="text-gray-700 my-2">
                Clock-in Time: {clockInTime?.toLocaleTimeString()}
              </p>
            </div>
          )}
          <Button variant={isClockIn ? "outlined" : "filled"} onClick={handlePunch} loading={isLoading}>
            {isClockIn ? "Clock Out" : "Clock In"}
          </Button>
        </div>
        <div className="w-px bg-gray-300 self-stretch" />
        <div className="text-center">
          <p>Average Hr per day</p>
          <p className="text-2xl font-bold">{dashboardData.averageTime}</p>
        </div>
      </div>
      <div className="h-px bg-gray-200 self-stretch my-4" />
      <div>
        <p className="font-semibold">Last Clock in details</p>
        <p>In: {dashboardData.LastPunchOutData?.punch_in_time || "-"}</p>
        <p>Out: {dashboardData.LastPunchOutData?.punch_out_time || "-"}</p>
      </div>
    </Card>
  );
};

export default ClockInCard;
