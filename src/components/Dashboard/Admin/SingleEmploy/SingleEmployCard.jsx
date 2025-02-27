import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ButtonCard from "../../../Primitives/Button/ButoonCard";
import useAdminHook from "../../../../hooks/useAdminHook";
import { useSnackbar } from "notistack";
import Loading from "../../../Loading";

const AttendanceList = ({ switchTab, viewId }) => {
  const [attendanceData, setAttendanceData] = useState({});
  const [editingDate, setEditingDate] = useState(null);
  const [errorFields, setErrorFields] = useState({});
  const { getAttendence, loading, UpdateWorking_Hour } = useAdminHook();
  const { enqueueSnackbar } = useSnackbar();
  const fetchData = async () => {
    try {
      const id = viewId;
      const data = await getAttendence(id);
      console.log(data);
      const formattedData = data.reduce((acc, entry) => {
        acc[entry.date] = entry;
        return acc;
      }, {});

      setAttendanceData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (date, index, field, value) => {
    setAttendanceData((prevData) => {
      if (!prevData[date] || !prevData[date].working_hour) return prevData;
      const newData = { ...prevData };
      newData[date] = { ...newData[date] };
      newData[date].working_hour = [...newData[date].working_hour];
      newData[date].working_hour[index] = {
        ...newData[date].working_hour[index],
        [field]: value,
      };

      return newData;
    });
    setErrorFields((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value.trim() !== "") {
        delete newErrors[`${date}-${index}-${field}`];
      }
      return newErrors;
    });
  };



  const handleAddPunch = (date) => {
    setAttendanceData((prevData) => {
      if (!prevData[date] || !prevData[date].working_hour) return prevData;
      return {
        ...prevData,
        [date]: {
          ...prevData[date],
          working_hour: [
            ...prevData[date].working_hour,
            { punch_in_time: "", punch_out_time: "" },
          ],
        },
      };
    });
    if (errorFields[`${date}-0-punch_in_time`]) {
      setErrorFields((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[`${date}-0-punch_in_time`];
        delete newErrors[`${date}-0-punch_out_time`];
        return newErrors;
      });
    }
  };
  const handleSaveChanges = async (date) => {
    const punches = attendanceData[date]?.working_hour || [];
    let errors = {};
    punches.forEach((item, index) => {
      if (!item.punch_in_time.trim()) {
        errors[`${date}-${index}-punch_in_time`] = true;
      }
      if (!item.punch_out_time.trim()) {
        errors[`${date}-${index}-punch_out_time`] = true;
      }
    });

    if (Object.keys(errors).length > 0) {
      setErrorFields(errors);
      alert("Please fill all required fields.");
      return;
    }

    const id = attendanceData[date].id;
    const working_hour = punches.map((punch) => ({
      punch_in_time: punch.punch_in_time,
      punch_out_time: punch.punch_out_time,
    }));

    const res = await UpdateWorking_Hour(id, working_hour);
    if (res.status == 200) {
      enqueueSnackbar(res.data.message, { variant: "success" });
    } else {
      enqueueSnackbar(res.message, { variant: "error" });
    }
    setEditingDate(null);
    setErrorFields({});
  };
  const handleDeletePunch = async (date, index) => {
    setAttendanceData((prevData) => {
      const updatedPunches = prevData[date]?.working_hour.filter((_, i) => i !== index) || [];

      const updatedData = {
        ...prevData,
        [date]: { ...prevData[date], working_hour: updatedPunches },
      };
      UpdateWorking_Hour(prevData[date]?.id, updatedPunches).then((res) => {
        if (res.status === 200) {
          enqueueSnackbar(res.data.message, { variant: "success" });
        } else {
          enqueueSnackbar(res.message, { variant: "error" });
        }
      });

      return updatedData;
    });
  };
  if (loading) {
    return (
      <>
        <div className="w-full h-screen flex items-center justify-center">
          <div className="flex space-x-2">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full animate-bounce" style={{ animationDelay: "-0.3s" }}></div>
            <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full animate-bounce" style={{ animationDelay: "-0.15s" }}></div>
            <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-blue-800 rounded-full animate-bounce"></div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between">
        <div className="mb-4"> <ButtonCard title="Back" onClick={() => switchTab(0)} /></div>
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Attendance Records
        </h2>
      </div>


      {attendanceData && Object.keys(attendanceData).length > 0 ? (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {Object.keys(attendanceData).map((date) => {
            const punches = attendanceData[date]?.working_hour || [];
            return (
              <motion.div
                key={date}
                className="bg-white p-4 rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">{attendanceData[date]?.date}</h3>
                  <button
                    onClick={() =>
                      editingDate === date ? handleSaveChanges(date) : setEditingDate(date)
                    }
                    className={`text-sm text-white px-3 py-1 rounded ${editingDate === date
                      ? "bg-green-500 hover:bg-green-700"
                      : "bg-blue-500 hover:bg-blue-700"
                      } transition`}
                  >
                    {editingDate === date ? "Save" : "Edit"}
                  </button>
                </div>

                <p className="text-sm text-gray-500 font-medium mt-2">
                  Total Working Hours: {attendanceData[date]?.work_hour || "N/A"}
                </p>

                {punches.map((punch, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm text-gray-600 border-b py-2 last:border-none"
                  >
                    {editingDate === date ? (
                      <>
                        <input
                          type="text"
                          list={`punch-in-times-${date}-${i}`}
                          value={punch.punch_in_time}
                          onChange={(e) => handleChange(date, i, "punch_in_time", e.target.value)}
                          className={`border p-2 rounded w-32 text-center ${errorFields[`${date}-${i}-punch_in_time`] ? "border-red-500" : ""
                            }`}
                          placeholder="HH:MM:SS"
                          required
                        />
                        <datalist id={`punch-in-times-${date}-${i}`}>
                          {Array.from({ length: 24 }, (_, h) =>
                            Array.from({ length: 60 }, (_, m) =>
                              ["00", "15", "30", "45"].map((s) => (
                                <option key={`${h}:${m}:${s}`} value={`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${s}`} />
                              ))
                            )
                          )}
                        </datalist>

                        <input
                          type="text"
                          list={`punch-out-times-${date}-${i}`}
                          value={punch.punch_out_time}
                          onChange={(e) => handleChange(date, i, "punch_out_time", e.target.value)}
                          className={`border p-2 rounded w-32 text-center ${errorFields[`${date}-${i}-punch_out_time`] ? "border-red-500" : ""
                            }`}
                          placeholder="HH:MM:SS"
                          required
                        />
                        <datalist id={`punch-out-times-${date}-${i}`}>
                          {Array.from({ length: 24 }, (_, h) =>
                            Array.from({ length: 60 }, (_, m) =>
                              ["00", "15", "30", "45"].map((s) => (
                                <option key={`${h}:${m}:${s}`} value={`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${s}`} />
                              ))
                            )
                          )}
                        </datalist>

                      </>


                    ) : (
                      <>
                        <span>{punch.punch_in_time}</span>
                        <span>{punch.punch_out_time}</span>
                        {editingDate !== date && (
                          <motion.button
                            onClick={() => handleDeletePunch(date, i, attendanceData[date]?.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                          >
                            Delete
                          </motion.button>
                        )}
                      </>
                    )}
                  </div>
                ))}

                {editingDate === date && (
                  <div className="mt-4">
                    <button
                      onClick={() => handleAddPunch(date)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                    >
                      Add New Punch
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No attendance records found.</p>
      )}
    </div>
  );
};

export default AttendanceList;