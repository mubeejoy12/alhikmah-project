import React from 'react';

const StatsCard = ({ title, value, subtitle, icon: Icon, color = 'purple', progress }) => {
  const colorClasses = {
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    blue: 'from-blue-500 to-blue-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {progress && (
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-600">{subtitle}</div>
          </div>
        )}
      </div>
      
      {!progress && (
        <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      )}
      
      <div className="text-gray-600 font-medium">{title}</div>
      
      {progress && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${colorClasses[color]} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
