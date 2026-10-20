import { useEffect, useState } from "react";
import axios from "axios";

interface TaskItem {
    id: number;
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    due_date?: string;
}

export default function Tasks() {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/kanban/tasks/');
                setTasks(response.data);
            } catch (error) {
                console.error("Erro ao buscar tarefas do Kanban:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    // Filtros por status mapeados do backend
    const todoTasks = tasks.filter(t => t.status === 'TODO');
    const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS');
    const doneTasks = tasks.filter(t => t.status === 'DONE');

    if (loading) {
        return <div className="text-center py-10 text-slate-400">Carregando quadro kanban...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Coluna 1: A Fazer */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800">
                    <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                        A Fazer
                    </h3>
                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-medium">
                        {todoTasks.length}
                    </span>
                </div>
                <div className="space-y-3 flex-1">
                    {todoTasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                    {todoTasks.length === 0 && (
                        <p className="text-xs text-slate-500 text-center py-6">Nenhuma tarefa</p>
                    )}
                </div>
            </div>

            {/* Coluna 2: Em Andamento */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800">
                    <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                        Em Andamento
                    </h3>
                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-medium">
                        {inProgressTasks.length}
                    </span>
                </div>
                <div className="space-y-3 flex-1">
                    {inProgressTasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                    {inProgressTasks.length === 0 && (
                        <p className="text-xs text-slate-500 text-center py-6">Nenhuma tarefa</p>
                    )}
                </div>
            </div>

            {/* Coluna 3: Concluído */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800">
                    <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        Concluído
                    </h3>
                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-medium">
                        {doneTasks.length}
                    </span>
                </div>
                <div className="space-y-3 flex-1">
                    {doneTasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                    {doneTasks.length === 0 && (
                        <p className="text-xs text-slate-500 text-center py-6">Nenhuma tarefa</p>
                    )}
                </div>
            </div>
        </div>
    );
}

// Subcomponente individual do Card de Tarefa
function TaskCard({ task }: { task: TaskItem }) {
    const priorityColors = {
        LOW: 'bg-slate-800 text-slate-300 border-slate-700',
        MEDIUM: 'bg-blue-950/60 text-blue-400 border-blue-900/50',
        HIGH: 'bg-orange-950/60 text-orange-400 border-orange-900/50',
    };

    const priorityLabels = {
        LOW: 'Baixa',
        MEDIUM: 'Média',
        HIGH: 'Alta',
    };

    return (
        <div className="bg-slate-900 border border-slate-800/80 rounded-lg p-3.5 shadow-sm hover:border-slate-700 transition-all cursor-pointer">
            <div className="flex justify-between items-start gap-2 mb-1.5">
                <h4 className="text-sm font-medium text-slate-200 leading-snug">{task.title}</h4>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${priorityColors[task.priority]}`}>
                    {priorityLabels[task.priority]}
                </span>
            </div>
            {task.description && (
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">{task.description}</p>
            )}
            {task.due_date && (
                <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-2 border-t border-slate-800/50">
                    <span>Vencimento: {task.due_date}</span>
                </div>
            )}
        </div>
    );
}