"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Default roles with instructions
const defaultRoles = {
  Chef: "Prepare meals and handle the kitchen.",
  Server: "Attend tables and assist customers.",
  Cleaner: "Maintain cleanliness in the premises.",
};

// Predefined Auto-Schedule Data
const autoScheduleData = [
  { day: "Monday", employee: "John", start: "10:00 AM", hours: 2, role: "Chef", instructions: "Prepare lunch" },
  { day: "Tuesday", employee: "Doe", start: "11:00 AM", hours: 3, role: "Server", instructions: "Serve tables 1-3" },
  { day: "Wednesday", employee: "Eve", start: "9:00 AM", hours: 4, role: "Manager", instructions: "Oversee operations" },
];

const Scheduler = () => {
  const [schedule, setSchedule] = useState({});
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [expandedEmployee, setExpandedEmployee] = useState(null);
  const [expandedDetails, setExpandedDetails] = useState({ startTime: "", hours: 1 });

  const times = Array.from({ length: 12 }, (_, i) => `${i + 9}:00 ${i + 9 < 12 ? "AM" : "PM"}`);

  // Load schedule from server on mount
  useEffect(() => {
    handlePullSchedule();
  }, []);

  // Convert time to index
  const timeToIndex = (time) => {
    const [hour, period] = time.split(" ");
    let index = parseInt(hour.split(":")[0], 10) - 9;
    if (period === "PM" && index < 3) index += 12;
    return index;
  };

  // Pull (fetch) schedule data from server
  const handlePullSchedule = async () => {
    try {
      const response = await fetch("/api/schedule");
      if (response.ok) {
        const data = await response.json();
        setSchedule(data);
      } else {
        console.error("Failed to fetch schedule data");
      }
    } catch (error) {
      console.error("Error pulling schedule:", error);
    }
  };

  // Post (save) current schedule data to server
  const handlePostSchedule = async () => {
    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schedule),
      });
      if (!response.ok) {
        console.error("Failed to post schedule");
      }
    } catch (error) {
      console.error("Error posting schedule:", error);
    }
  };

  // Add employee to schedule
  const handleAddEmployee = (day) => {
    const employeeName = prompt("Enter employee name:");
    if (!employeeName) return;

    const role = prompt(`Enter role for ${employeeName} (e.g., Chef, Server, Cleaner):`, Object.keys(defaultRoles)[0]) || "Custom";
    const customInstructions = prompt(`Enter custom instructions for ${employeeName} or leave blank to use default:`, defaultRoles[role] || "");
    const instructions = customInstructions || defaultRoles[role] || "No specific instructions.";

    const start = prompt("Enter start time (e.g., '9:00 AM'):", "9:00 AM");
    const hours = parseInt(prompt("Enter working hours:", "1"), 10) || 1;

    const startIndex = timeToIndex(start);
    const endIndex = Math.min(startIndex + hours, times.length);

    const newEntries = [];
    for (let i = startIndex; i < endIndex; i++) {
      newEntries.push({ time: times[i], employee: employeeName, role, instructions });
    }

    setSchedule((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), ...newEntries],
    }));
  };

  // Auto-schedule employees
  const handleAutoSchedule = () => {
    const updatedSchedule = { ...schedule };
    autoScheduleData.forEach(({ day, employee, start, hours, role, instructions }) => {
      const startIndex = timeToIndex(start);
      const endIndex = Math.min(startIndex + hours, times.length);

      const newEntries = [];
      for (let i = startIndex; i < endIndex; i++) {
        newEntries.push({ time: times[i], employee, role, instructions });
      }

      updatedSchedule[day] = [...(updatedSchedule[day] || []), ...newEntries];
    });
    setSchedule(updatedSchedule);
  };

  // Delete an employee from schedule
  const handleDeleteEmployee = (employee) => {
    setSchedule((prev) => ({
      ...prev,
      [selectedDay]: prev[selectedDay].filter((entry) => entry.employee !== employee),
    }));
    setExpandedEmployee(null);
  };

  // Save changes to employee's schedule in modal
  const handleSaveChanges = () => {
    const startIndex = timeToIndex(expandedDetails.startTime);
    const endIndex = Math.min(startIndex + expandedDetails.hours, times.length);

    const newEntries = [];
    for (let i = startIndex; i < endIndex; i++) {
      newEntries.push({
        time: times[i],
        employee: expandedEmployee,
        role: expandedDetails.role,
        instructions: expandedDetails.instructions,
      });
    }

    setSchedule((prev) => ({
      ...prev,
      [selectedDay]: [
        ...prev[selectedDay].filter((entry) => entry.employee !== expandedEmployee),
        ...newEntries,
      ],
    }));
    setExpandedEmployee(null); // Close modal
  };

  const renderEmployeeModal = () => {
    if (!expandedEmployee) return null;

    const details = schedule[selectedDay]?.find((entry) => entry.employee === expandedEmployee);
    if (!details) return null;

    return (
      <motion.div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="bg-white rounded-lg p-6 w-1/3 shadow-md">
          <h3 className="text-xl font-semibold text-primary mb-4">Employee Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" value={expandedEmployee} className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input type="text" value={details.role} className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Instructions</label>
              <textarea value={details.instructions} className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input type="text" value={expandedDetails.startTime} onChange={(e) => setExpandedDetails({ ...expandedDetails, startTime: e.target.value })} placeholder="e.g., 9:00 AM" className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hours</label>
              <input type="number" value={expandedDetails.hours} onChange={(e) => setExpandedDetails({ ...expandedDetails, hours: parseInt(e.target.value, 10) })} className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm" min="1" />
            </div>
          </div>
          <button onClick={handleSaveChanges} className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save Changes</button>
          <button onClick={() => handleDeleteEmployee(expandedEmployee)} className="mt-3 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Delete Employee</button>
          <button onClick={() => setExpandedEmployee(null)} className="mt-3 w-full px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Close</button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex h-screen bg-background relative">
      {/* Left Side: Days of the Week */}
      <div className="w-1/4 bg-secondary text-white flex flex-col items-center py-4 space-y-2">
        {Object.keys(schedule).map((day) => (
          <button key={day} onClick={() => setSelectedDay(day)} className={`w-3/4 py-2 text-sm font-medium rounded-lg ${selectedDay === day ? "bg-primary" : "bg-white text-black hover:bg-primary hover:text-white"}`}>
            {day}
          </button>
        ))}
        <button onClick={handlePostSchedule} className="w-3/4 mt-auto py-2 bg-green-500 text-white text-sm rounded-lg shadow-md hover:bg-green-600 transition-all">Post Schedule</button>
        <button onClick={handlePullSchedule} className="w-3/4 mt-2 py-2 bg-blue-500 text-white text-sm rounded-lg shadow-md hover:bg-blue-600 transition-all">Pull Schedule</button>
      </div>

      {/* Right Side: Scheduler View */}
      <div className="w-3/4 p-4 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          <motion.div key={selectedDay} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">{selectedDay}'s Schedule</h2>
              <button onClick={() => handleAddEmployee(selectedDay)} className="px-3 py-1 bg-secondary text-white rounded-md text-sm shadow-md hover:bg-secondary-dark transition-all">Add Employee</button>
            </div>

            <div className="grid grid-cols-[80px_1fr] gap-3">
              {/* Time Column */}
              <div className="flex flex-col space-y-2">
                {times.map((time) => (
                  <div key={time} className="text-gray-700 text-sm flex items-center justify-center h-10 border-b border-gray-300">{time}</div>
                ))}
              </div>

              {/* Schedule Column */}
              <div className="flex flex-col space-y-2">
                {times.map((time) => {
                  const employeesAtTime = schedule[selectedDay]?.filter((entry) => entry.time === time) || [];
                  return (
                    <div key={time} className="h-10 border-b border-gray-300 relative flex items-center justify-start space-x-2">
                      {employeesAtTime.length > 0 ? employeesAtTime.map((entry, idx) => (
                        <motion.div key={idx} className="px-4 py-2 bg-primary text-white rounded-md shadow-md flex flex-col justify-center relative w-fit cursor-pointer" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} onClick={() => { setExpandedEmployee(entry.employee); setExpandedDetails({ startTime: entry.time, hours: 1 }); }}>
                          <p className="font-medium text-sm truncate">{entry.employee}</p>
                          <p className="text-xs truncate">{entry.role}</p>
                        </motion.div>
                      )) : (
                        <span className="text-xs text-gray-500 italic">+ Add Employee</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <button onClick={handleAutoSchedule} className="absolute bottom-4 right-4 px-4 py-2 bg-primary text-white text-xs rounded-md shadow-md hover:bg-primary-dark transition-all">Auto-Schedule</button>
      </div>
      <AnimatePresence>{expandedEmployee && renderEmployeeModal()}</AnimatePresence>
    </div>
  );
};

export default Scheduler;
