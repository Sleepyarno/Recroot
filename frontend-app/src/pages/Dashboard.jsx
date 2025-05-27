import React, { useState } from 'react';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

// Mock data that matches the screenshot
const mockTasks = [
  { id: 1, taskName: 'Content Task 1', status: 'In Progress', workflow: 'Workflow A', date: '2024-07-28', progress: 50 },
  { id: 2, taskName: 'Content Task 2', status: 'Completed', workflow: 'Workflow B', date: '2024-07-25', progress: 100 },
  { id: 3, taskName: 'Content Task 3', status: 'Pending', workflow: 'Workflow A', date: '2024-07-24', progress: 0 },
  { id: 4, taskName: 'Content Task 4', status: 'In Progress', workflow: 'Workflow C', date: '2024-07-23', progress: 75 },
  { id: 5, taskName: 'Content Task 5', status: 'Completed', workflow: 'Workflow B', date: '2024-07-22', progress: 100 },
];

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-400';
      case 'In Progress': return 'text-blue-400';
      case 'Pending': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <span className={`text-sm ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

const ProgressBar = ({ progress }) => (
  <div className="flex items-center space-x-3">
    <div className="flex-1 bg-gray-700 rounded-full h-2">
      <div 
        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
    <span className="text-sm text-gray-300 w-8">{progress}</span>
  </div>
);

export default function DashboardPage() {
  const [tasks] = useState(mockTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Status');
  const [workflowFilter, setWorkflowFilter] = useState('Workflow');
  const [dateFilter, setDateFilter] = useState('Date');

  return (
    <div className="bg-[#161B22] rounded-lg p-6 text-white">
      <h1 className="text-2xl font-semibold mb-6">Recroot - Task Monitoring</h1>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="flex space-x-4 mb-6">
        <div className="relative">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Status</option>
            <option>Completed</option>
            <option>In Progress</option>
            <option>Pending</option>
          </select>
          <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
        
        <div className="relative">
          <select 
            value={workflowFilter}
            onChange={(e) => setWorkflowFilter(e.target.value)}
            className="appearance-none bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Workflow</option>
            <option>Workflow A</option>
            <option>Workflow B</option>
            <option>Workflow C</option>
          </select>
          <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
        
        <div className="relative">
          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="appearance-none bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Date</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Tasks Table */}
      <div className="overflow-hidden rounded-lg border border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Task Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Workflow</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Progress</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{task.taskName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={task.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{task.workflow}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{task.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ProgressBar progress={task.progress} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 