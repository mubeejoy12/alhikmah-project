import React from 'react';
import { BookOpen, CheckCircle, XCircle } from 'lucide-react';

const CourseCard = ({ courseName, department, isEligible, icon: Icon }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{courseName}</h3>
            <p className="text-gray-600">{department}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className={`flex items-center space-x-2 ${
          isEligible ? 'text-green-600' : 'text-red-600'
        }`}>
          {isEligible ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <XCircle className="h-5 w-5" />
          )}
          <span className="font-medium">
            {isEligible ? 'Eligible' : 'Not Eligible'}
          </span>
        </div>
        
        <button className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
          isEligible 
            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-105' 
            : 'bg-gray-200 text-gray-600 cursor-not-allowed'
        }`}>
          {isEligible ? 'Apply' : 'View'}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
