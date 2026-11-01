export const STATUS_LABELS = {
    TODO: 'Pendente',
    PROGRESS: 'Em Andamento',
    DONE: 'Concluída',
} as const;

export const PRIORITY_LABELS = {
    LOW: 'Baixa',
    MEDIUM: 'Média',
    HIGH: 'Alta',
} as const;

export type TaskStatus = keyof typeof STATUS_LABELS;
export type TaskPriority = keyof typeof PRIORITY_LABELS;

export interface TaskItem {
    id: number;
    title: string;
    description: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    due_date: string | null;
    created_at: string;
    updated_at: string;
}

export type CreateTaskDTO = {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    due_date?: string;
};