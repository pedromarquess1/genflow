import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import TaskList from './components/TaskList';
import NotFound from './components/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        {/* Cabeçalho fixo no topo */}
        <Header />

        {/* Conteúdo dinâmico das páginas */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kanban" element={<TaskList />} />
            <Route 
              path="/financeiro" 
              element={<div className="text-slate-400 text-center py-12">Página do Financeiro em construção...</div>} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}