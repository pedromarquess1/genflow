import { useState } from 'react';
import { type CreateTaskDTO, type TaskItem, createTask } from '../services/api';

interface TaskFormProps {
    onCreated: (task: TaskItem) => void;
    onCancel?: () => void;
}

const INITIAL_STATE: CreateTaskDTO = {
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    due_date: '',
};

const inputClass =
    'w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 ' +
    'placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500';

export default function TaskForm({ onCreated, onCancel }: TaskFormProps) {
    const [form, setForm] = useState<CreateTaskDTO>(INITIAL_STATE);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.title.trim()) {
            setError('O título é obrigatório.');
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            // due_date vazio não pode ir como "" (o DRF rejeita); só envia se preenchido
            const payload: CreateTaskDTO = {
                ...form,
                title: form.title.trim(),
                due_date: form.due_date || undefined,
            };

            const created = await createTask(payload);
            onCreated(created);
            setForm(INITIAL_STATE);
        } catch (err) {
            console.error('Erro ao criar tarefa: ', err);
            setError('Não foi possível criar a tarefa. Tente novamente.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-md flex flex-col gap-3"
        >
            <h3 className="font-semibold text-slate-100">Nova tarefa</h3>

            <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-xs text-slate-400">Título</label>
                <input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Ex.: Pagar a fatura do cartão"
                    className={inputClass}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-xs text-slate-400">Descrição</label>
                <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Detalhes da tarefa (opcional)"
                    className={inputClass}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                    <label htmlFor="status" className="text-xs text-slate-400">Status</label>
                    <select id="status" name="status" value={form.status} onChange={handleChange} className={inputClass}>
                        <option value="TODO">A fazer</option>
                        <option value="PROGRESS">Em andamento</option>
                        <option value="DONE">Concluída</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="priority" className="text-xs text-slate-400">Prioridade</label>
                    <select id="priority" name="priority" value={form.priority} onChange={handleChange} className={inputClass}>
                        <option value="LOW">Baixa</option>
                        <option value="MEDIUM">Média</option>
                        <option value="HIGH">Alta</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="due_date" className="text-xs text-slate-400">Prazo</label>
                    <input
                        id="due_date"
                        name="due_date"
                        type="date"
                        value={form.due_date ?? ''}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex justify-end gap-2 pt-1">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
                    >
                        Cancelar
                    </button>
                )}
                <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium bg-orange-500 text-slate-900 hover:bg-orange-400 
                    disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {submitting ? 'Salvando...' : 'Criar tarefa'}
                </button>
            </div>
        </form>
    );
}