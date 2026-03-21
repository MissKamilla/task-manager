import {
  TASK_PRIORITY,
  TASK_STATUS,
  type Priority,
  type Status,
} from '@/shared/constants/task';
import '@/styles/TaskForm.css';

import type { TaskFormValues, User } from '@/types/entities';
import { useState } from 'react';

interface TaskFormProps {
  mode: string;
  users: User[];
  onSaveTask: (formData: TaskFormValues) => void;
  initialValues?: TaskFormValues | null;
}

interface StatusOption {
  value: Status;
  label: string;
}

interface PriorityOption {
  value: Priority;
  label: string;
}

const statusOptions: StatusOption[] = [
  { value: TASK_STATUS.BACKLOG, label: 'Backlog' },
  { value: TASK_STATUS.IN_PROGRESS, label: 'In Progress' },
  { value: TASK_STATUS.DONE, label: 'Done' },
];
const priorityOptions: PriorityOption[] = [
  { value: TASK_PRIORITY.LOW, label: 'Low' },
  { value: TASK_PRIORITY.MEDIUM, label: 'Medium' },
  { value: TASK_PRIORITY.HIGH, label: 'High' },
];

export function TaskForm({
  mode,
  users,
  onSaveTask,
  initialValues,
}: TaskFormProps) {
  const uiText = {
    title: mode === 'create' ? 'Create task' : 'Edit task',
    submit: mode === 'create' ? 'Add task' : 'Save task',
  };

  const [formValues, setFormValues] = useState<TaskFormValues>(
    initialValues || {
      title: '',
      description: '',
      status: TASK_STATUS.BACKLOG,
      priority: TASK_PRIORITY.MEDIUM,
      assigneeId: '',
    },
  );

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSaveTask(formValues);
  };

  return (
    <section className="task-form">
      <h2 className="task-form__title">{uiText.title}</h2>
      <form onSubmit={handleSubmit} className="task-form__form">
        <div className="task-form__field">
          <label htmlFor="title" className="task-form__label">
            Title
          </label>

          <input
            className="task-form__control"
            type="text"
            name="title"
            id="title"
            value={formValues.title}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        <div className="task-form__field">
          <label htmlFor="title" className="task-form__label">
            Description
          </label>
          <textarea
            className="task-form__control task-form__textarea"
            name="description"
            id="description"
            value={formValues.description}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>

        <div className="task-form__field">
          <label htmlFor="status" className="task-form__label">
            Status
          </label>
          <select
            className="task-form__control"
            name="status"
            id="status"
            value={formValues.status}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                status: e.target.value as Status,
              }))
            }
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="task-form__field">
          <label htmlFor="priority" className="task-form__label">
            Priority
          </label>
          <select
            className="task-form__control"
            name="priority"
            id="priority"
            value={formValues.priority}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                priority: e.target.value as Priority,
              }))
            }
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="task-form__field">
          <label htmlFor="assigneeId" className="task-form__label">
            Users
          </label>
          <select
            className="task-form__control"
            name="assigneeId"
            id="assigneeId"
            value={formValues.assigneeId}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                assigneeId: e.target.value,
              }))
            }
          >
            <option key="0" value="">
              Select assignee
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="task-form__submit">
          {uiText.submit}
        </button>
      </form>
    </section>
  );
}
