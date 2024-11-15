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
      {/* Floating Navbar without shadow */}
      <FloatingNav navItems={navItems} className="top-0" />

      {/* Page Content */}
      <main className="flex-grow text-center p-8 space-y-16">
        {/* Scheduler Section */}
        <section id="Scheduler" className="py-20 md:py-32 px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Scheduler</h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Manage and create schedules for employees. This section will allow you to organize work shifts and assign tasks effectively.
          </p>

         {/* Render the Scheduler component */}
            <div className="w-full m-10 p-4 border border-gray-300 rounded-lg shadow-2xl">
            <Scheduler />
            </div>
        </section>

        {/* Alerts Section */}
        <section id="Alerts" className="py-20 md:py-32 px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Alerts</h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            View and manage alerts. Here, you can handle critical notifications related to staffing, shifts, and operations.
          </p>

            {/* Render the Alert component */}
            <Alert />
        </section>

        {/* Manager Section */}
        <section id="Manager" className="py-20 md:py-32 px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Manager Dashboard</h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Welcome to the manager’s dashboard! This section will help you manage operations, view reports, and handle other administrative tasks.
          </p>
        </section>
      </main>
    </div>
  );
}
