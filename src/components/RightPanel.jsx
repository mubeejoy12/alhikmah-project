import React from 'react';
import { CheckCircle, AlertTriangle, Bell, Phone, Mail, MessageCircle } from 'lucide-react';

const RightPanel = () => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'WAEC Result Verified',
      message: 'Your WAEC result has been successfully verified and approved.',
      time: '2 hours ago',
      icon: CheckCircle,
    },
    {
      id: 2,
      type: 'warning',
      title: 'JAMB Result Required',
      message: 'Please upload your JAMB result for review and verification.',
      time: '1 day ago',
      icon: AlertTriangle,
    },
    {
      id: 3,
      type: 'info',
      title: 'Eligibility Result Ready',
      message: 'Your eligibility assessment is complete. Check your status.',
      time: '2 days ago',
      icon: Bell,
    },
  ];

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'info':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Clearance Updates */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Clearance Updates</h3>
          <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
            See all
          </button>
        </div>
        
        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`p-4 rounded-xl border ${getNotificationColor(notification.type)} hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-start space-x-3">
                  <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{notification.title}</h4>
                    <p className="text-xs mt-1 opacity-80">{notification.message}</p>
                    <p className="text-xs mt-2 opacity-60">{notification.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Need Help Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
            <Phone className="h-5 w-5 text-purple-600" />
            <div>
              <p className="font-medium text-sm">Call Support</p>
              <p className="text-xs text-gray-600">+234 123 456 7890</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
            <Mail className="h-5 w-5 text-purple-600" />
            <div>
              <p className="font-medium text-sm">Email Support</p>
              <p className="text-xs text-gray-600">support@alhikmah.edu.ng</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
            <MessageCircle className="h-5 w-5 text-purple-600" />
            <div>
              <p className="font-medium text-sm">Live Chat</p>
              <p className="text-xs text-gray-600">Available 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
