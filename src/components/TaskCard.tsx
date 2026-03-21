import '@/styles/TaskCard.css';

import type { Task } from '@/types/entities';
import { StatusBadge } from '@/components/StatusBadge';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <article className="task-card">
      <h3 className="task-card__title">{task.title}</h3>
      <p className="task-card__description">{task.description}</p>

      <div className="task-card__footer">
        <div className="task-card__button">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="task-card__button-edit"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="task-card__button-delete"
          >
            Delete
          </button>
        </div>
        <StatusBadge status={task.status} />
      </div>
    </article>
  );
}
