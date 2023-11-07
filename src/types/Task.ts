export default interface Task {
    id?: number;
    title: string;
    description: string;
    assigned?: string | null;
    dueDate?: Date | null;
    completedDate?: Date | null;
}
