import React, { useState } from 'react';
import type { Project } from '../types';
import { ProjectForm } from './ProjectForm';

interface AdminDashboardProps {
  projects: Project[];
  addProject: (data: Omit<Project, 'id'>) => void;
  updateProject: (id: string, data: Omit<Project, 'id'>) => void;
  deleteProject: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ projects, addProject, updateProject, deleteProject }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const handleAddNew = () => {
    setProjectToEdit(null);
    setIsFormVisible(true);
  };

  const handleEdit = (project: Project) => {
    setProjectToEdit(project);
    setIsFormVisible(true);
  };
  
  const handleFormSubmit = (data: Omit<Project, 'id'>, id?: string) => {
      if (id) {
          updateProject(id, data);
      } else {
          addProject(data);
      }
      setIsFormVisible(false);
      setProjectToEdit(null);
  }
  
  const handleCancel = () => {
      setIsFormVisible(false);
      setProjectToEdit(null);
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
        {!isFormVisible && (
            <button onClick={handleAddNew} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 flex items-center gap-2">
                <i className="fas fa-plus-circle"></i>
                <span>إضافة مشروع جديد</span>
            </button>
        )}
      </div>

      {isFormVisible ? (
        <ProjectForm onSubmit={handleFormSubmit} projectToEdit={projectToEdit} onCancel={handleCancel}/>
      ) : (
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-right">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عنوان المشروع</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الهدف</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ المجمع</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التقدم</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">إجراءات</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{project.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{project.goal.toLocaleString('ar-EG')} ج.س</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{project.currentAmount.toLocaleString('ar-EG')} ج.س</div>
                    </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${Math.min(100, (project.currentAmount/project.goal)*100)}%`}}></div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium space-x-2">
                      <button onClick={() => handleEdit(project)} className="text-indigo-600 hover:text-indigo-900"><i className="fas fa-pencil-alt ml-1"></i> تعديل</button>
                      <button onClick={() => {if(window.confirm('هل أنت متأكد من رغبتك في حذف هذا المشروع؟')) deleteProject(project.id)}} className="text-red-600 hover:text-red-900"><i className="fas fa-trash-alt ml-1"></i> حذف</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};