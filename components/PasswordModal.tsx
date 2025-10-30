import React, { useState } from 'react';

interface PasswordModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

const ADMIN_PASSWORD = 'Yahya2025';

export const PasswordModal: React.FC<PasswordModalProps> = ({ onSuccess, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError('');
      onSuccess();
    } else {
      setError('كلمة المرور غير صحيحة. حاول مرة أخرى.');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity">
      <div className="bg-white rounded-lg shadow-2xl p-8 m-4 max-w-sm w-full transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">تسجيل الدخول للمشرف</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password-input" className="block text-sm font-medium text-gray-700 text-right">كلمة المرور</label>
              <input
                id="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-left"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <div className="mt-6 flex justify-end gap-4">
             <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">إلغاء</button>
             <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">دخول</button>
          </div>
        </form>
      </div>
    </div>
  );
};
