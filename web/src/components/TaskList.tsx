import { useState, useEffect } from 'react';
import { getTask } from '../services/api';
import type { TaskItem } from '../types/tasks.types';
import TaskCard from './Task';
import TaskForm from './TaskForm';
import { useFilterTasks } from '../hooks/useFilterTasks';

export default function TaskList() {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const { search, setSearch, filteredTasks } = useFilterTasks(tasks);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getTask();
                setTasks(data);
            } catch (err) {
                console.error('Erro ao buscar Tasks: ', err);
                setError('Não foi possível carregar as tarefas. Verifique se a API está rodando.');
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    const handleCreated = (task: TaskItem) => {
        setTasks((prev) => [task, ...prev]);
        setShowForm(false);
    };

    if (loading) return <p className="text-slate-400 text-sm">Carregando tarefas...</p>;

    return (
        <div className="flex flex-col gap-4">
            {/* Linha de busca e botão */}
            <div className="flex items-end justify-between gap-3 w-full">
                <div className="flex flex-col gap-1.5 max-w-xs w-full">
                    <label 
                        htmlFor="task-search" 
                        className="text-xs font-medium text-slate-300"
                    >
                        Filtrar por nome
                    </label>
                    <input
                        id="task-search"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar tarefa..."
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <button
                    onClick={() => setShowForm((v) => !v)}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium bg-orange-500 text-slate-900 hover:bg-orange-400 transition-all shrink-0 h-[34px] cursor-pointer"
                >
                    {showForm ? 'Fechar' : '+ Nova tarefa'}
                </button>
            </div>

            {showForm && (
                <TaskForm onCreated={handleCreated} onCancel={() => setShowForm(false)} />
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}

            {!error && tasks.length === 0 && (
                <p className="text-sm text-slate-400">Nenhuma tarefa ainda. Crie a primeira!</p>
            )}

            {/* Listagem em Grid de 3 Colunas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {filteredTasks.map((i) => <TaskCard key={i.id} task={i} />)}
            </div>
        </div>
    );
}