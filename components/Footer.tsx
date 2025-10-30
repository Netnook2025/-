import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} نسمة خير. جميع الحقوق محفوظة.</p>
        <p className="text-sm text-gray-400 mt-1">منصة للأمل والتضامن.</p>
        <p className="text-sm text-gray-400 mt-2">تم تطوير الموقع بواسطة يحيى سيكولوجي</p>
      </div>
    </footer>
  );
};