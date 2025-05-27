import React, { useState, useEffect, useCallback } from 'react';

// Mock data for scheduled posts
const mockScheduledPosts = [
  {
    id: 'post1',
    title: 'Blog: The Future of Renewable Energy',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 8).toISOString(), // Current month, 8th day
    color: 'bg-blue-500'
  },
  {
    id: 'post2',
    title: 'Social: AI in Healthcare Teaser',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15).toISOString(), // Current month, 15th day
    color: 'bg-green-500'
  },
  {
    id: 'post3',
    title: 'Newsletter: Quantum Computing Insights',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 22).toISOString(), // Current month, 22nd day
    color: 'bg-purple-500'
  },
  {
    id: 'post4',
    title: 'Blog: Sustainable Urban Development Goals',
    // Example for next month, to show it won't appear on current month's basic grid
    date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5).toISOString(), 
    color: 'bg-teal-500'
  },
  {
    id: 'post5',
    title: 'Social: Another Post This Month',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15).toISOString(), // Another one on the 15th
    color: 'bg-pink-500'
  },
];

const fetchMockScheduledPosts = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockScheduledPosts);
    }, 300);
  });
};

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadScheduledPosts = useCallback(async () => {
    setIsLoading(true);
    const posts = await fetchMockScheduledPosts();
    setScheduledPosts(posts);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadScheduledPosts();
  }, [loadScheduledPosts]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-11
  const numDays = daysInMonth(year, month);
  const startingDay = firstDayOfMonth(year, month);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getPostsForDay = (day) => {
    return scheduledPosts.filter(post => {
      const postDate = new Date(post.date);
      return postDate.getFullYear() === year && postDate.getMonth() === month && postDate.getDate() === day;
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  const handleScheduleNewPost = () => {
    console.log("Schedule New Post button clicked - TBD: Open modal to select approved post.");
    // Placeholder for opening a modal or navigating
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-0">Content Calendar</h1>
        <button 
          onClick={handleScheduleNewPost}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-colors duration-150 whitespace-nowrap"
        >
          Schedule New Post
        </button>
      </div>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-6 bg-gray-800 p-4 rounded-lg shadow-md">
        <button onClick={handlePrevMonth} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md">‹ Prev</button>
        <h2 className="text-2xl font-semibold">{monthNames[month]} {year}</h2>
        <button onClick={handleNextMonth} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md">Next ›</button>
      </div>

      {isLoading ? (
         <p className="text-center text-gray-400">Loading calendar events...</p>
      ) : (
        <div className="grid grid-cols-7 gap-px bg-gray-700 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
          {/* Calendar Header (Days of the week) */}
          {dayNames.map(day => (
            <div key={day} className="text-center font-semibold py-3 bg-gray-800 text-indigo-300 text-sm uppercase tracking-wider">
              {day}
            </div>
          ))}

          {/* Empty cells for days before the first of the month */}
          {Array.from({ length: startingDay }).map((_, index) => (
            <div key={`empty-start-${index}`} className="bg-gray-800 min-h-[120px] sm:min-h-[140px]"></div>
          ))}

          {/* Calendar Day Cells */}
          {Array.from({ length: numDays }).map((_, dayIndex) => {
            const day = dayIndex + 1;
            const postsOnThisDay = getPostsForDay(day);
            const isToday = new Date().getFullYear() === year && new Date().getMonth() === month && new Date().getDate() === day;
            return (
              <div key={day} className={`p-2 bg-gray-800 min-h-[120px] sm:min-h-[140px] flex flex-col relative ${isToday ? 'border-2 border-blue-500' : ''}`}>
                <span className={`font-medium mb-1 ${isToday ? 'text-blue-400 font-bold' : 'text-gray-300'}`}>{day}</span>
                <div className="space-y-1 overflow-y-auto flex-grow simple-scrollbar">
                  {postsOnThisDay.map(post => (
                    <div 
                      key={post.id} 
                      title={post.title}
                      className={`${post.color || 'bg-blue-500'} text-white text-xs p-1.5 rounded shadow-sm truncate hover:opacity-80 cursor-pointer`}
                    >
                      {post.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Empty cells for days after the last of the month to fill the grid */}
          {Array.from({ length: (7 - (numDays + startingDay) % 7) % 7 }).map((_, index) => (
            <div key={`empty-end-${index}`} className="bg-gray-800 min-h-[120px] sm:min-h-[140px]"></div>
          ))}
        </div>
      )}
      <style jsx global>{`
        .simple-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .simple-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .simple-scrollbar::-webkit-scrollbar-thumb {
          background: #4a5568; 
          border-radius: 3px;
        }
        .simple-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #718096;
        }
      `}</style>
    </div>
  );
};

export default CalendarPage; 