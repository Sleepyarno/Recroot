import React, { useState } from 'react';

// Mock data matching the screenshot
const mockDrafts = [
  {
    id: 1,
    title: 'Draft 1: Social Media Post',
    generatedOn: '2024-01-20',
    imageUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=200&fit=crop&crop=center'
  },
  {
    id: 2,
    title: 'Draft 2: Blog Post Outline',
    generatedOn: '2024-01-19',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center'
  },
  {
    id: 3,
    title: 'Draft 3: Email Newsletter',
    generatedOn: '2024-01-18',
    imageUrl: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=300&h=200&fit=crop&crop=center'
  }
];

export default function ReviewQueuePage() {
  const [drafts] = useState(mockDrafts);
  const [comments, setComments] = useState('');

  const handleApprove = () => {
    console.log('Approved with comments:', comments);
    // Add approval logic here
  };

  const handleReject = () => {
    console.log('Rejected with comments:', comments);
    // Add rejection logic here
  };

  return (
    <div className="bg-[#161B22] rounded-lg p-6 text-white">
      <h1 className="text-2xl font-semibold mb-6">Recroot - Content Approval Queue</h1>
      
      {/* Generated Drafts Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-white mb-6">Generated Drafts</h2>
        
        <div className="space-y-6">
          {drafts.map((draft) => (
            <div key={draft.id} className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">{draft.title}</h3>
                <p className="text-gray-400 text-sm mb-3">Generated on: {draft.generatedOn}</p>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  View Details
                </button>
              </div>
              <div className="ml-6">
                <img 
                  src={draft.imageUrl} 
                  alt={`Preview for ${draft.title}`}
                  className="w-48 h-32 object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions Section */}
      <div className="border-t border-gray-700 pt-6">
        <h2 className="text-lg font-medium text-white mb-4">Actions</h2>
        
        {/* Comments Textarea */}
        <div className="mb-6">
          <textarea
            placeholder="Optional comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleReject}
            className="bg-gray-600 hover:bg-gray-500 text-white font-medium px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reject
          </button>
          <button
            onClick={handleApprove}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
} 