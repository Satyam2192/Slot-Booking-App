import React from 'react';
import { Link } from 'react-router-dom';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

function Header({ isDark, setIsDark }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {/* A simple logo icon */}
        <svg
          className="w-8 h-8 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        <span className="text-xl font-bold text-gray-800 dark:text-gray-100">Slot Booking App</span>
      </div>
      <nav className="flex items-center space-x-4">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-100 hover:bg-gray-300 dark:hover:bg-gray-300 transition-colors"
          title="Toggle Dark Mode"
        >
          {isDark ? (
            // Sun icon (when in dark mode, clicking will switch to light mode)

            <MdOutlineLightMode />

          ) : (
            // Moon icon (when in light mode, clicking will switch to dark mode)
            <MdDarkMode />

          )}
        </button>
      </nav>
    </header>
  );
}

export default Header;
