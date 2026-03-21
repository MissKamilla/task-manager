import type { Priority, Status } from '@/shared/constants/task';

export type FilterStatus = 'all' | Status;

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  assigneeId: string;
  projectId: string;
  priority: Priority;
}

export interface TaskFormValues {
  title: string;
  description: string;
  status: Status;
  assigneeId: string;
  priority: Priority;
}
