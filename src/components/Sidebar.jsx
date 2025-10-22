import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  LayoutDashboard, 
  Upload, 
  CheckCircle, 
  BookOpen, 
  FileCheck, 
  HelpCircle, 
  LogOut,
  GraduationCap
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Upload Documents', icon: Upload, path: '/upload' },
    { name: 'Eligibility Status', icon: CheckCircle, path: '/result' },
    { name: 'Course Recommendation', icon: BookOpen, path: '/courses' },
    { name: 'Clearance Progress', icon: FileCheck, path: '/progress' },
    { name: 'Help & Support', icon: HelpCircle, path: '/help' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-purple-600 to-purple-700 shadow-2xl z-50">
      {/* Logo Section */}
      <div className="flex items-center justify-center py-8">
        <div className="bg-white rounded-2xl p-3 shadow-lg">
          <GraduationCap className="h-8 w-8 text-purple-600" />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 group ${
                active
                  ? 'bg-purple-500 shadow-lg transform scale-105'
                  : 'hover:bg-purple-500/50 hover:transform hover:scale-105'
              }`}
            >
              <div className={`w-1 h-8 rounded-full mr-3 ${
                active ? 'bg-white' : 'bg-transparent'
              }`} />
              <Icon className={`h-5 w-5 mr-3 ${
                active ? 'text-white' : 'text-purple-200'
              }`} />
              <span className={`font-medium ${
                active ? 'text-white' : 'text-purple-200'
              }`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-4 right-4">
        <button 
          onClick={logout}
          className="flex items-center w-full px-4 py-3 rounded-xl text-purple-200 hover:bg-red-500/20 hover:text-red-200 transition-all duration-300 group"
        >
          <LogOut className="h-5 w-5 mr-3 group-hover:transform group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
