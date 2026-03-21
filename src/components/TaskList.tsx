import { TaskCard } from '@/components/TaskCard';
import type { Task } from '@/types/entities';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}
export function TaskList({ tasks, onEditTask, onDeleteTask }: TaskListProps) {
  return (
    <>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </>
  );
}
