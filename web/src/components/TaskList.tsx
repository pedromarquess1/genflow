import { useState, useEffect } from 'react';
import { type TaskItem, getTask } from '../services/api';
import TaskCard from './Task';
import TaskForm from './TaskForm';

export default function TaskList() {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const data = await getTask();
                setTasks(data);
            } catch (error) {
                console.error('Erro ao buscar Tasks: ', error);
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

    if (loading) return <p>Carregando tarefas...</p>;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-end">
                <button
                    onClick={() => setShowForm((v) => !v)}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium bg-orange-500 text-slate-900 hover:bg-orange-400 transition-all"
                >
                    {showForm ? 'Fechar' : '+ Nova tarefa'}
                </button>
            </div>

            {showForm && (
                <TaskForm onCreated={handleCreated} onCancel={() => setShowForm(false)} />
            )}

            <div className="flex flex-col gap-3">
                {tasks.map((i) => <TaskCard key={i.id} task={i} />)}
            </div>
        </div>
    );
}