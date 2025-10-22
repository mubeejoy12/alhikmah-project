import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  onClick,
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-lg hover:shadow-purple-500/25 focus:ring-purple-500',
    secondary: 'bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 focus:ring-purple-500',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/25 focus:ring-green-500',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/25 focus:ring-red-500',
    outline: 'bg-transparent text-gray-700 border-2 border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
  };
  
  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
