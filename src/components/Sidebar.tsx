import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <nav
        className={`bg-gray-800 w-64 min-h-screen p-4 text-white transition-all duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-16`}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Sidebar</h1>
        </div>
        <ul>
          <li className="mb-2">
            <a href="#" className="block p-2">Home</a>
          </li>
          <li className="mb-2">
            <a href="#" className="block p-2">About</a>
          </li>
          <li className="mb-2">
            <a href="#" className="block p-2">Services</a>
          </li>
          <li className="mb-2">
            <a href="#" className="block p-2">Contact</a>
          </li>
        </ul>
      </nav>

      {/* Content */}
      <div className="flex-1 p-8">
        <button
          className="md:hidden fixed top-4 left-4 p-2 rounded-lg bg-gray-800 text-white"
          onClick={toggleSidebar}
        >
          {isOpen ? 'Close' : 'Open'}
        </button>
        <h1 className="text-2xl mb-4">Main Content</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  );
};

export default Sidebar;
