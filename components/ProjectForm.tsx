import React, { useState, useEffect } from 'react';
import type { Project } from '../types';

type ProjectFormData = Omit<Project, 'id'>;

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData, id?: string) => void;
  projectToEdit: Project | null;
  onCancel: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, projectToEdit, onCancel }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    imageUrl: '',
    goal: 5000000,
    currentAmount: 0,
    bankAccount: {
      bankName: 'بنك السودان (Bankak)',
      accountName: '',
      accountNumber: '',
    },
  });

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        title: projectToEdit.title,
        description: projectToEdit.description,
        imageUrl: projectToEdit.imageUrl,
        goal: projectToEdit.goal,
        currentAmount: projectToEdit.currentAmount,
        bankAccount: projectToEdit.bankAccount,
      });
    } else {
      setFormData({ 
        title: '', 
        description: '', 
        imageUrl: '', 
        goal: 5000000, 
        currentAmount: 0,
        bankAccount: {
            bankName: 'بنك السودان (Bankak)',
            accountName: '',
            accountNumber: '',
        }
      });
    }
  }, [projectToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('bankAccount.')) {
        const field = name.split('.')[1];
        setFormData(prev => ({
            ...prev,
            bankAccount: {
                ...prev.bankAccount,
                [field]: value,
            }
        }));
    } else {
        setFormData(prev => ({ ...prev, [name]: (name === 'goal' || name === 'currentAmount') ? Number(value) : value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.goal <= 0) {
      alert("يجب أن يكون الهدف رقمًا موجبًا.");
      return;
    }
     if (formData.currentAmount < 0) {
      alert("لا يمكن أن يكون المبلغ الحالي سالبًا.");
      return;
    }
     if (formData.currentAmount > formData.goal) {
      alert("لا يمكن أن يكون المبلغ الحالي أكبر من الهدف.");
      return;
    }
    if (!formData.imageUrl) {
        alert("الرجاء رفع صورة للمشروع.");
        return;
    }
    onSubmit(formData, projectToEdit?.id);
  };
  
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{projectToEdit ? 'تعديل المشروع' : 'إنشاء مشروع جديد'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">عنوان المشروع</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">الوصف</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">صورة المشروع</label>
          <div className="mt-2 flex items-center gap-4">
            {formData.imageUrl && (
              <img src={formData.imageUrl} alt="Project preview" className="w-24 h-24 object-cover rounded-md bg-gray-100" />
            )}
            <div className="flex-grow">
                 <label htmlFor="image-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 inline-flex items-center">
                    <i className="fas fa-upload ml-2"></i>
                    <span>{formData.imageUrl ? 'تغيير الصورة' : 'رفع صورة'}</span>
                 </label>
                 <input id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                 <p className="text-xs text-gray-500 mt-1">يتم قبول PNG, JPG, GIF.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700">هدف التبرع (ج.س)</label>
            <input type="number" name="goal" id="goal" value={formData.goal} onChange={handleChange} required min="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="currentAmount" className="block text-sm font-medium text-gray-700">المبلغ الحالي المجمع (ج.س)</label>
            <input type="number" name="currentAmount" id="currentAmount" value={formData.currentAmount} onChange={handleChange} required min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">تفاصيل الحساب البنكي</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">اسم البنك</label>
                    <input type="text" name="bankAccount.bankName" id="bankName" value={formData.bankAccount.bankName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                    <label htmlFor="accountName" className="block text-sm font-medium text-gray-700">اسم صاحب الحساب</label>
                    <input type="text" name="bankAccount.accountName" id="accountName" value={formData.bankAccount.accountName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">رقم الحساب</label>
                    <input type="text" name="bankAccount.accountNumber" id="accountNumber" value={formData.bankAccount.accountNumber} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
            </div>
        </div>

        <div className="flex justify-end gap-4">
            <button type="button" onClick={onCancel} className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">إلغاء</button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">{projectToEdit ? 'حفظ التغييرات' : 'إنشاء المشروع'}</button>
        </div>
      </form>
    </div>
  );
};
