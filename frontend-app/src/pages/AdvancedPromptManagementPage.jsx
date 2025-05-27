import React, { useState, useEffect, useCallback } from 'react';

const mockPrompts = [
  {
    id: 'prompt1',
    name: 'Initial Draft Generation',
    description: 'Core prompt used for generating the first draft of blog posts and articles based on research data.',
    version: '1.2.1',
    lastUpdated: '2024-05-15',
  },
  {
    id: 'prompt2',
    name: 'Content Refinement Engine',
    description: 'Processes an existing draft and user feedback to produce a revised version with improved clarity and tone.',
    version: '2.0.0',
    lastUpdated: '2024-05-28',
  },
  {
    id: 'prompt3',
    name: 'Social Media Snippet Creator',
    description: 'Generates engaging social media posts (Twitter, LinkedIn) from a longer piece of content or topic.',
    version: '1.5.0',
    lastUpdated: '2024-04-30',
  },
  {
    id: 'prompt4',
    name: 'YouTube Video Idea Generator',
    description: 'Takes a topic or keyword and suggests several engaging YouTube video titles and concepts.',
    version: '1.0.3',
    lastUpdated: '2024-05-10',
  },
];

const fetchMockPrompts = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockPrompts);
    }, 300);
  });
};

const AdvancedPromptManagementPage = () => {
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPrompts = useCallback(async () => {
    setIsLoading(true);
    const fetchedPrompts = await fetchMockPrompts();
    setPrompts(fetchedPrompts);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadPrompts();
  }, [loadPrompts]);

  const handleViewEdit = (promptId) => {
    console.log(`View/Edit clicked for prompt ID: ${promptId}`);
    // Placeholder for navigation or opening a modal editor
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-900 min-h-screen text-white">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Recroot - Advanced Prompt Management</h1>
        <p className="mt-2 text-gray-400 text-sm max-w-3xl">
          This page enables advanced users to view and potentially edit core prompts, with version history and warnings about the impact of changes. Exercise caution when modifying these settings.
        </p>
      </div>

      <section className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-4">Core Prompts</h2>
        {isLoading ? (
          <p className="text-center text-gray-400 py-8">Loading prompts...</p>
        ) : prompts.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-700">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-750 sticky top-0">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider whitespace-nowrap">Prompt Name</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider whitespace-nowrap">Version</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider whitespace-nowrap">Last Updated</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-indigo-300 uppercase tracking-wider whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {prompts.map((prompt) => (
                  <tr key={prompt.id} className="hover:bg-gray-750 transition-colors duration-150">
                    <td className="px-4 py-3 text-sm font-medium text-white whitespace-nowrap">{prompt.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-300 max-w-md truncate" title={prompt.description}>{prompt.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-400 whitespace-nowrap">{prompt.version}</td>
                    <td className="px-4 py-3 text-sm text-gray-400 whitespace-nowrap">{new Date(prompt.lastUpdated).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <button 
                        onClick={() => handleViewEdit(prompt.id)}
                        className="text-indigo-400 hover:text-indigo-300 font-medium text-sm focus:outline-none focus:underline"
                      >
                        View/Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">No prompts found.</p>
        )}
      </section>
    </div>
  );
};

export default AdvancedPromptManagementPage; 