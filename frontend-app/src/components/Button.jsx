import React from 'react';

const Button = ({ 
  children,
  onClick,
  variant = 'primary', // primary, secondary, danger, custom
  type = 'button',
  disabled = false,
  className = '', // Allow custom classes to be passed
  ...props 
}) => {
  const baseStyles = "px-4 py-2 font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-600 hover:bg-gray-500 text-white focus:ring-gray-400';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
      break;
    case 'success': // Added a success variant as it's commonly used
      variantStyles = 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500';
      break;
    case 'outline-primary':
      variantStyles = 'bg-transparent hover:bg-indigo-600/10 text-indigo-400 border border-indigo-500 focus:ring-indigo-500';
      break;
    case 'outline-secondary':
      variantStyles = 'bg-transparent hover:bg-gray-600/10 text-gray-300 border border-gray-500 focus:ring-gray-400';
      break;
    case 'ghost': // A button with no background until hover/focus
      variantStyles = 'bg-transparent hover:bg-gray-700 text-indigo-400 focus:ring-indigo-500';
      break;
    case 'custom': // Allows all styling to be passed via className
      variantStyles = '';
      break;
    default:
      variantStyles = 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500';
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 