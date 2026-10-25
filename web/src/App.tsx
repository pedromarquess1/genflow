import { useState } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';


export default function App() {
  const [activeTab, setActiveTab] = useState<'kanban' | 'financeiro'>('kanban');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {activeTab === 'kanban' ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold tracking-tight">Quadro Kanban</h1>
            </div>
            <TaskList />
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-6">Controle Financeiro</h1>
            <p className="text-slate-400">Módulo financeiro em construção...</p>
          </div>
        )}
      </main>
    </div>
  );
}