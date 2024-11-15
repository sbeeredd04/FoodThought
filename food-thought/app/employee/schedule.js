"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EmployeeSchedule = () => {
  const [schedule, setSchedule] = useState({});
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [highlightedName, setHighlightedName] = useState(null);
  const [expandedEmployee, setExpandedEmployee] = useState(null);
  const [checklist, setChecklist] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [priority, setPriority] = useState("Normal");

  const times = Array.from({ length: 12 }, (_, i) => `${i + 9}:00 ${i + 9 < 12 ? "AM" : "PM"}`);

  useEffect(() => {
    fetchSchedule();
    const currentEmployee = localStorage.getItem("currentEmployee");
    if (currentEmployee) {
      setHighlightedName(currentEmployee);
    }
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

  const handleHighlight = (name) => {
    if (!highlightedName) {
      setHighlightedName(name);
      localStorage.setItem("currentEmployee", name); // Save the current session's employee
      setExpandedEmployee(null); // Reset expanded card if the name changes
    }
  };

  const resetHighlight = () => {
    setHighlightedName(null);
    localStorage.removeItem("currentEmployee");
    setExpandedEmployee(null);
  };

  const addTaskToChecklist = () => {
    if (!taskInput.trim()) return;
    setChecklist((prev) => [
      ...prev,
      { id: Date.now(), text: taskInput, completed: false, priority },
    ]);
    setTaskInput("");
    setPriority("Normal");
  };

  const toggleTaskCompletion = (taskId) => {
    setChecklist((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderChecklist = () => (
    <div className="w-full p-4 mt-6 border border-gray-300 rounded-lg shadow-md bg-gray-50">
      <h2 className="text-lg font-semibold text-primary mb-4">Checklist</h2>
      <div className="mb-4 flex items-center space-x-3">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-primary"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-2 py-2 border rounded-md"
        >
          <option value="High">High Priority</option>
          <option value="Normal">Normal Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <button
          onClick={addTaskToChecklist}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {checklist
          .filter((task) => !task.completed)
          .map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 border rounded-md bg-white"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="w-5 h-5 text-green-500 focus:ring-green-500"
                />
                <span className="text-gray-700">{task.text}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : task.priority === "Low"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            </li>
          ))}
      </ul>
      <h3 className="text-md font-semibold text-primary mt-6">Completed Tasks</h3>
      <ul className="space-y-2">
        {checklist
          .filter((task) => task.completed)
          .map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 border rounded-md bg-gray-100 line-through"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="w-5 h-5 text-green-500 focus:ring-green-500"
                />
                <span className="text-gray-500">{task.text}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : task.priority === "Low"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );

  const renderEmployeeModal = () => {
    if (!expandedEmployee) return null;

    const details = schedule[selectedDay]?.find((entry) => entry.employee === expandedEmployee);
    if (!details) return null;

    return (
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="bg-white rounded-lg p-6 w-1/3 shadow-md">
          <h3 className="text-xl font-semibold text-primary mb-4">Employee Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={expandedEmployee}
                className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                value={details.role}
                className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Instructions</label>
              <textarea
                value={details.instructions}
                className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="text"
                value={details.time}
                className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hours</label>
              <input
                type="number"
                value={details.hours || "1"}
                className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm"
                readOnly
              />
            </div>
          </div>
          <button
            onClick={() => setExpandedEmployee(null)}
            className="mt-6 w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </motion.div>
    );
  };


  const renderSchedule = () => (
    <motion.div
      key={selectedDay}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-[80px_1fr] gap-3">
        {/* Time Column */}
        <div className="flex flex-col space-y-2">
          {times.map((time) => (
            <div
              key={time}
              className="text-gray-700 text-sm flex items-center justify-center h-10 border-b border-gray-300"
            >
              {time}
            </div>
          ))}
        </div>

        {/* Schedule Column */}
        <div className="flex flex-col space-y-2">
          {times.map((time) => {
            const employeesAtTime = schedule[selectedDay]?.filter((entry) => entry.time === time) || [];

            return (
              <div
                key={time}
                className="h-10 border-b border-gray-300 relative flex items-center justify-start space-x-2"
              >
                {employeesAtTime.length > 0 ? (
                  employeesAtTime.map((entry, idx) => (
                    <motion.div
                      key={idx}
                      className={`px-4 py-2 rounded-md shadow-md flex flex-col justify-center relative w-fit cursor-pointer ${
                        highlightedName === entry.employee
                          ? "bg-green-200 border-green-400"
                          : "bg-primary text-white"
                      } ${
                        highlightedName && highlightedName !== entry.employee
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => {
                        if (!highlightedName || highlightedName === entry.employee) {
                          setExpandedEmployee(entry.employee);
                          handleHighlight(entry.employee);
                        }
                      }}
                    >
                      <p className="font-medium text-sm truncate">{entry.employee}</p>
                      <p className="text-xs truncate">{entry.role}</p>
                    </motion.div>
                  ))
                ) : (
                  <span className="text-xs text-gray-500 italic">No tasks</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col items-center h-screen bg-gray-50 text-black relative p-4">
      <div className="flex w-full max-w-6xl">
        {/* Left Side: Days of the Week */}
        <div className="w-1/4 bg-secondary text-white flex flex-col items-center py-4 space-y-2 rounded-r-lg shadow-md">
          <h2 className="text-lg font-bold text-white mb-4">This Week</h2>
          {Object.keys(schedule).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`w-3/4 py-2 text-sm font-medium rounded-lg ${
                selectedDay === day
                  ? "bg-primary text-white"
                  : "bg-white text-black hover:bg-primary hover:text-white"
              }`}
            >
              {day}
            </button>
          ))}
          <button
            onClick={resetHighlight}
            className="w-3/4 py-2 mt-4 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Reset
          </button>
        </div>

        {/* Right Side: Scheduler View */}
        <div className="w-3/4 p-4 overflow-y-auto relative rounded-l-lg shadow-md bg-white flex flex-col">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">Your Schedule This Week</h2>
            <AnimatePresence>{renderSchedule()}</AnimatePresence>
          </div>
        </div>
      </div>

      {/* Checklist Section Below */}
      <div className="w-full max-w-6xl mt-10">
        {renderChecklist()}
      </div>

      <AnimatePresence>{expandedEmployee && renderEmployeeModal()}</AnimatePresence>
    </div>
  );
};

export default EmployeeSchedule;