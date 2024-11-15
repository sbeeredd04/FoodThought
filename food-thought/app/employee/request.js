"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Default existing requests
const defaultRequests = [
  {
    id: 1,
    type: "Time Off",
    description: "Requested time off on Monday at 9:00 AM for 2 hour(s)",
    status: "Approved",
    handledBy: "Auto-approved by AI",
  },
  {
    id: 2,
    type: "Shift Change",
    description: "Requested shift change on Tuesday from 11:00 AM to 1:00 PM",
    status: "Pending",
    handledBy: "Awaiting Manager's Approval",
  },
  {
    id: 3,
    type: "Time Off",
    description: "Requested time off on Wednesday at 3:00 PM for 1 hour(s)",
    status: "Rejected",
    handledBy: "Rejected by Manager",
  },
  {
    id: 4,
    type: "Shift Change",
    description: "Requested shift change on Thursday from 9:00 AM to 11:00 AM",
    status: "Approved",
    handledBy: "Auto-approved by AI",
  },
  {
    id: 5,
    type: "Time Off",
    description: "Requested time off on Friday at 12:00 PM for 4 hour(s)",
    status: "Pending",
    handledBy: "Awaiting Manager's Approval",
  },
  {
    id: 6,
    type: "Shift Change",
    description: "Requested shift change on Saturday from 8:00 AM to 4:00 PM",
    status: "Approved",
    handledBy: "Auto-approved by AI",
  },
  {
    id: 7,
    type: "Time Off",
    description: "Requested time off on Sunday at 10:00 AM for 5 hour(s)",
    status: "Pending",
    handledBy: "Awaiting Manager's Approval",
  },
  {
    id: 8,
    type: "Shift Change",
    description: "Requested shift change on Monday from 2:00 PM to 6:00 PM",
    status: "Rejected",
    handledBy: "Rejected by Manager",
  },
  {
    id: 9,
    type: "Time Off",
    description: "Requested time off on Tuesday at 11:00 AM for 3 hour(s)",
    status: "Approved",
    handledBy: "Auto-approved by AI",
  },
  {
    id: 10,
    type: "Shift Change",
    description: "Requested shift change on Wednesday from 3:00 PM to 7:00 PM",
    status: "Pending",
    handledBy: "Awaiting Manager's Approval",
  },
  {
    id: 11,
    type: "Time Off",
    description: "Requested time off on Thursday at 1:00 PM for 2 hour(s)",
    status: "Approved",
    handledBy: "Auto-approved by AI",
  },
  {
    id: 12,
    type: "Shift Change",
    description: "Requested shift change on Friday from 5:00 PM to 9:00 PM",
    status: "Pending",
    handledBy: "Awaiting Manager's Approval",
  },
  {
    id: 13,
    type: "Time Off",
    description: "Requested time off on Saturday at 8:00 AM for 3 hour(s)",
    status: "Rejected",
    handledBy: "Rejected by Manager",
  },
  {
    id: 14,
    type: "Shift Change",
    description: "Requested shift change on Sunday from 4:00 PM to 8:00 PM",
    status: "Approved",
    handledBy: "Auto-approved by AI",
  },
  {
    id: 15,
    type: "Time Off",
    description: "Requested time off on Monday at 9:00 AM for 6 hour(s)",
    status: "Pending",
    handledBy: "Awaiting Manager's Approval",
  },
  {
    id: 16,
    type: "Shift Change",
    description: "Requested shift change on Tuesday from 10:00 AM to 2:00 PM",
    status: "Approved",
    handledBy: "Auto-approved by AI",
  }
];

