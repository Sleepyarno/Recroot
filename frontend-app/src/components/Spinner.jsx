import React from 'react';

const Spinner = ({ size = 'md', color = 'text-indigo-500', className = '' }) => {
  let sizeClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'w-6 h-6 border-2';
      break;
    case 'md':
      sizeClasses = 'w-10 h-10 border-4';
      break;
    case 'lg':
      sizeClasses = 'w-16 h-16 border-4';
      break;
    default:
      sizeClasses = 'w-10 h-10 border-4';
  }

  return (
    <div 
      className={`animate-spin rounded-full ${sizeClasses} ${color} border-t-transparent border-solid ${className}`.trim()}
      role="status"
      aria-label="Loading..."
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner; 