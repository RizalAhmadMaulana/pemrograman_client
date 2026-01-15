import React, { useState, useMemo, useEffect } from 'react';
import AccordianItem from './AccordianItem'; 
import ModalTanya from './ModalTanya';

import ProgressBar from '@/Components/ProgressBar'; 
import { modulList, dummyUser } from '@/Data/Dummy'; 
import { toastSuccess } from '@/Utils/Helper/ToastHelpers'; 
import { showSuccessSwal } from '@/Utils/Helper/SwalHelpers'; 

const Modul = () => {
    const userName = dummyUser.name;
    
    const [modules, setModules] = useState(() => {
        const saved = localStorage.getItem("learning_modules");
        return saved ? JSON.parse(saved) : modulList;
    });

    const [activeModuleId, setActiveModuleId] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalModuleTitle, setModalModuleTitle] = useState('');
    
    useEffect(() => {
        localStorage.setItem("learning_modules", JSON.stringify(modules));
    }, [modules]);

    const completedModules = useMemo(() => 
      modules.filter(m => m.selesai).length
    , [modules]);
    
    const totalModules = modules.length;

    const handleToggleAccordion = (id) => {
      setActiveModuleId(id === activeModuleId ? null : id);
    };

    const handleComplete = (id, judul) => {
      setModules(prevModules => 
        prevModules.map(module =>
          module.id === id ? { ...module, selesai: true } : module
        )
      );
      showSuccessSwal('Modul Selesai!', `Selamat, kamu telah menyelesaikan materi ${judul}! Progress belajar kamu sudah diperbarui.`);
    };

    const handleAskLecturer = (id, title) => {
      setModalModuleTitle(title);
      setIsModalOpen(true);
    };

    const handleSubmitQuestion = (question, moduleTitle) => {
      console.log(`Pertanyaan untuk ${moduleTitle}: ${question}`);
      toastSuccess('Pertanyaan berhasil dikirim ke Dosen!'); 
    };

    return (
      <div className="kelas-container p-6 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">📚 Kurikulum Pembelajaran</h1>
                <p className="text-gray-600">Selesaikan seluruh modul untuk mendapatkan sertifikat kompetensi React Advanced.</p>
            </div>
            
            <ProgressBar 
              total={totalModules} 
              completed={completedModules} 
              userName={userName}
            />

            <div className="accordion-list mt-10 grid gap-4">
              {modules.map((module) => (
                <AccordianItem
                  key={module.id}
                  modul={module}
                  isActive={module.id === activeModuleId} 
                  onToggle={handleToggleAccordion}
                  onComplete={handleComplete}
                  onAsk={handleAskLecturer}
                />
              ))}
            </div>
        </div>

        <ModalTanya
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitQuestion}
          moduleTitle={modalModuleTitle}
        />
      </div>
    );
};

export default Modul;