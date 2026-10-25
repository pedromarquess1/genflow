import axios from 'axios';

export interface TaskItem {
    id: number;
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    due_date?: string;
}

// Tipo para a criação (exclui o ID gerado pelo backend)
export type CreateTaskDTO = Omit<TaskItem, 'id'>;

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/kanban/tasks',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Buscar tarefas (Corrigido com os parênteses)
export const getTask = async (): Promise<TaskItem[]> => {
    try {
        const response = await api.get<TaskItem[]>(''); // Corrigido aqui
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar tarefas do Kanban:", error);
        throw error;
    }
};

// Criar nova tarefa
export const createTask = async (taskData: CreateTaskDTO): Promise<TaskItem> => {
    try {
        const response = await api.post<TaskItem>('', taskData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar nova tarefa:", error);
        throw error;
    }
};

export const getTaskById = async (id: number): Promise<TaskItem> => {
    try {
        const res = await api.get<TaskItem>(`/${id}`);
        return res.data
    } catch (error) {
        console.error("Erro ao buscar tarefa por ID: ", error)
        throw error;
    }
}