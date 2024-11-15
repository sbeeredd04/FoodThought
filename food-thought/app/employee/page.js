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
        {/* Sticky Container for Navbar */}
        <div className="sticky top-0 z-50 flex justify-center">
            <FloatingNav navItems={navItems} className="top-0 z-50" />
        </div>

      {/* Page Content */}
      <main className="flex-grow text-center space-y-12 sm:space-y-16 p-4 sm:p-8">
        {/* Schedule Section */}
        <section id="Schedule" className="py-10 sm:py-20 px-4 sm:px-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">
            Schedule
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            View your work schedule and upcoming shifts. Stay updated with your responsibilities and assigned tasks for the week.
          </p>

          {/* Render the EmployeeSchedule component */}
          <div className="w-full mt-6 sm:mt-10 p-4 border border-gray-300 rounded-lg shadow-lg">
            <EmployeeSchedule />
          </div>
        </section>

        {/* Request Section */}
        <section id="Request" className="py-10 sm:py-20 px-4 sm:px-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">
            Request
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Submit requests for time off, shift changes, or other needs directly from this section.
          </p>

          {/* Render the Request component */}
          <div className="w-full mt-6 sm:mt-10 p-4 border border-gray-300 rounded-lg shadow-lg">
            <Request />
          </div>
        </section>

        {/* Training Section */}
        <section id="Training" className="py-10 sm:py-20 px-4 sm:px-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">
            Training
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Access training materials and complete certifications to improve your skills and meet organizational standards.
          </p>

          {/* Render the Training component */}
          <div className="w-full mt-6 sm:mt-10 p-4 border border-gray-300 rounded-lg shadow-lg">
            <Training />
          </div>
        </section>
      </main>
    </div>
  );
}
