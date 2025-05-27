import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md', // sm, md, lg, xl, full
}) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  let sizeClasses = '';
  switch (size) {
    case 'sm': sizeClasses = 'max-w-sm'; break;
    case 'md': sizeClasses = 'max-w-md'; break;
    case 'lg': sizeClasses = 'max-w-lg'; break;
    case 'xl': sizeClasses = 'max-w-xl'; break;
    case '2xl': sizeClasses = 'max-w-2xl'; break;
    case 'full': sizeClasses = 'max-w-full h-full'; break; // Adjusted for a more full-screen like modal
    default: sizeClasses = 'max-w-md';
  }

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[1000] transition-opacity duration-300 ease-in-out"
      onClick={onClose} // Close on overlay click
    >
      <div 
        className={`bg-gray-800 text-white rounded-lg shadow-xl flex flex-col w-full ${sizeClasses} overflow-hidden transform transition-all duration-300 ease-in-out scale-95 group-[.open]:scale-100`}
        onClick={e => e.stopPropagation()} // Prevent close when clicking inside modal content
      >
        {/* Modal Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-200 transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 flex-grow overflow-y-auto simple-scrollbar">
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div className="p-4 border-t border-gray-700 bg-gray-850 rounded-b-lg flex justify-end space-x-3">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.getElementById('modal-root') || document.body // Fallback to body if modal-root isn't there
  );
};

export default Modal; 