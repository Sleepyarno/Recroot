import React, { useState } from 'react';

const ReviewItem = ({ item, onApprove, onReject }) => {
  const { id, topic, draftContent, imageUrl } = item;
  const [showRejectionInput, setShowRejectionInput] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleRejectClick = () => {
    setShowRejectionInput(true);
  };

  const handleConfirmReject = () => {
    onReject(id, rejectionReason);
    setShowRejectionInput(false); // Optionally hide after submitting
    setRejectionReason(''); // Reset reason
  };

  const handleApproveClick = () => {
    onApprove(id);
    setShowRejectionInput(false); // Ensure rejection input is hidden if previously shown
    setRejectionReason('');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
      <h3 className="text-2xl font-semibold text-white mb-3 truncate" title={topic}>{topic}</h3>
      
      {imageUrl && (
        <div className="mb-4 flex justify-center">
          <img 
            src={imageUrl} 
            alt={`Preview for ${topic}`} 
            className="max-w-sm max-h-72 rounded-md shadow-lg border-2 border-gray-700 object-contain"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">Draft Content:</label>
        <div 
          className="w-full p-3 bg-gray-900 text-gray-300 rounded-md shadow-inner text-sm whitespace-pre-wrap overflow-auto h-64 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-readonly="true"
          role="textbox"
        >
          {draftContent || 'No draft content available.'}
        </div>
      </div>

      {!showRejectionInput ? (
        <div className="flex items-center justify-end space-x-3 mt-4">
          <button 
            onClick={handleRejectClick} 
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-colors duration-150"
          >
            Reject
          </button>
          <button 
            onClick={handleApproveClick} 
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-colors duration-150"
          >
            Approve
          </button>
        </div>
      ) : (
        <div className="mt-4 border-t border-gray-700 pt-4">
          <label htmlFor={`rejectionReason-${id}`} className="block text-sm font-medium text-gray-300 mb-1">
            Reason for Rejection (Optional):
          </label>
          <textarea
            id={`rejectionReason-${id}`}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            rows="3"
            className="form-textarea mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            placeholder="e.g., Needs more examples, incorrect tone..."
          />
          <div className="flex items-center justify-end space-x-3 mt-3">
            <button 
              onClick={() => setShowRejectionInput(false)} 
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors duration-150"
            >
              Cancel
            </button>
            <button 
              onClick={handleConfirmReject} 
              className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-75 transition-colors duration-150"
            >
              Confirm Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewItem; 