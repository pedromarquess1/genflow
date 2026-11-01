import axios from 'axios';
import type { TaskItem, CreateTaskDTO } from '../types/tasks.types';


export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/kanban/tasks/',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getTask = async (): Promise<TaskItem[]> => {
    try {
        const response = await api.get<TaskItem[]>(''); // Corrigido aqui
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar tarefas do Kanban:", error);
        throw error;
    }
};

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
        const res = await api.get<TaskItem>(`${id}/`);
        return res.data
    } catch (error) {
        console.error("Erro ao buscar tarefa por ID: ", error)
        throw error;
    }
}

export const deleteTask = async (id: number): Promise<void> => {
    try {
        await api.delete(`${id}/`);
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
        throw error;
    }
};