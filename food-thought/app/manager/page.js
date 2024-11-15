"use client";

import React, { useState } from "react";
import { FloatingNav } from "../components/Navbar"; // Adjust the path based on your project structure
import { useRouter } from "next/navigation";
import Scheduler from "./scheduler";
import Alert from "./alerts";

export default function ManagerPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("Scheduler");

  // Define navigation items with links to specific sections
  const navItems = [
    { name: "Scheduler", link: "#Scheduler" },
    { name: "Alerts", link: "#Alerts" },
    { name: "Manager", link: "#Manager" },
    {
      name: "Employee",
      link: "/employee", // External link for employee page
    },
  ];

  return (
    <div className="min-h-screen bg-background text-black font-sans flex flex-col">
        {/* Sticky Container for Navbar */}
        <div className="sticky top-0 z-50 flex justify-center">
            <FloatingNav navItems={navItems} className="top-0 z-50" />
        </div>

      {/* Page Content */}
      <main className="flex-grow text-center p-4 sm:p-8 space-y-12 sm:space-y-16">
        {/* Scheduler Section */}
        <section
          id="Scheduler"
          className="py-10 sm:py-20 px-2 sm:px-8 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">
            Scheduler
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Manage and create schedules for employees. Organize work shifts and assign tasks effectively.
          </p>

          {/* Render the Scheduler component */}
          <div className="mt-6 sm:mt-10 p-4 sm:p-6 border border-gray-300 rounded-lg shadow-lg">
            <Scheduler />
          </div>
        </section>

        {/* Alerts Section */}
        <section
          id="Alerts"
          className="py-10 sm:py-20 px-2 sm:px-8 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">
            Alerts
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            View and manage alerts. Handle critical notifications related to staffing, shifts, and operations.
          </p>

          {/* Render the Alert component */}
          <div className="mt-6 sm:mt-10">
            <Alert />
          </div>
        </section>

        {/* Manager Section */}
        <section
          id="Manager"
          className="py-10 sm:py-20 px-2 sm:px-8 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">
            Manager Dashboard
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Welcome to the manager’s dashboard! Manage operations, view reports, and handle other administrative tasks efficiently.
          </p>
        </section>
      </main>
    </div>
  );
}
