import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import StatsCard from '../components/StatsCard';
import CourseCard from '../components/CourseCard';
import RightPanel from '../components/RightPanel';
import { 
  Upload, 
  CheckCircle, 
  Building2, 
  BookOpen, 
  Laptop, 
  Database,
  Briefcase,
  Mic
} from 'lucide-react';
import { studentData, clearanceStats, recommendedCourses } from '../data/mockData';

const Dashboard = () => {
  const { state } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <TopBar />
        
        {/* Main Content Area */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {studentData.name}!
                  </h1>
                  <p className="text-purple-100 mb-6">
                    Check your clearance and eligibility status easily.
                  </p>
                  
                  {/* Progress Section */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Clearance Progress</span>
                      <span className="text-2xl font-bold">{studentData.clearanceProgress}%</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-3">
                      <div 
                        className="bg-white rounded-full h-3 transition-all duration-1000"
                        style={{ width: `${studentData.clearanceProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-purple-100 text-sm mt-2">Completed</p>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-4 right-8 w-12 h-12 bg-white/10 rounded-full"></div>
                <div className="absolute top-1/2 right-12 w-8 h-8 bg-white/10 rounded-full"></div>
              </div>

              {/* Clearance Stats */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Clearance Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatsCard
                    title={clearanceStats[0].title}
                    value={clearanceStats[0].value}
                    subtitle={clearanceStats[0].subtitle}
                    icon={Upload}
                    color={clearanceStats[0].color}
                    progress={clearanceStats[0].progress}
                  />
                  <StatsCard
                    title={clearanceStats[1].title}
                    value={clearanceStats[1].value}
                    subtitle={clearanceStats[1].subtitle}
                    icon={CheckCircle}
                    color={clearanceStats[1].color}
                  />
                  <StatsCard
                    title={clearanceStats[2].title}
                    value={clearanceStats[2].value}
                    subtitle={clearanceStats[2].subtitle}
                    icon={Building2}
                    color={clearanceStats[2].color}
                    progress={clearanceStats[2].progress}
                  />
                </div>
              </div>

              {/* Recommended Courses */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Recommended Courses</h2>
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    See all
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendedCourses.slice(0, 4).map((course, index) => (
                    <CourseCard
                      key={course.id}
                      courseName={course.courseName}
                      department={course.department}
                      isEligible={course.isEligible}
                      icon={index % 2 === 0 ? Laptop : Database}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Notifications */}
            <div className="lg:col-span-1">
              <RightPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
