import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProjectCard } from './components/ProjectCard';
import { AdminDashboard } from './components/AdminDashboard';
import { DonationModal } from './components/DonationModal';
import { PasswordModal } from './components/PasswordModal';
import type { Project, BankAccount } from './types';

const defaultBankAccount: BankAccount = {
    bankName: 'بنك السودان (Bankak)',
    accountName: 'ياسمين الامين',
    accountNumber: '2268042',
};

const initialProjects: Project[] = [
    {
        id: '1',
        title: 'غذاء وماء طارئ للفاشر',
        description: 'توفير إغاثة فورية في شكل طرود غذائية ومياه شرب نظيفة للأسر النازحة بسبب النزاع في الفاشر.',
        imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=400&h=300&fit=crop&ixlib=rb-4.0.3',
        goal: 25000000,
        currentAmount: 6250000,
        bankAccount: defaultBankAccount,
    },
    {
        id: '2',
        title: 'عيادات صحية متنقلة للأسر النازحة',
        description: 'نشر وحدات طبية متنقلة لتقديم الخدمات الصحية الأساسية والتطعيمات ورعاية الأمومة لأولئك الذين لا يستطيعون الوصول إلى المستشفيات.',
        imageUrl: 'https://images.unsplash.com/photo-1589943313659-a29d63635a82?q=80&w=400&h=300&fit=crop&ixlib=rb-4.0.3',
        goal: 37500000,
        currentAmount: 22500000,
        bankAccount: defaultBankAccount,
    },
    {
        id: '3',
        title: 'مستلزمات إيواء للسودان',
        description: 'توزيع مستلزمات الإيواء الطارئة، بما في ذلك الخيام والبطانيات، لتوفير الأمان والكرامة للأسر التي فقدت منازلها.',
        imageUrl: 'https://images.unsplash.com/photo-1619873215965-47963c633c14?q=80&w=400&h=300&fit=crop&ixlib=rb-4.0.3',
        goal: 15000000,
        currentAmount: 14000000,
        bankAccount: defaultBankAccount,
    },
    {
        id: '4',
        title: 'مشروع أمل',
        description: 'توفير المواد التعليمية والدعم النفسي والاجتماعي للأطفال المتأثرين بالنزاع، للمساعدة في استعادة الشعور بالحياة الطبيعية وبناء مستقبل أكثر إشراقًا.',
        imageUrl: 'https://images.unsplash.com/photo-1617823900734-7da565487779?q=80&w=400&h=300&fit=crop&ixlib=rb-4.0.3',
        goal: 20000000,
        currentAmount: 3750000,
        bankAccount: defaultBankAccount,
    },
];

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isAdminView, setIsAdminView] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  const addProject = useCallback((data: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...data,
      id: new Date().toISOString(),
    };
    setProjects(prev => [newProject, ...prev]);
  }, []);

  const updateProject = useCallback((id: string, data: Omit<Project, 'id'>) => {
    setProjects(prev => prev.map(p => p.id === id ? { id, ...data } : p));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  }, []);
  
  const handleToggleView = () => {
    if (isAdminView) {
      setIsAdminView(false);
    } else {
      setIsPasswordModalVisible(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminView(true);
    setIsPasswordModalVisible(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isAdminView={isAdminView} onToggleView={handleToggleView} />
      <main className="flex-grow">
        {isAdminView ? (
          <AdminDashboard 
            projects={projects}
            addProject={addProject}
            updateProject={updateProject}
            deleteProject={deleteProject}
          />
        ) : (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">نداءات عاجلة للسودان</h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">دعمكم يمكن أن يجلب الأمل والمساعدات المنقذة لحياة المتضررين من النزاع.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} onDonateClick={() => setSelectedProject(project)} />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
      {selectedProject && (
          <DonationModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
      )}
      {isPasswordModalVisible && (
        <PasswordModal
          onSuccess={handleLoginSuccess}
          onClose={() => setIsPasswordModalVisible(false)}
        />
      )}
       <a
          href="https://wa.me/201500195095"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 z-40"
          aria-label="تواصل عبر الواتساب"
        >
          <i className="fab fa-whatsapp text-4xl"></i>
        </a>
    </div>
  );
};

export default App;