const Request = () => {
  const [requests, setRequests] = useState(defaultRequests);
  const [schedule, setSchedule] = useState({});
  const [activeSection, setActiveSection] = useState("All");

  const times = Array.from({ length: 12 }, (_, i) => `${i + 9}:00 ${i + 9 < 12 ? "AM" : "PM"}`);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await fetch("/api/schedule");
      if (response.ok) {
        const data = await response.json();
        setSchedule(data);
      } else {
        console.error("Failed to fetch schedule data");
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const updateSchedule = async (updatedSchedule) => {
    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSchedule),
      });
      if (!response.ok) {
        console.error("Failed to update schedule");
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  const handleShiftChangeRequest = () => {
    const currentEmployee = localStorage.getItem("currentEmployee");
    if (!currentEmployee) {
      alert("No employee selected. Please select an employee first.");
      return;
    }

    const day = prompt("Enter the day for shift change (e.g., Monday):");
    if (!day || !schedule[day]) {
      alert("Invalid day selected.");
      return;
    }

    const currentStart = prompt("Enter your current start time (e.g., 9:00 AM):");
    if (!currentStart || !times.includes(currentStart)) {
      alert("Invalid current start time.");
      return;
    }

    const newStart = prompt("Enter the new start time (e.g., 11:00 AM):");
    if (!newStart || !times.includes(newStart)) {
      alert("Invalid new start time.");
      return;
    }

    const updatedSchedule = { ...schedule };

    // Update the schedule with the shift change
    updatedSchedule[day] = updatedSchedule[day]?.map((entry) =>
      entry.time === currentStart && entry.employee === currentEmployee
        ? { ...entry, time: newStart }
        : entry
    );

    setSchedule(updatedSchedule);
    updateSchedule(updatedSchedule);

    const newRequest = {
      id: Date.now(),
      type: "Shift Change",
      description: `Requested shift change on ${day} from ${currentStart} to ${newStart}`,
      status: "Approved",
      handledBy: "Auto-approved by AI",
    };

    setRequests((prev) => [newRequest, ...prev]); // Add new request to the top

    // Refresh the page to reflect changes in the schedule
    setTimeout(() => window.location.reload(), 500);
  };

  const handleTimeOffRequest = () => {
    const currentEmployee = localStorage.getItem("currentEmployee");
    if (!currentEmployee) {
      alert("No employee selected. Please select an employee first.");
      return;
    }

    const day = prompt("Enter the day for time off (e.g., Monday):");
    if (!day || !schedule[day]) {
      alert("Invalid day selected.");
      return;
    }

    const time = prompt("Enter the start time for time off (e.g., 9:00 AM):");
    if (!time || !times.includes(time)) {
      alert("Invalid time selected.");
      return;
    }

    const hours = parseInt(prompt("Enter the number of hours (e.g., 2):"), 10);
    if (!hours || hours <= 0) {
      alert("Invalid hours entered.");
      return;
    }

    const startIndex = times.indexOf(time);
    const endIndex = Math.min(startIndex + hours, times.length);

    const conflictingEntries = schedule[day]?.filter((entry) =>
      times.slice(startIndex, endIndex).some((t) => t === entry.time)
    );

    const status = conflictingEntries.length > 0 ? "Pending" : "Approved";
    const handledBy = conflictingEntries.length > 0 ? "Awaiting Manager's Approval" : "Auto-approved by AI";

    if (status === "Approved") {
      const updatedSchedule = { ...schedule };
      updatedSchedule[day] = updatedSchedule[day]?.filter(
        (entry) => !times.slice(startIndex, endIndex).includes(entry.time)
      );
      setSchedule(updatedSchedule);
      updateSchedule(updatedSchedule);
    }

    const newRequest = {
      id: Date.now(),
      type: "Time Off",
      description: `Requested time off on ${day} at ${time} for ${hours} hour(s)`,
      status,
      handledBy,
    };

    setRequests((prev) => [newRequest, ...prev]); // Add new request to the top
  };

  const pendingRequests = requests.filter((request) => request.status === "Pending");
  const completedRequests = requests.filter((request) => request.status === "Approved");
  const rejectedRequests = requests.filter((request) => request.status === "Rejected");

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 md:p-8">
      {/* Top Section: Buttons */}
      <div className="mb-8 flex flex-wrap justify-center space-x-2 space-y-2 md:space-y-0 md:space-x-4">
        <button
          onClick={handleTimeOffRequest}
          className="px-3 py-2 text-xs md:text-sm font-medium bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Request Time Off
        </button>
        <button
          onClick={handleShiftChangeRequest}
          className="px-3 py-2 text-xs md:text-sm font-medium bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600"
        >
          Request Shift Change
        </button>
        <button
          className="px-3 py-2 text-xs md:text-sm font-medium bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          disabled
        >
          Custom Request (Coming Soon)
        </button>
      </div>
  
      {/* Request List */}
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">Your Requests</h2>
  
        {/* Pending Requests */}
        <div className="mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700">Pending</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs md:text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-2 md:px-4 py-2 border border-gray-300">Type</th>
                  <th className="text-left px-2 md:px-4 py-2 border border-gray-300">Description</th>
                  <th className="text-left px-2 md:px-4 py-2 border border-gray-300">Status</th>
                  <th className="text-left px-2 md:px-4 py-2 border border-gray-300">Handled By</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {pendingRequests.map((request) => (
                    <motion.tr
                      key={request.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-2 md:px-4 py-2 border border-gray-300">{request.type}</td>
                      <td className="px-2 md:px-4 py-2 border border-gray-300">{request.description}</td>
                      <td
                        className={`px-2 md:px-4 py-2 border border-gray-300 font-bold ${
                          request.status === "Approved"
                            ? "text-green-500"
                            : request.status === "Pending"
                            ? "text-orange-500"
                            : "text-red-500"
                        }`}
                      >
                        {request.status}
                      </td>
                      <td className="px-2 md:px-4 py-2 border border-gray-300 text-gray-600">
                        {request.handledBy}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
  
        {/* Completed Requests */}
        <div className="mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700">Completed</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs md:text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-2 md:px-4 py-2 border border-gray-300">Type</th>
                  <th className="text-left px-2 md:px-4 py-2 border border-gray-300">Description</th>
                  <th className="text-left px-2 md:px-4 py-2 border border-gray-300">Status</th>
                  <th className="text-left px-2 md:px-4 py-2 border border-gray-300">Handled By</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {completedRequests.map((request) => (
                    <motion.tr
                      key={request.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-2 md:px-4 py-2 border border-gray-300">{request.type}</td>
                      <td className="px-2 md:px-4 py-2 border border-gray-300">{request.description}</td>
                      <td
                        className={`px-2 md:px-4 py-2 border border-gray-300 font-bold ${
                          request.status === "Approved"
                            ? "text-green-500"
                            : request.status === "Pending"
                            ? "text-orange-500"
                            : "text-red-500"
                        }`}
                      >
                        {request.status}
                      </td>
                      <td className="px-2 md:px-4 py-2 border border-gray-300 text-gray-600">
                        {request.handledBy}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
  
        {/* Rejected Requests */}
        <div className="mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700">Rejected</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs md:text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-2 md:px-4 py-2 border border-gray-300">Type</th>
                  <th className="text-left px-2 md:px-4 py-2 border border-gray-300">Description</th>
                  <th className="text-left px-2 md:px-4 py-2 border border-gray-300">Status</th>
                  <th className="text-left px-2 md:px-4 py-2 border border-gray-300">Handled By</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {rejectedRequests.map((request) => (
                    <motion.tr
                      key={request.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-2 md:px-4 py-2 border border-gray-300">{request.type}</td>
                      <td className="px-2 md:px-4 py-2 border border-gray-300">{request.description}</td>
                      <td
                        className={`px-2 md:px-4 py-2 border border-gray-300 font-bold ${
                          request.status === "Approved"
                            ? "text-green-500"
                            : request.status === "Pending"
                            ? "text-orange-500"
                            : "text-red-500"
                        }`}
                      >
                        {request.status}
                      </td>
                      <td className="px-2 md:px-4 py-2 border border-gray-300 text-gray-600">
                        {request.handledBy}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default Request;
