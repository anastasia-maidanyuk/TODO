export interface Task {
  id: number;
  title: string;
  isDone: boolean;
  priority: number;
}

export interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}