export interface TaskCardProps {
    task: TaskItem;
}

// Modelo da tarefa
export interface TaskItem {
    id: number;
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    due_date?: string;
}

// Elimina o id feito pelo backend
export type CreateTaskDTO = Omit<TaskItem, 'id'>;