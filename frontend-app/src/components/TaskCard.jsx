import React from 'react';
import { Link } from 'react-router-dom';

// Mock stages for the visual indicator
const STAGES = ['Idea', 'Research', 'Drafting', 'Review', 'Published'];

const TaskCard = ({ task }) => {
  const { id, topic, currentStage, lastUpdate } = task;

  const getStageColor = (stage, index) => {
    const stageIndex = STAGES.indexOf(currentStage);
    if (index < stageIndex) return 'bg-green-500'; // Completed stage
    if (index === stageIndex) return 'bg-yellow-500'; // Current stage
    return 'bg-gray-600'; // Future stage
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white mb-4">
      <h3 className="text-xl font-semibold mb-2 truncate" title={topic}>{topic}</h3>
      <p className="text-sm text-gray-400 mb-1">Current Stage: <span className="font-medium text-yellow-400">{currentStage}</span></p>
      <p className="text-sm text-gray-400 mb-4">Last Updated: {new Date(lastUpdate).toLocaleString()}</p>
      
      {/* Visual Stage Indicator */}
      <div className="flex items-center mb-4">
        {STAGES.map((stage, index) => (
          <React.Fragment key={stage}>
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${getStageColor(stage, index)}`}></div>
              <span className={`mt-1 text-xs ${STAGES.indexOf(currentStage) >= index ? 'text-gray-300' : 'text-gray-500'}`}>{stage}</span>
            </div>
            {index < STAGES.length - 1 && (
              <div className={`flex-grow h-0.5 ${STAGES.indexOf(currentStage) > index ? 'bg-green-500' : 'bg-gray-600'} mx-1`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <Link 
        to={`/task/${id}`}
        className="inline-block mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        View Details
      </Link>
    </div>
  );
};

export default TaskCard; 