import { useState, useEffect } from 'react';
import { type TaskItem, getTask } from '../services/api';
import TaskCard from './Task';

export default function TaskList() {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Ponto 1: Escreve aqui a lógica para buscar os dados da API (GET)
        // e atualizar o estado 'tasks' quando a resposta chegar.
        const getData = async () => {
            try {
                setLoading(true);
                const data = await getTask();
                setTasks(data)
            } catch (error) {
                console.error('Erro ao buscar Tasks: ', error)
            } finally {
                setLoading(false)
            }
            
        } 

        getData()
    }, []);

    if (loading) return <p>Carregando tarefas...</p>;


    return (
        <div className="flex flex-col gap-3">
            {/* Ponto 2: Usa o .map() aqui para iterar sobre o array 'tasks' 
                e renderizar o componente <TaskCard /> para cada item. */
                
                tasks.map((i) =>  <TaskCard key={i.id} task={i} />)}
        </div>
    );
}