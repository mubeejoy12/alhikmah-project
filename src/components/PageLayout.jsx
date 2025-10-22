import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const PageLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <TopBar />
        
        {/* Page Content */}
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            {subtitle && (
              <p className="text-gray-600">{subtitle}</p>
            )}
          </div>
          
          {/* Page Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
