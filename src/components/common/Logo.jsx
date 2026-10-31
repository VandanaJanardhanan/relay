import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 'md', to = '/', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const content = (
    <div className="flex items-center gap-2.5 group">
      <div className="relative flex items-center justify-center">
        <svg 
          className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-105`} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="28" cy="72" r="16" fill="#172B4D" />
          <circle cx="50" cy="50" r="12" fill="#16A6A1" />
          <circle cx="72" cy="28" r="16" fill="#36B37E" />
          <line x1="28" y1="72" x2="72" y2="28" stroke="#16A6A1" strokeWidth="8" strokeLinecap="round" />
          <circle cx="28" cy="72" r="7" fill="#FFFFFF" />
          <circle cx="72" cy="28" r="7" fill="#FFFFFF" />
        </svg>
      </div>
      <div>
        <span className={`font-black tracking-wider text-[#172B4D] ${textSizes[size]}`}>
          RELAY
        </span>
        {showTagline && (
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#16A6A1]">
            Movement Coordinator
          </p>
        )}
      </div>
    </div>
  );

  if (to) {
    return <Link to={to} className="inline-block">{content}</Link>;
  }

  return content;
};

