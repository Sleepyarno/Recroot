import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function NewTaskPage() {
  const [topic, setTopic] = useState('');
  const [researchDepth, setResearchDepth] = useState('Research Depth');
  const [researchSources, setResearchSources] = useState('Research Sources');

  const handleStartWorkflow = () => {
    console.log('Starting workflow with:', { topic, researchDepth, researchSources });
    // Add workflow start logic here
  };

  return (
    <div className="bg-[#161B22] rounded-lg p-6 text-white">
      <h1 className="text-2xl font-semibold mb-6">Recroot - New Content Task</h1>
      
      {/* Topic Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Topic</label>
        <input
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Advanced Research Settings */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-white mb-4">Advanced Research Settings</h2>
        
        {/* Research Depth */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Research Depth</label>
          <div className="relative">
            <select 
              value={researchDepth}
              onChange={(e) => setResearchDepth(e.target.value)}
              className="appearance-none w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Research Depth</option>
              <option>Basic</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Comprehensive</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Research Sources */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Research Sources</label>
          <div className="relative">
            <select 
              value={researchSources}
              onChange={(e) => setResearchSources(e.target.value)}
              className="appearance-none w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Research Sources</option>
              <option>Academic Papers</option>
              <option>News Articles</option>
              <option>Industry Reports</option>
              <option>Social Media</option>
              <option>All Sources</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Start Workflow Button */}
      <div className="flex justify-end">
        <button
          onClick={handleStartWorkflow}
          className="bg-gray-600 hover:bg-gray-500 text-white font-medium px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Start Workflow
        </button>
      </div>
    </div>
  );
} 