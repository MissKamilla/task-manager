import { TASK_PRIORITY, TASK_STATUS } from '@/shared/constants/task';
import type { Project, User, Task } from '@/types/entities';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Anna Petrova',
    email: 'anna@example.com',
  },
  {
    id: 'user-2',
    name: 'Ivan Kozak',
    email: 'ivan@example.com',
  },
];

export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'Task Manager',
    description: 'Task Manager',
  },
  {
    id: 'project-2',
    name: 'Marketing Website',
    description: 'Marketing Website',
  },
];

export const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Create sidebar layout',
    description: 'Create sidebar layout for the main dashboard',
    status: TASK_STATUS.BACKLOG,
    assigneeId: 'user-1',
    projectId: 'project-1',
    priority: TASK_PRIORITY.LOW,
  },
  {
    id: 'task-2',
    title: 'Build task card',
    description: 'Build task card',
    status: TASK_STATUS.IN_PROGRESS,
    assigneeId: 'user-1',
    projectId: 'project-1',
    priority: TASK_PRIORITY.MEDIUM,
  },
  {
    id: 'task-3',
    title: 'Add filter panel',
    description: 'Add filter panel',
    status: TASK_STATUS.DONE,
    assigneeId: 'user-2',
    projectId: 'project-2',
    priority: TASK_PRIORITY.MEDIUM,
  },
  {
    id: 'task-4',
    title: 'Prepare responsive styles',
    description: 'Prepare responsive styles',
    status: 'done',
    assigneeId: 'user-1',
    projectId: 'project-1',
    priority: TASK_PRIORITY.HIGH,
  },
];
