"use client";

import React, { useState } from "react";
import { FloatingNav } from "../components/Navbar"; // Adjust the path based on your project structure
import EmployeeSchedule from "./schedule";
import Request from "./request";
import Training from "./training";

export default function EmployeePage() {
  const [activeSection, setActiveSection] = useState("Schedule");

  // Define navigation items with links to specific sections
  const navItems = [
    { name: "Schedule", link: "#Schedule" },
    { name: "Request", link: "#Request" },
    { name: "Training", link: "#Training" },
    {
      name: "Manager",
      link: "/manager", // External link for manager page
    },
  ];

  return (
    <div className="min-h-screen bg-background text-black font-sans flex flex-col">
      {/* Floating Navbar */}
      <FloatingNav navItems={navItems} className="top-0" />

      {/* Page Content */}
      <main className="flex-grow text-center space-y-16">
        {/* Schedule Section */}
        <section id="Schedule" className="md:py-32 px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Schedule</h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            View your work schedule and upcoming shifts. Stay updated with your responsibilities and assigned tasks for the week.
          </p>

            {/* Render the EmployeeSchedule component */}
            <div className="w-full m-10 p-4 border border-gray-300 rounded-lg shadow-2xl">
            <EmployeeSchedule />
            </div>

        </section>

        {/* Request Section */}
        <section id="Request" className="py-10 md:py-32 px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Request</h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Submit requests for time off, shift changes, or other needs directly from this section.
          </p>

            {/* Render the Request component */}
            <div className="w-full m-10 p-4 border border-gray-300 rounded-lg shadow-2xl">
            <Request />
            </div>

        </section>

        {/* Training Section */}
        <section id="Training" className="py-10 md:py-32 px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Training</h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Access training materials and complete certifications to improve your skills and meet organizational standards.
          </p>

            {/* Render the Training component */}
            <div className="w-full m-10 p-4 border border-gray-300 rounded-lg shadow-2xl">
            <Training />
            </div>
        </section>
      </main>
    </div>
  );
}
