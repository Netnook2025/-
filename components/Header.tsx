import React from 'react';

interface HeaderProps {
  isAdminView: boolean;
  setIsAdminView: (isAdmin: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isAdminView, setIsAdminView }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <i className="fas fa-dove text-3xl text-blue-600"></i>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">نسمة خير (Nesma Khair)</h1>
              <p className="text-sm text-gray-500 hidden sm:block">منصة للخير والعطاء في السودان</p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminView(!isAdminView)}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150"
          >
            <i className={isAdminView ? "fas fa-users" : "fas fa-user-shield"}></i>
            <span>{isAdminView ? 'عرض عام' : 'لوحة التحكم'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};