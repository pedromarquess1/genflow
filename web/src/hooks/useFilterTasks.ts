import { useState } from "react";
import type { TaskItem } from "../types/tasks.types";

export function useFilterTasks(tasks: TaskItem[]) {
    const [search, setSearch] = useState('');
    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase().trim())
    );

    return { search, setSearch, filteredTasks};
}