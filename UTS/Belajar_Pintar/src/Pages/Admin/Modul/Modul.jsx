import React, { useState, useMemo } from 'react';
import AccordianItem from './AccordianItem'; 
import ModalTanya from './ModalTanya';

import ProgressBar from '@/Components/ProgressBar'; 
import { modulList, dummyUser } from '@/Data/Dummy'; 
import { toastSuccess } from '@/Utils/Helper/ToastHelpers'; 
import { showSuccessSwal } from '@/Utils/Helper/SwalHelpers'; 

const Modul = () => {
    const userName = dummyUser.name;
    const [modules, setModules] = useState(modulList);
    const [activeModuleId, setActiveModuleId] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalModuleTitle, setModalModuleTitle] = useState('');
    
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
      toastSuccess('Pertanyaan berhasil dikirim!'); 
    };

    return (
      <div className="kelas-container p-4">
        <h1 className="text-3xl font-bold mb-6">📚 Daftar Materi Modul</h1>
        
        <ProgressBar 
          total={totalModules} 
          completed={completedModules} 
          userName={userName}
        />

        <div className="accordion-list mt-8">
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