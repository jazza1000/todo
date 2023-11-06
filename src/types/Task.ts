export default interface Task {
    id: number;
    title: string | null;
    description?: string;
    assigned?: string | null;
    dueDate?: string | null;
    completedDate?: string | null;
}
