import React from 'react';

interface ProgressBarProps {
  current: number;
  goal: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, goal }) => {
  const percentage = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;

  return (
    <div>
      <div className="flex justify-between mb-1 text-sm font-medium text-gray-600">
        <span>{current.toLocaleString('ar-EG')} ج.س</span>
        <span>{goal.toLocaleString('ar-EG')} ج.س</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
       <div className="text-left mt-1 text-sm font-semibold text-blue-700">
        %{percentage.toFixed(0)} تمويل
      </div>
    </div>
  );
};