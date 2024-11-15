"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FloatingNav } from "./components/Navbar"; // Ensure the path to Navbar is correct
import "./globals.css";

export default function Home() {
  const router = useRouter();

  // Define navigation items for FloatingNav
  const navItems = [
    { name: "Home", link: "/manager" }, // Navigates to the Manager page
    { name: "About Us", link: "#about" }, // Scrolls to the About Us section
    { name: "Login", link: "#" }, // Placeholder for Login route
  ];

  const handleGetStarted = () => {
    router.push("/manager");
  };

  return (
    <div className="min-h-screen bg-background text-black font-sans flex flex-col">
      {/* Floating Navigation Bar */}
      <FloatingNav navItems={navItems} className="top-0" />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center p-8 space-y-8">
        {/* Welcome Message */}
        <section className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to Food <span className="text-primary">Thought</span>
          </h1>
          <p className="text-lg text-neutral-800 mt-2">
            JOB TO BE DONE: Develop a streamlined management system that
            enhances communication, aligns staff roles, and optimizes operations
            to boost employee satisfaction.
          </p>
        </section>

        {/* Get Started Button */}
        <section>
          <button
            onClick={handleGetStarted}
            className="mt-6 px-8 py-3 bg-secondary text-white text-lg font-semibold rounded-full shadow-md hover:bg-primary-dark transition-all"
          >
            Get Started
          </button>
        </section>
      </main>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white text-neutral-900 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-gray-700">
            At Food Thought, we are committed to providing solutions that streamline
            management, enhance communication, and improve staff satisfaction in the
            food industry. Our system is designed to meet the unique challenges faced
            by managers and employees alike.
          </p>
        </div>
      </section>
    </div>
  );
}
