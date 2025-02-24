import React, { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
    LineChart, Line, Legend
} from "recharts";
import useAdminHook from "../../../../hooks/useAdminHook";
import Loading from "../../../Loading";

const AttendanceGraph = ({ switchTab, viewId }) => {
    const { FetchMonthlyData, FetchweeklyData , loading } = useAdminHook();
    const [attendanceData, setAttendanceData] = useState([]);
    const [isWeekly, setIsWeekly] = useState(true);

    useEffect(() => {
        const id = viewId;
        if (isWeekly) {
            FetchweeklyData(id).then((res) => setAttendanceData(processData(res)));
        } else {
            FetchMonthlyData(id).then((res) => setAttendanceData(processData(res)));
        }
    }, [isWeekly, viewId]);

    const processData = (data) => {
        return data.map((entry) => {
            const workSeconds = timeToSeconds(entry.work_hour);
            return {
                date: entry.date,
                workHours: (workSeconds / 3600).toFixed(2), 
            };
        });
    };

    // Convert HH:MM:SS to seconds
    const timeToSeconds = (timeString) => {
        if (!timeString || typeof timeString !== "string") return 0;
        const parts = timeString.split(":").map(Number);
        return parts.length === 3 ? parts[0] * 3600 + parts[1] * 60 + parts[2] : 0;
    };
    if (loading) {
        return <Loading />;
      }
    return (
        <div className="p-4 w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <button onClick={()=>switchTab(0)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">Back</button>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Attendance Overview
                    </h2>
                </div>
                <div className="flex items-center space-x-2">
                    <select
                        onChange={(e) => setIsWeekly(e.target.value === "weekly")}
                        className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700 shadow-md focus:ring focus:ring-blue-300"
                    >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-6">
                <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Work Hours Per Day (Bar Chart)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={attendanceData}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="date" tick={{ fill: "#555" }} />
                        <YAxis label={{ value: "Hours", angle: -90, position: "insideLeft" }} />
                        <Tooltip contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: "5px" }} />
                        <Legend />
                        <Bar dataKey="workHours" fill="#0088FE" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Work Hours Trend (Line Chart)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={attendanceData}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="date" tick={{ fill: "#555" }} />
                        <YAxis label={{ value: "Hours", angle: -90, position: "insideLeft" }} />
                        <Tooltip contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: "5px" }} />
                        <Legend />
                        <Line type="monotone" dataKey="workHours" stroke="#FF8042" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AttendanceGraph;
