export default interface Task {
    id: number;
    title: string | null;
    description?: string | null;
    assigned?: string | null;
    dueDate?: string | null;
    completedDate?: string | null;
}
