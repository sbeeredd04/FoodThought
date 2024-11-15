"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialAlerts = [
  { id: 1, message: "John Doe requested time off on Friday", type: "request" },
  { id: 2, message: "Kitchen inventory low on ingredients", type: "update" },
  { id: 3, message: "Alice requested time off on Monday", type: "request" },
  { id: 4, message: "Server update: Shift adjustments needed for next week", type: "update" },
  { id: 5, message: "Manager meeting scheduled for Thursday", type: "notice" },
  { id: 6, message: "Emergency maintenance required for freezer", type: "warning" },
  { id: 7, message: "James completed training certification", type: "success" },
  { id: 8, message: "New policy update on employee breaks", type: "update" },
  { id: 9, message: "AI Alert: Employee Bob was switched to a morning shift to balance workload", type: "ai" },
  { id: 10, message: "AI Alert: Alice's time off was auto-approved (enough staff available)", type: "ai" },
  { id: 11, message: "Server inventory will be audited next week", type: "notice" },
  { id: 12, message: "New updates in employee handbook available", type: "update" },
  { id: 13, message: "AI Alert: Shift reassignments successfully executed by AI scheduler", type: "ai" },
  { id: 14, message: "AI Alert: Charlie assigned as backup for morning shift", type: "ai" },
  { id: 15, message: "Power outage warning: Backup generators checked", type: "warning" },
  { id: 16, message: "Emma's holiday request auto-rejected due to understaffing", type: "ai" },
  { id: 17, message: "Critical stock alert: Low supplies in pantry", type: "warning" },
  { id: 18, message: "AI Alert: John's performance metrics have improved by 15%", type: "ai" },
  { id: 19, message: "Mary completed training certification for kitchen safety", type: "success" },
  { id: 20, message: "Weekly maintenance scheduled for oven equipment", type: "notice" },
];

const Alert = () => {
  const [alerts, setAlerts] = useState(initialAlerts);

  const handleAccept = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  const handleReject = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  const typeToColor = (type) => {
    switch (type) {
      case "request":
        return "text-blue-500";
      case "update":
        return "text-yellow-500";
      case "notice":
        return "text-purple-500";
      case "warning":
        return "text-red-500";
      case "success":
        return "text-green-500";
      case "ai":
        return "text-cyan-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-white text-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-4xl font-bold text-orange-500 mb-6 text-center">Alerts</h2>
      <p className="text-gray-600 mb-8 text-center text-lg">
        Manage alerts for employee requests, updates, AI notifications, and important tasks.
      </p>

      <div className="space-y-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <AnimatePresence>
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <motion.div
                key={alert.id}
                className="flex items-center bg-gray-50 p-5 rounded-lg shadow-md border border-gray-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex-1">
                  <p className={`text-lg font-medium ${typeToColor(alert.type)}`}>
                    {alert.type === "request" ? (
                      <span className="font-semibold">Request: </span>
                    ) : alert.type === "update" ? (
                      <span className="font-semibold">Update: </span>
                    ) : alert.type === "notice" ? (
                      <span className="font-semibold">Notice: </span>
                    ) : alert.type === "warning" ? (
                      <span className="font-semibold">Warning: </span>
                    ) : alert.type === "success" ? (
                      <span className="font-semibold">Success: </span>
                    ) : (
                      <span className="font-semibold">AI Alert: </span>
                    )}
                    {alert.message}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAccept(alert.id)}
                    className="px-4 py-2 text-sm font-semibold bg-green-500 hover:bg-green-600 text-white rounded-md transition-all shadow-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(alert.id)}
                    className="px-4 py-2 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white rounded-md transition-all shadow-sm"
                  >
                    Reject
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-gray-500 text-center py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              No alerts at this time.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Alert;
