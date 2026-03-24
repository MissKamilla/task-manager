import { tasks } from '@/data/mockData';
import type { Task } from '@/types/entities';
import type {
  CreateTaskRequest,
  GetTasksResponse,
  UpdateTaskRequest,
} from '@/shared/api/types';

type SomeMode = 'success' | 'empty' | 'error';
const tempState: SomeMode = 'success';
// const tempState:SomeMode  = 'empty';
// const tempState: SomeMode = 'error';

let tasksDb = [...tasks];

export async function getTasks(ms?: number): Promise<GetTasksResponse> {
  await delay(ms);

  switch (tempState) {
    case 'success':
      return tasksDb;
    case 'empty':
      return [];
    case 'error':
      throw new Error(`getTasks error`);
  }
}

export async function createTask(data: CreateTaskRequest): Promise<Task> {
  await delay();
  const newTask = { ...data, id: `task-${Date.now()}`, projectId: 'project-1' };

  tasksDb = [...tasksDb, newTask];
  return newTask;
}

export async function updateTask(
  id: Task['id'],
  data: UpdateTaskRequest,
): Promise<Task> {
  await delay();

  const foundTask = tasksDb.find((task) => task.id === id);

  if (!foundTask) {
    throw new Error(`Task with id ${id} is not found`);
  }

  const updatedTask = { ...foundTask, ...data };

  tasksDb = tasksDb.map((task) => {
    if (task.id === updatedTask.id) {
      return updatedTask;
    }
    return task;
  });

  return updatedTask;
}

export async function deleteTask(id: Task['id']): Promise<void> {
  await delay();

  if (!tasksDb.some((task) => task.id === id)) {
    throw new Error(`Task with id ${id} is not found`);
  }
  tasksDb = tasksDb.filter((task) => task.id !== id);
}

function delay(ms: number = 500): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}
