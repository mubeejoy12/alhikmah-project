import React from 'react';

const Card = ({ children, className = '', hover = true, ...props }) => {
  const baseClasses = 'bg-white rounded-2xl shadow-md border border-gray-100';
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
