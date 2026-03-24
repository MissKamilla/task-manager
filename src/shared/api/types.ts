import type { Task } from '@/types/entities';
import type { Priority, Status } from '../constants/task';

export type GetTasksResponse = Task[];

export interface CreateTaskRequest {
  title: string;
  description: string;
  status: Status;
  assigneeId: string;
  priority: Priority;
}
export interface UpdateTaskRequest {
  title: string;
  description: string;
  status: Status;
  assigneeId: string;
  priority: Priority;
}
