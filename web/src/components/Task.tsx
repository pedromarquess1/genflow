import type { TaskItem } from '../types/tasks.types';
import { PRIORITY_LABELS, STATUS_LABELS } from '../types/tasks.types';

interface TaskCardProps {
    task: TaskItem;
}

const estilosDataBadge = {
    red: 'bg-red-950/60 text-red-400 border-red-800',
    yellow: 'bg-yellow-950/60 text-yellow-400 border-yellow-800',
    green: 'bg-green-950/60 text-green-400 border-green-800',
    gray: 'bg-slate-700/50 text-slate-400 border-slate-600',
};

export default function TaskCard({ task }: TaskCardProps) {
    const diasRestantes = task.due_date 
        ? Math.ceil((new Date(task.due_date).setHours(0,0,0,0) - new Date().setHours(0,0,0,0)) / 86400000)
        : null;

    const prazoStatus = diasRestantes === null ? 'gray' : diasRestantes < 3 ? 'red' : diasRestantes <= 5 ? 'yellow' : 'green';

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3.5 shadow-md flex flex-col justify-between gap-3 h-full">
            <div className="flex flex-col gap-1.5">
                {/* Título e Data na mesma linha */}
                <div className="flex justify-between items-start gap-2">
                    <h4 className="font-semibold text-slate-100 text-sm leading-tight line-clamp-1">{task.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium border shrink-0 ${estilosDataBadge[prazoStatus]}`}>
                        {task.due_date ? task.due_date.split('-').reverse().join('/') : 'Sem Data'}
                    </span>
                </div>

                {/* Descrição menor com limite de linhas */}
                {task.description && (
                    <p className="text-xs text-slate-400 line-clamp-2">{task.description}</p>
                )}
            </div>

            {/* Rodapé do card */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-700 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800 font-medium">
                    {PRIORITY_LABELS[task.priority]}
                </span>
                <span className="text-slate-400 font-medium">
                    {STATUS_LABELS[task.status]}
                </span>
            </div>
        </div>
    );
}