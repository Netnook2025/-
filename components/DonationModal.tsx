import React, { useState, useEffect } from 'react';
import type { Project } from '../types';

interface DonationModalProps {
  project: Project | null;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ project, onClose }) => {
  const [amount, setAmount] = useState(10000);
  const [customAmount, setCustomAmount] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'amount' | 'instructions'>('amount');
  const [copiedValue, setCopiedValue] = useState<'name' | 'number' | null>(null);

  useEffect(() => {
    if (!project) {
        setStep('amount');
        setAmount(10000);
        setCustomAmount('');
        setError('');
        setCopiedValue(null);
    }
  }, [project]);


  if (!project) return null;

  const presetAmounts = [2500, 5000, 10000, 25000];

  const handleProceed = () => {
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    if (isNaN(finalAmount) || finalAmount <= 0) {
      setError('الرجاء إدخال مبلغ صحيح.');
      return;
    }
    setError('');
    setStep('instructions');
  };
  
  const handleAmountClick = (preset: number) => {
      setAmount(preset);
      setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCustomAmount(e.target.value);
      if (e.target.value !== '') {
        setAmount(0);
      }
  }

  const handleClose = () => {
    setStep('amount');
    onClose();
  };
  
  const handleCopy = (text: string, type: 'name' | 'number') => {
    navigator.clipboard.writeText(text);
    setCopiedValue(type);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const finalAmount = customAmount ? parseFloat(customAmount) : amount;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity">
      <div className="bg-white rounded-lg shadow-2xl p-8 m-4 max-w-md w-full transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{step === 'amount' ? `التبرع لمشروع "${project.title}"` : 'تعليمات الدفع'}</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>
        
        {step === 'amount' ? (
            <>
                <p className="text-gray-600 mb-6">مساهمتك ستوفر مساعدات حيوية. شكراً لكرمك.</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {presetAmounts.map(preset => (
                         <button 
                            key={preset}
                            onClick={() => handleAmountClick(preset)}
                            className={`p-4 border rounded-lg font-bold text-lg transition ${amount === preset && !customAmount ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                            {preset.toLocaleString('ar-EG')}
                         </button>
                    ))}
                </div>

                <div className="relative mb-4">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-lg">ج.س</span>
                    <input
                        type="number"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder="أو أدخل مبلغًا مخصصًا"
                        className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    />
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                
                <button
                  onClick={handleProceed}
                  className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 text-lg"
                >
                  الانتقال إلى الدفع
                </button>
            </>
        ) : (
            <div className="text-gray-700 space-y-4">
                <p>الرجاء تحويل <span className="font-bold text-blue-600">{finalAmount.toLocaleString('ar-EG')} ج.س</span> باستخدام التفاصيل أدناه:</p>
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 space-y-2">
                    <p><span className="font-semibold">البنك:</span> {project.bankAccount.bankName}</p>
                    <div className="flex justify-between items-center">
                        <p><span className="font-semibold">اسم الحساب:</span> {project.bankAccount.accountName}</p>
                        <button onClick={() => handleCopy(project.bankAccount.accountName, 'name')} className="text-gray-500 hover:text-blue-600 transition-colors text-sm flex items-center gap-1">
                            {copiedValue === 'name' ? (
                                <><i className="fas fa-check text-green-500"></i><span className="text-green-500">تم النسخ</span></>
                            ) : (
                                <><i className="far fa-copy"></i><span>نسخ</span></>
                            )}
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <p><span className="font-semibold">رقم الحساب:</span> {project.bankAccount.accountNumber}</p>
                         <button onClick={() => handleCopy(project.bankAccount.accountNumber, 'number')} className="text-gray-500 hover:text-blue-600 transition-colors text-sm flex items-center gap-1">
                            {copiedValue === 'number' ? (
                                <><i className="fas fa-check text-green-500"></i><span className="text-green-500">تم النسخ</span></>
                            ) : (
                                <><i className="far fa-copy"></i><span>نسخ</span></>
                            )}
                        </button>
                    </div>
                </div>
                <p className="font-semibold text-red-600">هام:</p>
                <p>بعد الدفع، يرجى إرسال لقطة شاشة للإيصال إلى رقم الواتساب الخاص بنا للتحقق.</p>
                <a 
                    href="https://wa.me/201500195095" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full mt-4 bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition duration-300 text-lg flex items-center justify-center gap-2"
                >
                    <i className="fab fa-whatsapp"></i>
                    <span>إرسال الإيصال عبر الواتساب</span>
                </a>
                <button
                    onClick={handleClose}
                    className="w-full mt-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                    إغلاق
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
