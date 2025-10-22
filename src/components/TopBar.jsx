import React from 'react';
import { Bell, Search } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg mx-4 my-4 px-6 py-4 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
        </div>
      </div>

      {/* Session Info */}
      <div className="hidden md:block text-center mx-6">
        <p className="text-sm text-gray-600">Current Session</p>
        <p className="font-semibold text-gray-900">2024/2025 Academic Session</p>
      </div>

      {/* Notifications and Profile */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </span>
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="hidden sm:block">
            <p className="font-semibold text-gray-900">Mubarak</p>
            <p className="text-sm text-gray-600">Computer Science</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
