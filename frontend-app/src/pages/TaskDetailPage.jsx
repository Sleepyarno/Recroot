import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';

// Consistent STAGES definition (can be moved to a shared constants file later)
const STAGES = ['Idea', 'Research', 'Drafting', 'Review', 'Published'];

// Mock data for all tasks
const allMockTasks = {
  task1: {
    id: 'task1',
    topic: 'The Future of Renewable Energy',
    currentStage: 'Drafting',
    creationDate: new Date(2023, 0, 15).toISOString(),
    researchData: [
      { type: 'link', content: 'https://example.com/renewable-energy-trends', title: 'Renewable Energy Trends 2024' },
      { type: 'text', content: 'Solar power efficiency has increased by 20% in the last 5 years.', title: 'Key Stat on Solar' },
      { type: 'link', content: 'https://example.com/wind-power-innovations', title: 'Wind Power Innovations' },
    ],
    generatedIdeas: [
      { title: 'Top 5 Renewable Energy Sources for Homeowners', description: 'Idea 1' },
      { title: 'The Growth of Global Wind Power (Infographic)', description: 'Idea 2' },
      { title: '#GoGreenWithEnergy Social Media Campaign', description: 'Idea 3' },
    ],
    aiDraft: `Title: Harnessing the Sun: A Homeowner's Guide to Solar Energy\n\nIntroduction\nAs the world shifts towards sustainable living, renewable energy sources are gaining prominence. Among these, solar power stands out as a viable and increasingly affordable option for homeowners. This guide explores the benefits of installing solar panels, how they work, and what to consider before making the switch.\n\nSection 1: Why Go Solar?\n- Reduce electricity bills\n- Decrease carbon footprint\n- Increase property value\n- Energy independence\n\nSection 2: Understanding Solar Technology\n- Photovoltaic (PV) panels explained\n- Inverters and their role\n- Battery storage options\n\nConclusion\nInvesting in solar energy is not just an environmentally conscious decision but also a financially sound one for many homeowners.`,
    imageUrl: 'https://via.placeholder.com/600x400.png?text=Solar+Panel+Array',
    activityLog: [
      { timestamp: new Date(2023, 0, 15, 9, 0).toISOString(), message: 'Task created: The Future of Renewable Energy' },
      { timestamp: new Date(2023, 0, 16, 14, 30).toISOString(), message: 'Research phase initiated.' },
      { timestamp: new Date(2023, 0, 18, 10, 0).toISOString(), message: 'Initial research data compiled.' },
      { timestamp: new Date(2023, 0, 20, 16, 0).toISOString(), message: 'AI drafting process started.' },
      { timestamp: new Date(2023, 0, 22, 11, 0).toISOString(), message: 'Draft completed.' },
    ],
  },
  task2: {
    id: 'task2',
    topic: 'AI in Healthcare: A Revolution',
    currentStage: 'Review',
    creationDate: new Date(2023, 1, 10).toISOString(),
    researchData: [
      { type: 'link', content: 'https://example.com/ai-diagnostics', title: 'AI in Medical Diagnostics' },
      { type: 'text', content: 'Machine learning algorithms can predict patient outcomes with up to 90% accuracy in some cases.', title: 'AI Prediction Accuracy' },
    ],
    generatedIdeas: [
      { title: 'How AI is Changing Patient Care', description: 'Idea 1' },
      { title: 'The Ethics of AI in Medicine (Podcast)', description: 'Idea 2' },
    ],
    aiDraft: `Title: The AI Revolution in Healthcare\n\nIntroduction\nArtificial Intelligence (AI) is no longer a futuristic concept but a present-day reality transforming various sectors, and healthcare is at the forefront of this revolution. From diagnostics to personalized treatment plans, AI is enhancing capabilities and promising a new era of medical innovation.\n\nKey Areas of Impact:\n1. Diagnostics\n2. Drug Discovery\n3. Personalized Medicine\n\nConclusion\nAI holds immense promise.`, 
    imageUrl: 'https://via.placeholder.com/600x400.png?text=AI+Brain+Scan',
    activityLog: [
      { timestamp: new Date(2023, 1, 10, 11, 0).toISOString(), message: 'Task created: AI in Healthcare' },
      { timestamp: new Date(2023, 1, 12, 9, 20).toISOString(), message: 'Research complete.' },
      { timestamp: new Date(2023, 1, 15, 17, 45).toISOString(), message: 'Draft generated, pending review.' },
    ],
  },
    task3: { id: 'task3', topic: 'Exploring Deep Sea Ecosystems', currentStage: 'Research', creationDate: new Date(2023, 2, 1).toISOString(), researchData: [], generatedIdeas: [], aiDraft: '', imageUrl: 'https://via.placeholder.com/600x400.png?text=Deep+Sea', activityLog: [{timestamp: new Date().toISOString(), message: 'Task created'}] },
    task4: { id: 'task4', topic: 'The Rise of Quantum Computing', currentStage: 'Published', creationDate: new Date(2023, 2, 20).toISOString(), researchData: [], generatedIdeas: [], aiDraft: 'This content has been published.', imageUrl: 'https://via.placeholder.com/600x400.png?text=Quantum+Computer', activityLog: [{timestamp: new Date().toISOString(), message: 'Task created'}, {timestamp: new Date().toISOString(), message: 'Content published'}] },
    task5: { id: 'task5', topic: 'Sustainable Urban Development', currentStage: 'Idea', creationDate: new Date(2023, 3, 5).toISOString(), researchData: [], generatedIdeas: [], aiDraft: '', imageUrl: 'https://via.placeholder.com/600x400.png?text=Green+City', activityLog: [{timestamp: new Date().toISOString(), message: 'Task created'}] },
};

