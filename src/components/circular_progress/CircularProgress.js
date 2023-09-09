import React from 'react';
import './CircularProgress.css'; // Create this CSS file for styling

const CircularProgress = ({ percentage, className, size, strokeWidth }) => {
  const radius = size; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg className={`circular-progress-svg h-${size} w-${size} ${className}`}>
      <circle
        className="circular-progress-circle stroke-gray-600"
        r={size}
        cx="50%"
        cy="50%"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
      />
      <circle
        className="circular-progress-circle stroke-white"
        r={size}
        cx="50%"
        cy="50%"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
      />
    </svg>
  );
};

export default CircularProgress;
