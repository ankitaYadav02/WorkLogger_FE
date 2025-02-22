const EmpDatta = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    monthly_summary: {
      total_days_present: 22,
      total_working_hours: "176 hours",
      total_overtime_hours: "8 hours",
      late_arrivals: 3,
    },
    daily_attendance: {},
  };
  
  // Function to generate last 30 days' attendance data
  const generateLast30DaysData = () => {
    const today = new Date();
  
    for (let i = 0; i < 30; i++) {
      let date = new Date();
      date.setDate(today.getDate() - i);
  
      let formattedDate = date.toISOString().split("T")[0]; // Format YYYY-MM-DD
  
      let punches = [];
      let numPunches = Math.floor(Math.random() * 3) + 2; // 2 to 4 punches
      let totalMinutesWorked = 0;
  
      for (let j = 0; j < numPunches; j++) {
        let hour = Math.floor(Math.random() * 5) + 8; // 8 AM - 12 PM for clock-in
        let min = Math.floor(Math.random() * 60);
        let clock_in = `${hour}:${min < 10 ? "0" : ""}${min} AM`;
  
        let outHour = hour + Math.floor(Math.random() * 3) + 1; // 1-3 hours later
        let outMin = Math.floor(Math.random() * 60);
        let clock_out = `${outHour}:${outMin < 10 ? "0" : ""}${outMin} PM`;
  
        punches.push({ punch_in: clock_in, punch_out: clock_out });
  
        // Calculate working time in minutes
        let timeWorked = (outHour * 60 + outMin) - (hour * 60 + min);
        totalMinutesWorked += timeWorked;
      }
  
      let hoursWorked = Math.floor(totalMinutesWorked / 60);
      let minutesWorked = totalMinutesWorked % 60;
      let total_working_hours = `${hoursWorked}h ${minutesWorked}m`;
  
      EmpDatta.daily_attendance[formattedDate] = { punches, total_working_hours };
    }
  };
  
  // Generate the data
  generateLast30DaysData();
  
  export default EmpDatta;
  