const fetchMockTaskDetails = (taskId) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(allMockTasks[taskId] || null);
    }, 300);
  });
};

const Section = ({ title, children, description }) => (
  <div className="mb-10 bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold leading-tight tracking-tight text-white mb-2">{title}</h2>
    {description && <p className="text-gray-400 text-sm mb-4">{description}</p>}
    <div className="mt-4">{children}</div>
  </div>
);

export default function TaskDetailPage() {
  const { taskId } = useParams();
  const [taskDetails, setTaskDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadTaskDetails = useCallback(async () => {
    setIsLoading(true);
    const details = await fetchMockTaskDetails(taskId);
    setTaskDetails(details);
    setIsLoading(false);
  }, [taskId]);

  useEffect(() => {
    loadTaskDetails();
  }, [loadTaskDetails]);

  const calculateProgress = (currentStage) => {
    const stageIndex = STAGES.indexOf(currentStage);
    if (stageIndex === -1) return 0;
    // Progress is based on completing the current stage, so +1. Max 100%.
    const progressPercentage = ((stageIndex + 1) / STAGES.length) * 100;
    return Math.min(progressPercentage, 100);
  };

  if (isLoading) {
    return <div className="container mx-auto p-8 text-center text-white">Loading task details...</div>;
  }

  if (!taskDetails) {
    return (
      <div className="container mx-auto p-8 text-center text-white">
        <h2 className="text-2xl font-semibold mb-4">Task Not Found</h2>
        <p className="text-gray-400 mb-6">Could not find details for task ID: {taskId}</p>
        <Link to="/" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const { topic, currentStage, creationDate, researchData, generatedIdeas, aiDraft, imageUrl, activityLog } = taskDetails;
  const progressPercent = calculateProgress(currentStage);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-900 min-h-screen text-white">
      {/* Header Section */}
      <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 truncate" title={topic}>{topic}</h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
          <p>Status: <span className="font-semibold text-yellow-400">{currentStage}</span></p>
          <p>Created: <span className="font-semibold text-gray-300">{new Date(creationDate).toLocaleDateString()}</span></p>
        </div>
      </div>

      {/* Task Progress Section */}
      <Section title="Task Progress">
        <div className="flex items-center gap-3 mb-1">
          <p className="text-gray-300 text-sm">Overall Completion</p>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5 shadow-inner">
          <div 
            className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-right text-sm text-green-400 font-medium mt-1">{progressPercent.toFixed(0)}%</p>
      </Section>

      {/* Research Data Section */}
      <Section 
        title="Research Data" 
        description="Collected data from various sources including industry reports, competitor analysis, and social media trends."
      >
        {researchData.length > 0 ? (
          <ul className="space-y-4">
            {researchData.map((item, index) => (
              <li key={index} className="p-4 bg-gray-700 rounded-md shadow-md">
                <h3 className="font-semibold text-indigo-400 mb-1 text-lg">{item.title}</h3>
                {item.type === 'link' ? (
                  <a href={item.content} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline break-all text-sm">
                    {item.content}
                  </a>
                ) : (
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{item.content}</p>
                )}
              </li>
            ))}
          </ul>
        ) : <p className="text-gray-500 italic">No research data available for this task.</p>}
      </Section>

      {/* Generated Ideas Section */}
      <Section 
        title="Generated Ideas"
        description="Developed content ideas based on the research data, focusing on current trends and audience engagement."
      >
        {generatedIdeas.length > 0 ? (
          <div className="space-y-3">
            {generatedIdeas.map((idea, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-md shadow">
                <p className="text-white text-md font-semibold leading-normal line-clamp-2">{idea.title}</p>
                <p className="text-indigo-400 text-xs font-medium leading-normal line-clamp-1 uppercase tracking-wider">{idea.description}</p>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-500 italic">No ideas generated yet.</p>}
      </Section>

      {/* AI Draft Section */}
      <Section 
        title="AI Draft"
        description="The AI-generated draft content based on the selected idea and research."
      >
        {aiDraft ? (
          <>
            <button 
              onClick={() => copyToClipboard(aiDraft)}
              className="mb-3 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 float-right"
            >
              Copy Draft
            </button>
            <pre className="bg-gray-900 p-4 rounded-md text-gray-300 text-sm whitespace-pre-wrap overflow-x-auto font-mono clear-right">
              {aiDraft}
            </pre>
          </>
        ) : <p className="text-gray-500 italic">No AI draft available for this task.</p>}
      </Section>

      {/* Image Section */}
      <Section title="Generated Image">
        {imageUrl ? (
          <img src={imageUrl} alt={`Generated image for ${topic}`} className="max-w-full md:max-w-xl mx-auto rounded-lg shadow-xl border-2 border-gray-700" />
        ) : <p className="text-gray-500 italic">No image generated for this task.</p>}
      </Section>

      {/* Activity Log Section */}
      <Section 
        title="Activity Log"
        description="A detailed log of the task execution, including timestamps and actions."
      >
        {activityLog.length > 0 ? (
          <ul className="space-y-2">
            {activityLog.map((entry, index) => (
              <li key={index} className="text-sm p-3 bg-gray-700 rounded-md shadow flex justify-between items-center">
                <span className="text-gray-300">{entry.message}</span>
                <span className="font-medium text-indigo-400 text-xs whitespace-nowrap">{new Date(entry.timestamp).toLocaleString()}</span> 
              </li>
            ))}
          </ul>
        ) : <p className="text-gray-500 italic">No activity log entries for this task.</p>}
      </Section>

    </div>
  );
} 