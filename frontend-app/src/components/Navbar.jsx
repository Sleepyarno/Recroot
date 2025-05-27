import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const Navbar = ({ appName = "Recroot" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/setup', label: 'API Keys' },
    { path: '/setup?section=workflow-defaults', label: 'Workflow Defaults' },
    { path: '/new-task', label: 'New Content Task' },
    { path: '/', label: 'Task Monitoring' },
    { path: '/review-queue', label: 'Content Approval' },
    { path: '/calendar', label: 'Content Calendar' },
    { path: '/admin/prompts', label: 'Advanced Prompts' },
  ];

  const baseLinkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClasses = "text-white bg-slate-700";
  const inactiveLinkClasses = "text-slate-300 hover:text-white hover:bg-slate-700/50";
  const navBg = "bg-[#161B22]";

  return (
    <nav className={`${navBg} shadow-md sticky top-0 z-50`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-white">{appName}</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="hidden md:flex items-center">
            <button className="p-1 rounded-full text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white">
              <span className="sr-only">User menu</span>
              <UserCircleIcon className="h-7 w-7" aria-hidden="true" />
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className={`${navBg} inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-white`}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#161B22]`}>
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `${baseLinkClasses} block ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-4 pb-3 border-t border-slate-700">
                <div className="flex items-center px-2">
                    <UserCircleIcon className="h-8 w-8 text-slate-300" aria-hidden="true" />
                    <div className="ml-3">
                        <div className="text-base font-medium text-white">User Name</div>
                        <div className="text-sm font-medium text-slate-400">user@example.com</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 