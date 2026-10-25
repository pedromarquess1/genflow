import { type TaskItem } from '../services/api.ts';

// 1. Definimos a interface para as propriedades que o componente recebe
interface TaskCardProps {
    task: TaskItem;
}

// 2. Criamos o componente desestruturando a prop 'task'
export default function TaskCard({ task }: TaskCardProps) {
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-md flex flex-col gap-2">
            {/* Título da tarefa */}
            <h4 className="font-semibold text-slate-100">{task.title}</h4>
            
            {/* Descrição */}
            <p className="text-sm text-slate-400">{task.description}</p>
            
            {/* Rodapé do card com prioridade e status */}
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-700 text-xs">
                <span className="px-2 py-1 rounded bg-blue-900/50 text-blue-300 border border-blue-800">
                    {task.priority}
                </span>
                <span className="text-slate-400 font-medium">
                    {task.status}
                </span>
            </div>
        </div>
    );
}