"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const trainingModules = [
  {
    id: 1,
    title: "Safety Protocols",
    description: "Learn about workplace safety, emergency procedures, and hazard prevention.",
    instructions: [
      "Watch the safety training video.",
      "Complete the quiz at the end of the module.",
      "Submit your certification for verification.",
    ],
  },
  {
    id: 2,
    title: "Customer Service",
    description: "Master the art of providing excellent service to customers.",
    instructions: [
      "Read the customer service handbook.",
      "Participate in role-playing scenarios.",
      "Submit your completed feedback form.",
    ],
  },
  {
    id: 3,
    title: "Technical Skills",
    description: "Gain proficiency in using restaurant management software.",
    instructions: [
      "Watch the software tutorial video.",
      "Practice on the demo platform.",
      "Take the skills assessment test.",
    ],
  },
];

const Training = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [progress, setProgress] = useState({});

  const handleCompleteStep = (moduleId, stepIndex) => {
    setProgress((prev) => {
      const moduleProgress = prev[moduleId] || [];
      const newProgress = [...new Set([...moduleProgress, stepIndex])];
      return { ...prev, [moduleId]: newProgress };
    });
  };

  const renderInstructions = (module) => {
    const moduleProgress = progress[module.id] || [];
    const stepsCompleted = moduleProgress.length;
    const totalSteps = module.instructions.length;
    const progressPercent = Math.round((stepsCompleted / totalSteps) * 100);

    return (
      <div className="mt-4 space-y-4">
        <p className="text-lg font-semibold text-primary">
          Progress: {progressPercent}% ({stepsCompleted}/{totalSteps})
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <ul className="space-y-2">
          {module.instructions.map((instruction, index) => (
            <li key={index} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={moduleProgress.includes(index)}
                onChange={() => handleCompleteStep(module.id, index)}
                className="w-5 h-5 text-green-500 rounded-md focus:ring-green-500"
              />
              <span
                className={`text-gray-700 ${
                  moduleProgress.includes(index) ? "line-through" : ""
                }`}
              >
                {instruction}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black p-8">
      <h2 className="text-4xl font-bold text-primary mb-8 text-center">Training Modules</h2>
      <div className="space-y-6">
        {trainingModules.map((module) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-semibold text-primary">{module.title}</h3>
            <p className="text-gray-700 mt-2">{module.description}</p>
            <button
              onClick={() =>
                setActiveModule((prev) => (prev === module.id ? null : module.id))
              }
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {activeModule === module.id ? "Hide Instructions" : "View Instructions"}
            </button>
            {activeModule === module.id && renderInstructions(module)}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Training;
